import { parentPort } from "worker_threads"
import { WorkerReq } from "./interface";
import { sendEmail, sendEmailAttachment } from "../../datacall/callEmailapi";
import { EmailData, EmailDataAttachment } from "../../interfaces/apicalls";

if (parentPort) {
    const port = parentPort;
    port.on('message', async (data: WorkerReq) => {

        const emailLists = data.emailList;

        while(data.action && emailLists.length > 0){
            if (!data.file) {
                const emailData:EmailData = {
                    ApiKey: data.apiKey,
                    To: emailLists[0],
                    From: data.from,
                    Content: data.emailBody,
                    Subject: data.emailSubject,
                    IsHtml: true,
                    UseTracker: data.isTracker,
                    BrandName: data.brandName,
                    ReplyTo: data.replyTo
                }
                const response = await sendEmail(emailData)
                emailLists.shift();
                port.postMessage(response)
            }else{
                const emailDataAtt: EmailDataAttachment = {
                    ApiKey: data.apiKey,
                    To: emailLists[0],
                    From: data.from,
                    Content: data.emailBody,
                    Subject: data.emailSubject,
                    IsHtml: true,
                    UseTracker: data.isTracker,
                    BrandName: data.brandName,
                    Files: data.file,
                    ReplyTo: data.replyTo
                } 

                const res = await sendEmailAttachment(emailDataAtt)
                emailLists.shift()
                port.postMessage(res)
            }
        }

        process.exit(0)
    });
}

import { DataReturn, EmailData, EmailDataAttachment, EmailReport, Report, TestApiKey } from "../interfaces/apicalls"


export async function sendMailTest(apiKey: string,
     to: string,
     from: string,
     content: string,
     subject: string,
     isHtml: boolean,
     useTracker: boolean,
     brandName: string
    ): Promise<DataReturn> {
        try {
            const status  = await fetch("https://api.team71.link/api/v1/public/send-email",{
            headers:{
                "api-key": apiKey,
                "Content-Type": "application/json"

            },
            method: "POST",
            body: JSON.stringify({
                "to": to,
                "from": from,
                "content": content,
                "subject": subject,
                "isHtml": isHtml,
                "useTracker": useTracker,
                "brandName": brandName
            })
            }).then(res => res.json())
            if(status.error){
            throw new Error(status.message)
            }
            return {
            status: false,
            msg: "Success"
            }
        } catch (error) {
            return{
            status: true,
            msg: (error as Error).message
            }
        }
}

export async function testApiKey(apiKey: string): Promise<TestApiKey> {
  try{
    const apiCall = await fetch("https://app.team71.link/api/v1/key/profile",{
      method: "GET",
      headers: {
        "api-key": apiKey
      }
    }).then(res => res.json())

    if(!apiCall){
      throw new Error("Invaild response. Please try again.")
    }
    if(apiCall.error){
      throw new Error(apiCall.message)
    }
    console.log(apiCall);
    return {
      status: true,
      msg: "Success",
      userId: apiCall.data.id,
      remainEmail: apiCall.data.totalEmail,
      name: apiCall.data.username
    }
  }catch(e){
    console.log((e as Error).message);
    return {
      status: false,
      msg: (e as Error).message,
      userId: 0,
      remainEmail: 0,
      name: ""
    }
  }
}

export async function report30Days(apiKey:string): Promise<Report> {
    try {
        const responseData = await fetch("https://tracker.team71.link/api/v1/public/get-last-month-report",{
            method: "GET",
            headers: {
                "api-key": apiKey
            }
        }).then(res => res.json())

        if (responseData.error) {
            throw new Error(responseData.message)
        }
        const realdata = responseData.data
        return{
            err: false,
            totalSend: realdata.totalCount,
            realSend: realdata.totalSendCount,
            totalOpen: realdata.totalOpenCount,
            bounce: realdata.totalBounce,
            deferred: realdata.totalDeferred,
            notOpen: realdata.totalNotOpen,
            message: "Success"
        }
    } catch (error) {
        return{
            err: true,
            totalSend: 0,
            realSend: 0,
            totalOpen: 0,
            bounce: 0,
            deferred: 0,
            notOpen: 0,
            message: (error as Error).message
        }
    }
}


export async function sendEmail(data: EmailData): Promise<EmailReport>{
  try {
    const emailSendStatus = await fetch("https://api.team71.link/api/v1/public/send-email",{
      headers: {
        "Content-Type": "application/json",
        "api-key": data.ApiKey
      },
      method: "POST",
      body: JSON.stringify({
        "to": data.To,
        "from": data.From,
        "subject": data.Subject,
        "isHtml": data.IsHtml,
        "content": data.Content,
        "useTracker": data.UseTracker,
        "brandName": data.BrandName,
        "replyTo": data.ReplyTo
      })
    }).then(res => res.json())
    return {
      email: data.To,
      message: emailSendStatus.message,
      status: emailSendStatus.error ? "Not Send": "Send"
    }
  } catch (error) {
    return {
      email: data.To,
      message: (error as Error).message,
      status: "Not Send"
    }
  }
}

export async function sendEmailAttachment(data: EmailDataAttachment): Promise<EmailReport> {
  try {
    const formData = new FormData();
    formData.append("to", data.To);
    formData.append("from", data.From);
    formData.append("subject", data.Subject);
    formData.append("content", data.Content);
    formData.append("isHtml", String(data.IsHtml));
    formData.append("useTracker", String(data.UseTracker));
    formData.append("brandName", data.BrandName);
    formData.append(
      "files", 
      new File(
        [new Uint8Array(data.Files.dataBuffer)], // 1. Put buffer inside an array []
        data.Files.name,         // 2. The original filename
        { type: data.Files.type } // 3. The original MIME type
      )
    );
    formData.append("replyTo", data.ReplyTo)

    const emailSendStatus = await fetch("https://api.team71.link/api/v1/public/send-email-attachment", {
      headers: {
        "api-key": data.ApiKey
        // Note: Do NOT set "Content-Type" manually — the browser sets it automatically
        // with the correct multipart/form-data boundary when using FormData
      },
      method: "POST",
      body: formData
    }).then(res => res.json());

    return {
      email: data.To,
      message: emailSendStatus.message,
      status: emailSendStatus.error ? "Not Send" : "Send"
    };
  } catch (error) {
    return {
      email: data.To,
      message: (error as Error).message,
      status: "Not Send"
    };
  }
}
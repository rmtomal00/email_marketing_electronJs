import { parentPort } from "worker_threads";
async function sendEmail(data) {
  try {
    const emailSendStatus = await fetch("https://api.team71.link/api/v1/public/send-email", {
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
    }).then((res) => res.json());
    return {
      email: data.To,
      message: emailSendStatus.message,
      status: emailSendStatus.error ? "Not Send" : "Send"
    };
  } catch (error) {
    return {
      email: data.To,
      message: error.message,
      status: "Not Send"
    };
  }
}
async function sendEmailAttachment(data) {
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
        [new Uint8Array(data.Files.dataBuffer)],
        // 1. Put buffer inside an array []
        data.Files.name,
        // 2. The original filename
        { type: data.Files.type }
        // 3. The original MIME type
      )
    );
    formData.append("replyTo", data.ReplyTo);
    const emailSendStatus = await fetch("https://api.team71.link/api/v1/public/send-email-attachment", {
      headers: {
        "api-key": data.ApiKey
        // Note: Do NOT set "Content-Type" manually — the browser sets it automatically
        // with the correct multipart/form-data boundary when using FormData
      },
      method: "POST",
      body: formData
    }).then((res) => res.json());
    return {
      email: data.To,
      message: emailSendStatus.message,
      status: emailSendStatus.error ? "Not Send" : "Send"
    };
  } catch (error) {
    return {
      email: data.To,
      message: error.message,
      status: "Not Send"
    };
  }
}
if (parentPort) {
  const port = parentPort;
  port.on("message", async (data) => {
    const emailLists = data.emailList;
    while (data.action && emailLists.length > 0) {
      if (!data.file) {
        const emailData = {
          ApiKey: data.apiKey,
          To: emailLists[0],
          From: data.from,
          Content: data.emailBody,
          Subject: data.emailSubject,
          IsHtml: true,
          UseTracker: data.isTracker,
          BrandName: data.brandName,
          ReplyTo: data.replyTo
        };
        const response = await sendEmail(emailData);
        emailLists.shift();
        port.postMessage(response);
      } else {
        const emailDataAtt = {
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
        };
        const res = await sendEmailAttachment(emailDataAtt);
        emailLists.shift();
        port.postMessage(res);
      }
    }
    process.exit(0);
  });
}

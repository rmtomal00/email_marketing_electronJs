import { parentPort as o } from "worker_threads";
async function i(s) {
  try {
    const e = await fetch("https://api.team71.link/api/v1/public/send-email", {
      headers: {
        "Content-Type": "application/json",
        "api-key": s.ApiKey
      },
      method: "POST",
      body: JSON.stringify({
        to: s.To,
        from: s.From,
        subject: s.Subject,
        isHtml: s.IsHtml,
        content: s.Content,
        useTracker: s.UseTracker,
        brandName: s.BrandName,
        replyTo: s.ReplyTo
      })
    }).then((n) => n.json());
    return {
      email: s.To,
      message: e.message,
      status: e.error ? "Not Send" : "Send"
    };
  } catch (e) {
    return {
      email: s.To,
      message: e.message,
      status: "Not Send"
    };
  }
}
async function m(s) {
  try {
    const e = new FormData();
    e.append("to", s.To), e.append("from", s.From), e.append("subject", s.Subject), e.append("content", s.Content), e.append("isHtml", String(s.IsHtml)), e.append("useTracker", String(s.UseTracker)), e.append("brandName", s.BrandName), e.append(
      "files",
      new File(
        [new Uint8Array(s.Files.dataBuffer)],
        // 1. Put buffer inside an array []
        s.Files.name,
        // 2. The original filename
        { type: s.Files.type }
        // 3. The original MIME type
      )
    ), e.append("replyTo", s.ReplyTo);
    const n = await fetch("https://api.team71.link/api/v1/public/send-email-attachment", {
      headers: {
        "api-key": s.ApiKey
        // Note: Do NOT set "Content-Type" manually — the browser sets it automatically
        // with the correct multipart/form-data boundary when using FormData
      },
      method: "POST",
      body: e
    }).then((r) => r.json());
    return {
      email: s.To,
      message: n.message,
      status: n.error ? "Not Send" : "Send"
    };
  } catch (e) {
    return {
      email: s.To,
      message: e.message,
      status: "Not Send"
    };
  }
}
if (o) {
  const s = o;
  s.on("message", async (e) => {
    const n = e.emailList;
    for (; e.action && n.length > 0; )
      if (e.file) {
        const r = {
          ApiKey: e.apiKey,
          To: n[0],
          From: e.from,
          Content: e.emailBody,
          Subject: e.emailSubject,
          IsHtml: !0,
          UseTracker: e.isTracker,
          BrandName: e.brandName,
          Files: e.file,
          ReplyTo: e.replyTo
        }, t = await m(r);
        n.shift(), s.postMessage(t);
      } else {
        const r = {
          ApiKey: e.apiKey,
          To: n[0],
          From: e.from,
          Content: e.emailBody,
          Subject: e.emailSubject,
          IsHtml: !0,
          UseTracker: e.isTracker,
          BrandName: e.brandName,
          ReplyTo: e.replyTo
        }, t = await i(r);
        n.shift(), s.postMessage(t);
      }
    process.exit(0);
  });
}

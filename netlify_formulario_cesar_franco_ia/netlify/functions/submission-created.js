export const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const submission = payload && payload.payload && payload.payload.data ? payload.payload : payload;
    const WEBHOOK_URL = "https://n8n-fumx.onrender.com/webhook/5d1377c1-bcf8-4ade-bb45-3705e4dbd8a3";
    const out = {
      formName: submission.form_name || "contacto-cesar-franco-ia",
      submittedAt: submission.created_at || new Date().toISOString(),
      data: submission.data || {},
      remoteIP: submission.remote_ip || null,
      userAgent: submission.user_agent || null,
    };
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(out),
    });
    console.log("Submission forwarded to webhook:", out.formName);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("Webhook forward error:", err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};

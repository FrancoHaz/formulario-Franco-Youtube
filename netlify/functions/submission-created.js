export const handler = async (event) => {
  try {
    const { N8N_WEBHOOK_URL, WEBHOOK_TOKEN } = process.env;
    const payload = JSON.parse(event.body);
    const submission = payload?.payload?.data ? payload.payload : payload;

    const out = {
      formName: submission.form_name || "contacto-cesar-franco-ia",
      submittedAt: submission.created_at || new Date().toISOString(),
      data: submission.data || {},
      remoteIP: submission.remote_ip || null,
      userAgent: submission.user_agent || null,
    };

    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-token": WEBHOOK_TOKEN
      },
      body: JSON.stringify(out),
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
};

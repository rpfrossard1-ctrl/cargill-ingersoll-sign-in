const { getStore } = require("@netlify/blobs");
const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const store = getStore({
      name: "sign-in-entries",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
      consistency: "strong",
    });

    const incoming = JSON.parse(event.body);
    const id = incoming.id || crypto.randomUUID();

    // ✅ LOAD existing record if it exists
    const existing = await store.get(id).catch(() => null);

    // ✅ MERGE instead of overwrite
    const record = {
      ...(existing ?? {}),
      ...incoming,
      id,
      updatedAt: new Date().toISOString(),
    };

    await store.set(id, record);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id }),
    };
  } catch (err) {
    console.error("Save error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

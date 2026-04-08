const { getStore } = require("@netlify/blobs");
const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const store = getStore({
      name: "sign-in-entries",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
      consistency: "strong",
    });

    const data = JSON.parse(event.body);

    // Reuse existing ID if present, otherwise create one
    const id = data.id || crypto.randomUUID();

    await store.set(id, {
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    });

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

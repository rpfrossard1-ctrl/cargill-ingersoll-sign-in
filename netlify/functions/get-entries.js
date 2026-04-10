const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore({
      name: "sign-in-entries",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
      consistency: "strong",
    });

    const entries = [];

    // ✅ Correct API for Netlify Blobs runtime
    const keys = await store.list();

    for (const key of keys) {
      const value = await store.get(key);
      if (value) entries.push(value);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    };
  } catch (err) {
    console.error("Get error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

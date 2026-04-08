const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore({
      name: "sign-in-entries",                     // MUST match save-entry
      siteID: process.env.NETLIFY_SITE_ID,         // REQUIRED
      token: process.env.NETLIFY_BLOBS_TOKEN,      // REQUIRED
      consistency: "strong",
    });

    const entries = [];

    for await (const { value } of store.entries()) {
      entries.push(value);
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
``

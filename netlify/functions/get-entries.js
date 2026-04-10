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
    let cursor = undefined;

    // ✅ Fully compatible paginated listing
    do {
      const result = await store.list({ cursor });

      if (result?.blobs?.length) {
        for (const { key } of result.blobs) {
          const value = await store.get(key);
          if (value) entries.push(value);
        }
      }

      cursor = result?.next_cursor;
    } while (cursor);

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

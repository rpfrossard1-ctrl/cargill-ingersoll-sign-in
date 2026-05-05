const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore({
      name: "sign-in-entries",
      consistency: "strong"
    });

    const entries = [];

    for await (const { key, value } of store.entries()) {
      entries.push({ ...value, id: key });
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries)
    };
  } catch (err) {
    console.error("Load failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
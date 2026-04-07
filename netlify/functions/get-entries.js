const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore({
      name: "sign-in-entries",
      consistency: "strong"
    });

    const entries = [];

    for await (const entry of store.values()) {
      entries.push(entry);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(entries),
      headers: {
        "Content-Type": "application/json"
      }
    };
  } catch (err) {
    console.error("Fetch error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

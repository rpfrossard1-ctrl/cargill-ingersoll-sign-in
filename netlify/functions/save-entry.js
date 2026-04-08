const { getStore } = require("@netlify/blobs");
const crypto = require("crypto"); // ✅ REQUIRED

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const store = getStore({
      name: "sign-in-entries",
      consistency: "strong"
    });

    const data = JSON.parse(event.body);

    // ✅ Reuse existing ID or create one
    const id = data.id || crypto.randomUUID();

    await store.set(id, {
      ...data,
      id,                                // ✅ store ID in record
      updatedAt: new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id })
    };
  } catch (err) {
    console.error("Save error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

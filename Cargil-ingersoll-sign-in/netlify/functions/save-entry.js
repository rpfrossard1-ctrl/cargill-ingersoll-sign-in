const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const entry = JSON.parse(event.body);

    // ✅ Use frontend-provided ID
    const id = entry.id ?? crypto.randomUUID();

    const store = getStore({
      name: "sign-in-entries",
      consistency: "strong"
    });

    await store.set(id, {
      ...entry,
      id
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id })
    };
  } catch (err) {
    console.error("Save failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
``
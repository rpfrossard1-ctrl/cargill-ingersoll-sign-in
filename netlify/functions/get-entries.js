const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    



const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  const store = getStore("sign-in-entries");

  await store.setJSON("test-key", { ok: true });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};

    const { blobs } = await store.list();

    const entries = await Promise.all(
      blobs.map(b => store.getJSON(b.key))
    );

    return {
      statusCode: 200,
      body: JSON.stringify(entries)
    };
  } catch (err) {
    console.error("get-entries error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
``

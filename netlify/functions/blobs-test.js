

const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  const store = getStore("sign-in-entries");

  await store.setJSON("test-key", { ok: true });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};


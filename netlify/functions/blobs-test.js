
const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  const store = getStore({
    name: "sign-in-entries",
    siteID: process.env.NETLIFY_BLOBS_SITE_ID,
    token: process.env.NETLIFY_BLOBS_TOKEN
  });

  await store.setJSON("test-key", { ok: true });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};

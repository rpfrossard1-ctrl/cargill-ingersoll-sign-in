const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  const store = getStore("sign-in-entries");
  const { blobs } = await store.list();

  const entries = await Promise.all(
    blobs.map(b => store.getJSON(b.key))
  );

  return {
    statusCode: 200,
    body: JSON.stringify(entries.filter(Boolean))
  };
};
``
const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore("visitor-log");
    const { blobs } = await store.list();

    const entries = await Promise.all(
      blobs.map((b) => store.getJSON(b.key))
    );

    return {
      statusCode: 200,
      body: JSON.stringify(entries.filter(Boolean)),
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify([]),
    };
  }
};
``

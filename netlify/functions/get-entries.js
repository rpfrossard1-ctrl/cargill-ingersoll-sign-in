const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    

const store = getStore({
  name: "sign-in-entries",
  siteID: process.env.NETLIFY_BLOBS_SITE_ID,
  token: process.env.NETLIFY_BLOBS_TOKEN,
  endpoint: "https://api.netlify.com"
})
;
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

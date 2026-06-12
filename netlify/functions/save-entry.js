const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    
const store = getStore({
  name: "sign-in-entries",
  siteID: process.env.NETLIFY_BLOBS_SITE_ID,
  token: process.env.NETLIFY_BLOBS_TOKEN
})
;
    const data = JSON.parse(event.body);

    const key = `entry-${data.id || Date.now()}`;
    await store.setJSON(key, data);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "Saved" })
    };
  } catch (err) {
    console.error("Save error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
``

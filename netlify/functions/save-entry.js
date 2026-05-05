const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const store = getStore("sign-in-entries");
  const data = JSON.parse(event.body);

  const key = `entry-${data.id || Date.now()}`;
  await store.setJSON(key, data);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "Saved" })
  };
};
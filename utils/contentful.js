// contentful.js
const contentful = require("contentful");

const client = contentful.createClient({
  space: "fhy2qtaxeszv",
  accessToken: "oSlFBcQV9lj3-XLj7X0Gwvx5PLqJWpmwEE_WZrOQ_j0",
});

module.exports = client;

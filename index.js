const express = require("express");
const auth = require("prismarine-auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const { session } = await auth(username, password, "bedrock");
    res.json({ token: session.accessToken });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Authentication failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Prismarine Auth is online 🎉");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

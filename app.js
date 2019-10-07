const express = require("express");

const app = express();

app.use(express.json());

app.post("/done", (req, res) => {
    console.log(req.body)
    res.sendStatus(202);
});

module.exports = app;

const express = require("express");
const morgan = require("morgan");

const { done } = require("./trello");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const CARD_URL_REGEX = /\/c\/([\w\d]+)/;

app.post("/done", (req, res) => {
	const cardUrl = req.body.card;
	const match = CARD_URL_REGEX.exec(cardUrl);
	if (match) {
		const cardId = match[1];
		console.log(`Updating card ${cardId}`);
		return done(cardId)
			.then(() => res.sendStatus(202))
			.catch(() => res.sendStatus(500));
	}
	console.log(`No card URL in ${cardUrl}`);
	return res.sendStatus(400);
});

module.exports = app;

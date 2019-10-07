const axios = require("axios");

module.exports = {
	done: (cardId) => axios.request({
		method: "PUT",
		params: {
			key: process.env.TRELLO_API_KEY,
			token: process.env.TRELLO_API_TOKEN,
			value: true,
		},
		url: `https://api.trello.com/1/cards/${cardId}/dueComplete`,
	}),
};

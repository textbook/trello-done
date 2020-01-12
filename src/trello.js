const axios = require("axios");

const client = axios.create({
	baseURL: "https://api.trello.com/1",
	params: {
		key: process.env.TRELLO_API_KEY,
		token: process.env.TRELLO_API_TOKEN,
	},
});

module.exports = {
	done: (cardId) => client.request({
		method: "PUT",
		params: { value: true },
		url: `/cards/${cardId}/dueComplete`,
	}),
};

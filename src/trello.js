const axios = require("axios");

const client = axios.create({
	// force Node default to allow Nock usage with Jest
	// See https://www.npmjs.com/package/nock#axios
	adapter: require("axios/lib/adapters/http"),
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

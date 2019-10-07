const axios = require("axios");

const credentials = {
    key: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_API_TOKEN,
};

module.exports = {
    done: (cardId) => axios.request({
        method: "PUT",
        query: { ...credentials, value: true },
        url: `https://api.trello.com/1/cards/${cardId}/dueComplete`,
    }),
};

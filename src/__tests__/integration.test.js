const nock = require("nock");
const request = require("supertest");

const credentials = {
	key: "h8L5jui72RLnUo1k",
	token: "vQtq1y8MrHC60JLj0tdaeyhfnUPlBrMM",
};

describe("trello-done", () => {
	let app;
	const cardId = "abc123";

	beforeEach(() => {
		jest.resetModules();
		global.process.env = {
			TRELLO_API_KEY: credentials.key,
			TRELLO_API_TOKEN: credentials.token,
		};
		app = require("../app");
	});

	it("returns OK on success", () => {
		const scope = nock("https://api.trello.com")
			.put(`/1/cards/${cardId}/dueComplete`)
			.query({ ...credentials, value: true })
			.reply(200);

		return request(app)
			.post("/done")
			.send({ card: `https://trello.com/c/${cardId}` })
			.expect(200)
			.then(() => scope.done());
	});

	it("returns Bad Request without card URL", () => {
		return request(app)
			.post("/done")
			.expect(400);
	});

	it("returns Internal Server Error if the Trello request fails", () => {
		const scope = nock("https://api.trello.com")
			.put(`/1/cards/${cardId}/dueComplete`)
			.query({ ...credentials, value: true })
			.replyWithError("whoops");

		return request(app)
			.post("/done")
			.send({ card: `https://trello.com/c/${cardId}` })
			.expect(500)
			.then(() => scope.done());
	});
});

const express = require("express");
const { GraphQLClient, gql } = require("graphql-request");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	console.log({
		body: JSON.stringify(req.body),
		params: JSON.stringify(res.query),
	});
	console.log({ env: process.env.MONDAY_API_ENDPOINT });
	await main();

	res.send("Hello World!");
});

app.post("/", (req, res) => {
	console.log({
		body: JSON.stringify(req.body),
		params: JSON.stringify(res.query),
	});

	await main();
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

async function main() {
	const endpoint = process.env.MONDAY_API_ENDPOINT;

	const query = gql`
		mutation AddItem($itemName: String!) {
			create_item(board_id: 3106569925, item_name: $itemName) {
				id
			}
		}
	`;

	const variables = {
		itemName: "here",
	};

	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {},
	});

	graphQLClient.setHeader("Content-Type", "application/json");
	graphQLClient.setHeader(
		"Authorization",
		`Bearer ${process.env.MONDAY_API_KEY}`
	);

	const data = await graphQLClient.request(query, variables);
	console.log(JSON.stringify(data));
}

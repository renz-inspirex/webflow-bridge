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

	// const requestHeaders = {};

	// console.log({ query });
	const data = await graphQLClient.request(query, variables);
	// // const data = await request("https://api.graph.cool/simple/v1/movies", query);
	// // request();

	// let query3 =
	// 	'mutation{ create_item (board_id:3106569925, item_name:"WHAT IS UP MY FRIENDS!") { id } }';
	// const data = await fetch("https://api.monday.com/v2", {
	// 	method: "post",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NTQwMTM2OSwidWlkIjozMzIwMzgwMywiaWFkIjoiMjAyMi0wOC0xNVQwNzowMzowOC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMwOTExMzUsInJnbiI6InVzZTEifQ.9ajwc9LX66g7-UYtXOGOobwNU-ZtwlINMJ5O6Vvm_cU`,
	// 	},
	// 	body: JSON.stringify({
	// 		query: query3,
	// 	}),
	// })
	// 	.then((res) => res.json())
	// 	.then((res) => console.log(JSON.stringify(res, null, 2)));

	console.log(JSON.stringify(data));
}

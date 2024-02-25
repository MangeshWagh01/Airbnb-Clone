const mongoose = require("mongoose");
const sampleListings = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const initDB = async () => {
	console.log("initializing data...");
	await Listing.deleteMany({});
	await Listing.insertMany(sampleListings);
	console.log("data was initialized");
};

// initDB();

main()
	.then(() => {
		console.log("connected to DB");
		initDB();
	})
	.catch((err) => {
		console.log(err);
	});

async function main() {
	await mongoose.connect(MONGO_URL);
}
module.exports = main;

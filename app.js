const express = require("express"); //required express
const app = express();

const mongoose = require("mongoose"); // required Mongoose

const Listing = require("./models/listing.js"); // required the schema

const path = require("path"); // path define

const methodOverride = require("method-override"); // method overriden for put req

const ejsMate = require("ejs-mate");

const main = require("./init/index.js"); // required the init file

main();

// for used in the ejs file initialitions

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
	res.send("server is working");
});

// Index Route
app.get("/listings", async (req, res) => {
	const allListings = await Listing.find({});
	res.render("listings/index.ejs", { allListings });
});

// New Route

app.get("/listings/new", (req, res) => {
	res.render("listings/new.ejs");
});

// Show route

app.get("/listings/:id", async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id);
	res.render("listings/show.ejs", { listing });
});

// Create Route

app.post("/listings", async (req, res) => {
	const { title, description, price, location, country, image } =
		req.body.listing;
	const newListing = new Listing({
		title,
		description,
		price,
		location,
		country,
		image: { url: image },
	});
	// console.log(newListing);
	await newListing.save();
	res.redirect("/listings");
});

// Edit Route

app.get("/listings/:id/edit", async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id);
	res.render("listings/edit.ejs", { listing });
});

// Update Route

app.put("/listings/:id", async (req, res) => {
	let { id } = req.params;
	// console.log(req.body);
	const imageObj = req.body["listing[image"].url;

	await Listing.findByIdAndUpdate(id, {
		image: { url: imageObj },
		...req.body.listing,
	});
	res.redirect(`/listings/${id}`); // to redirec to the data page insied the titles
	// res.redirect("/listings");     // to redirct main page
});

// Delete Route

app.delete("/listings/:id", async (req, res) => {
	let { id } = req.params;
	let deleteListing = await Listing.findByIdAndDelete(id);
	console.log(deleteListing);
	res.redirect("/listings");
});

// checking connections

app.listen(8080, () => {
	console.log("Server is listening to the port http://localhost:8080");
});

// app.get("/testListing",async (req,res) =>
// {
//         let sampleListing = new Listing({
//             title:"My Villa",
//             desciption : "By the beach",
//             price :1200,
//             location : "Calangute, Goa",
//             country :"India",
//         });
//      await sampleListing.save();
//      console.log("sample was save");
//      res.send("Successful testing ");
// });

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/event-manager").then(
	() => {
		console.log("Connected to database.");
	},
	(err) => {
		console.log(err);
	}
);

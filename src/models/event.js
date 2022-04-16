const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		e_code: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		owner: {
			type: String,
			required: true,
			ref: "User",
		},
		invited: {
			type: [],
		},
	},
	{
		timestamps: true,
	}
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

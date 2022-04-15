const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
			trim: true,
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
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

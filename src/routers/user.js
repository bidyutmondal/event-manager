const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/register", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.username,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
});

router.post("/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();

		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.patch("/update_password", auth, async (req, res) => {
	try {
		req.user["password"] = req.body["new_password"];
		await req.user.save();
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.patch("/reset_password", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body["email"] });
		user["password"] = req.body["new_password"];
		await user.save();
		res.send(user);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

module.exports = router;

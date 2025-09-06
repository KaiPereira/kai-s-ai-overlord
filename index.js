import express from "express";
import bodyParser from "body-parser";
import { WebClient } from "@slack/web-api";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const client = new WebClient(process.env.SLACK_BOT_TOKEN);
const PRIVATE_CHANNEL_ID = "C09D6UCAUC8";

app.post("/join", async (req, res) => {
	const userId = req.body.user_id;

	try {
		await client.conversations.invite({
			channel: PRIVATE_CHANNEL_ID,
			users: userId,
		});

		res.send(`Is that really you <@${userId}>? Welcome to my mindspace :D`);
	} catch (error) {
		console.error(error);
		res.send("Whoooops, my cat hit the self-destruct server button, or maybe you're just already in the channel?");
	}
});

app.listen(3000, () => console.log("Kai's AI overlord is already running on port 3000"));


import express from "express";
import cors from "cors";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Global variables
const users = [];
const tweets = [];

// Sign Up Route
app.post("/sign-up", (req, res) => {
  const id = users.length + 1;
  const { username, avatar } = req.body;
  const newUser = {
    id,
    username,
    avatar,
  };

  users.push(newUser);

  res.send("OK");
});

// Post Tweets Route
app.post("/tweets", (req, res) => {
  const id = tweets.length + 1;
  const { username, tweet } = req.body;
  const userValidated = users.find((user) => user.username === username);

  if (!userValidated) {
    return res.send("UNAUTHORIZED");
  }

  const newTweet = {
    id,
    username,
    tweet,
  };

  tweets.push(newTweet);

  res.send("OK");
});

// Get Tweets Route
app.get("/tweets", (req, res) => {
  if (tweets.length === 0) {
    return res.send(tweets);
  }

  const lastTweets = tweets.slice(-10);
  const tweetsWithAvatar = [];

  for (let i = 0; i < lastTweets.length; i++) {
    const avatar = users.find(
      (user) => user.username === lastTweets[i].username
    );
    const tweet = {
      id: i + 1,
      username: avatar.username,
      avatar: avatar.avatar,
      tweet: lastTweets[i].tweet,
    };

    tweetsWithAvatar.push(tweet);
  }

  res.send(tweetsWithAvatar);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

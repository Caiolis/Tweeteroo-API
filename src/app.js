import express from "express";
import cors from 'cors';

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Global variables
const users = [];
const tweets = [];

// Sign Up Route
app.post('/sign-up', (req, res) => {
  const id = users.length + 1;
  const { username, avatar } = req.body;
  const newUser = {
    id,
    username,
    avatar
  };

  users.push(newUser);

  res.send('OK');
})

// Get Tweets Route
app.get('/tweets', (req, res) => {
  res.send(tweets);
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
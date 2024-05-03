const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("get the response");
});

async function run() {
  try {
    

    let movies = [];
    let users = [];
  

    // User Registration
    app.post("/register", (req, res) => {
      const { email } = req.body;
      users.push({ email, favorites: [] });
      res.send("User registered successfully");
    });

    // Add Movie
    app.post("/movies", (req, res) => {
      const { title, cast, category, releaseDate, budget } = req.body;
      movies.push({ title, cast, category, releaseDate, budget });
      res.send("Movie added successfully");
    });

    // Search Movies
    app.get("/movies", (req, res) => {
      const { query } = req.query;
      const filteredMovies = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.cast.toLowerCase().includes(query.toLowerCase()) ||
          movie.category.toLowerCase().includes(query.toLowerCase())
      );
      const sortedMovies = filteredMovies.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      res.json(sortedMovies);
    });

    // Movie Details
    app.get("/movies/:id", (req, res) => {
      const { id } = req.params;
      const movie = movies.find((movie) => movie.title === title);
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    });

    // Add to Favorites
    app.post("/users/:email/favorites", (req, res) => {
      const { email } = req.params;
      const { title } = req.body;
      const user = users.find((user) => user.email === email);
      const movie = movies.find((movie) => movie.title === title);
      if (user && movie) {
        user.favorites.push(movie);
        res.send("Movie added to favorites");
      } else {
        res.status(404).send("User or movie not found");
      }
    });

    // Remove from Favorites
    app.delete("/users/:email/favorites/:title", (req, res) => {
      const { email, title } = req.params;
      const user = users.find((user) => user.email === email);
      if (user) {
        const index = user.favorites.findIndex(
          (movie) => movie.title === title
        );
        if (index !== -1) {
          user.favorites.splice(index, 1);
          res.send("Movie removed from favorites");
        } else {
          res.status(404).send("Movie not found in favorites");
        }
      } else {
        res.status(404).send("User not found");
      }
    });

    // View Personal Details and Favorites
    app.get("/users/:email", (req, res) => {
      const { email } = req.params;
      const user = users.find((user) => user.email === email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    });

    // Search Favorites
    app.get("/users/:email/favorites", (req, res) => {
      const { email } = req.params;
      const { query } = req.query;
      const user = users.find((user) => user.email === email);
      if (user) {
        const filteredFavorites = user.favorites.filter(
          (movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.cast.toLowerCase().includes(query.toLowerCase()) ||
            movie.category.toLowerCase().includes(query.toLowerCase())
        );
        const sortedFavorites = filteredFavorites.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        res.json(sortedFavorites);
      } else {
        res.status(404).send("User not found");
      }
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);
app.listen(port, () => {
  console.log("listen to the port", port);
});

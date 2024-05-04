import { test, expect } from 'vitest';
import { response } from 'express';
const users=["x@gmail.com", 'example@example.com']
const movies=["Example Movie", 'xyx']

    test('Add movies to the favourite',  async () => {

        const userEmail = 'example@example.com'; // Example user email
        const movieTitle = 'Example Movie'; // Example movie title
        const user = users.find((user) => user.email === userEmail);
        const movie = movies.find((movie) => movie.title === movieTitle);
        
        // Make a request to your app's '/users/:email/favorites' endpoint
        
        // const response = await app.inject({
        //   method: 'POST',
        //   url: `/users/${userEmail}/favorites`,
        //   body: { title: movieTitle },
        // });
        
        if (user && movie) {
          // Check if the response status code is 200 (OK) when both user and movie exist
          expect(response.statusCode).toBe(200);
          // Assert that the response message indicates the movie was added to favorites
          expect(response.payload).toEqual('Movie added to favorites');
          // Check if the user's favorites array contains the added movie
          expect(user.favorites).toContainEqual(movie);
        } else {
          // If user or movie not found, assert that the response status code is 404
          expect(response.statusCode).toBe(404);
          expect(response.payload).toEqual('User or movie not found');
        }
        



    })



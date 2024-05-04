import { test, expect } from 'vitest';
import { response } from 'express';
const users=["x@gmail.com", 'example@example.com']
const movies=["Example Movie", 'xyx']

    test('Remove the movies from favourites',  async () => {

        const userEmail = 'example@example.com'; // Example user email
        const movieTitle = 'Example Movie'; // Example movie title
        const user = users.find((user) => user.email === userEmail);
      
        // Make a request to your app's '/users/:email/favorites/:title' endpoint
        // const response = await app.inject({
        //   method: 'DELETE',
        //   url: `/users/${userEmail}/favorites/${movieTitle}`,
        // });
      
        if (user) {
          const initialFavoritesLength = user.favorites.length;
      
          // Check if the response status code is 200 (OK) when user exists
          expect(response.statusCode).toBe(200);
          // Assert that the response message indicates the movie was removed from favorites
          expect(response.payload).toEqual('Movie removed from favorites');
      
          // Check if the user's favorites array length has decreased by 1
          expect(user.favorites.length).toBe(initialFavoritesLength - 1);
          // Check if the removed movie is no longer in the user's favorites array
          expect(user.favorites.some((movie) => movie.title === movieTitle)).toBe(false);
        } else {
          // If user not found, assert that the response status code is 404
          expect(response.statusCode).toBe(404);
          expect(response.payload).toEqual('User not found');
        }
    })



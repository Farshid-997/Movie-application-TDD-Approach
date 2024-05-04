import { response } from 'express';
import { test, expect } from 'vitest';

const users=["x@gmail.com", 'example@example.com']
const movies=["Example Movie", 'xyx']
test("Check the search of the movies ", async () => {
    const userEmail = 'example@example.com'; // Example user email
    const user = users.find((user) => user.email === userEmail);
  
    // Make a request to your app's '/users/:email/favorites' endpoint
    // const response = await app.inject({
    //   method: 'GET',
    //   url: `/users/${userEmail}/favorites`,
    // });
  
    if (user) {
      // Check if the response status code is 200 (OK) when user exists
      expect(response.statusCode).toBe(200);
      // Parse the response JSON
      const responseBody = JSON.parse(response.payload);
      // Assuming you have a list of expected favorite movies for the user
      const expectedFavorites = user.favorites;
      // Assert that the response body matches the expected favorites
      expect(responseBody).toEqual(expectedFavorites);
    } else {
      // If user not found, assert that the response status code is 404
      expect(response.statusCode).toBe(404);
      expect(response.payload).toEqual('User not found');
    }
});

import { test, expect } from 'vitest';
import { response } from 'express';
test("Retrieve details for a specific movie by ID ", async () => {
    const movieId = 123; // Example movie ID
  const expected = {
    // Example expected result based on the assumption of the provided movies data
    id: 123,
    title: 'Example Movie',
    cast: 'Actor A, Actress B',
    category: 'Action',
    releaseDate: '2023-01-01',
    budget: '$10,000,000',
    // Add more properties as per your movie data structure
  };

  // Make a request to your app's '/movies/:id' endpoint with the movieId
  // const response = await app.inject({
  //   method: 'GET',
  //   url: `/movies/${movieId}`,
  // });

  if (response.statusCode === 200) {
    const actual = response.json(); // Assuming the response contains JSON data

    // Assert that the actual result matches the expected result
    expect(actual).toEqual(expected);
  } else {
    // If movie is not found, assert that the response status code is 404
    expect(response.statusCode).toEqual(404);
    expect(response.payload).toEqual('Movie not found');
  }
});

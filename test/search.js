describe("Check the search of the movies ", async () => {
    const query = 'action'; // Example query

    const expected = [
      // Example expected result based on the assumption of the provided movies data
      { title: 'Action Movie 1', cast: 'Actor A, Actress B', category: 'Action' },
      { title: 'Action Movie 2', cast: 'Actor C, Actress D', category: 'Action' },
      // Add more expected results based on your movies data
    ];
  
    // Make a request to your app's '/movies' endpoint with the query
    const response = await app.inject({
      method: 'GET',
      url: '/movies',
      query: { query },
    });
  
    const actual = response.json(); // Assuming the response contains JSON data
  
    // Assert that the actual result matches the expected result
    expect(actual).toEqual(expected);

});

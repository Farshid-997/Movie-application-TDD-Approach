import { test } from 'vitest';


test('Test /register endpoint', async ({ assert }) => {
  // Create a fake request object with a body containing the email
  const fakeRequest = { body: { email: 'test@example.com' } };

  // Create an empty response object with a send method
  let response = null;
  const fakeResponse = {
    send: (message) => {
      response = message;
    }
  };

  // Call the route handler function with the fake request and response
  await app.post("/register", fakeRequest, fakeResponse);

  // Assert that the response message is as expected
  assert(response === "User registered successfully", 'Response text should be "User registered successfully"');
});

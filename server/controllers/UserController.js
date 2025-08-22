


// api controller function to manage clerk user with database
// https://localhost:4000/api/user/webhooks

const clerkWebhook = async (req, res) => {
  try {
    const { event, data } = req.body;

    if (event === 'user.created') {
      // Handle user creation logic here
      console.log('User created:', data);
      // You can save the user to the database if needed
    } else if (event === 'user.updated') {
      // Handle user update logic here
      console.log('User updated:', data);
      // Update the user in the database if needed
    } else {
      console.log('Unhandled event:', event);
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Internal Server Error');
  }
}
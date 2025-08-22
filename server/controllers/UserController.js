import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// Clerk webhook handler
const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // verify expects raw body, not parsed JSON
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await userModel.create(userData);
        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        return res.json({ success: true });
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        return res.json({ success: true });
      }

      default:
        return res.json({ success: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export { clerkWebhook };

const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = await Message.create({ name, email, message });

    await sendEmail(name, email, message);

    res.status(201).json({
      success: true,
      message: "Message sent successfully 🚀"
    });

      ``
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage };
const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Save to MongoDB
    const newMessage = await Message.create({ name, email, message });

    // 2. Send to your inbox
    await sendEmail({
      to: "krupashahwork@gmail.com",
      subject: `Portfolio Enquiry: ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // 3. Clean response (No backticks!)
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
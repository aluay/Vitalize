import Message from "../models/Message.js";
// import nodemailer from "nodemailer";
import Client from "../models/Client.js";

// Create a new message
export const createMessage = async (req, res) => {
  // ... existing code ...
};

// Get all messages for a client
export const getMessagesByClient = async (req, res) => {
  // ... existing code ...
};

// Update a message
export const updateMessage = async (req, res) => {
  // ... existing code ...
};

// Delete a message
export const deleteMessage = async (req, res) => {
  // ... existing code ...
};

// Send message via email
const sendEmail = (email, subject, body) => {
  // ... existing code ...
};

// Schedule and send messages
export const scheduleAndSendMessages = async () => {
  // ... existing code ...
};

// Get sent messages in the last 7 days
export const getSentMessagesInLast7Days = async () => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    const messages = await Message.find({
      sendStartDate: { $lte: now },
      sendEndDate: { $gte: sevenDaysAgo },
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching sent messages in the last 7 days:", error);
    return res
      .status(500)
      .json({ message: "Error fetching sent messages", error: error.message });
  }
};

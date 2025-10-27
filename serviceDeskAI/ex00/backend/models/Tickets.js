import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "open" },
  createdAt: { type: Date, default: Date.now }
});

const TicketModel = mongoose.model("TicketModel", ticketSchema);

export default TicketModel;

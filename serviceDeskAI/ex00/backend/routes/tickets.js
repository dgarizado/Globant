import express from "express";
import TicketModel from "../models/Ticket.js";

const router = express.Router();

/**
 * GET /tickets -> lists all tickets
 */
router.get("/", async (req, res) => {
  const tickets = await TicketModel.find();
  res.json(tickets);
});

/**
 * POST /tickets -> create a new ticket
*/
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const ticket = new TicketModel({ title, description });
  await ticket.save();
  res.status(201).json(ticket);
});

/**
 * PATCH /tickets/:id -> update ticket status
 */
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  const ticket = await TicketModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(ticket);
});

export default router;

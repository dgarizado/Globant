/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ticketController.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:58:18 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 10:03:55 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Ticket from "../models/Ticket.js";

/**
 * 
 * @param {*} req 
 * @param {*} res
 * If the user role is 'user', fetch only their tickets.
 * If the user role is 'admin' or 'service', fetch all tickets. 
 * @returns 
 * response with the list of tickets or a message if none are available.
 *
 * Every user at this point is authenticated via the verifyToken middleware and has a role.
 */
export const getTickets = async (req, res) => {

  let tickets;

  try {

    if (req.user.role === "user") {
      tickets = await Ticket.find({ userId: req.user.id });
    } else {
      tickets = await Ticket.find().populate("userId", "name email");
    }
    if (!tickets || tickets.length === 0) {
      return res.json({ message: "there are no tickets available" });
    }
    res.json({ tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const ticket = new Ticket({ title, description, userId });
    const savedTicket = await ticket.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res
 * Updates the status of a ticket identified by its ID.
 * the body of the request should contain the new status and the ticket id. 
 * @returns 
 */
export const updateTicket = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    res.json({ message: "Ticket eliminado", ticket: deletedTicket });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

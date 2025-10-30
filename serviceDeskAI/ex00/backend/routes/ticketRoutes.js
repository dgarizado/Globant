/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ticketRoutes.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:35 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 10:24:06 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * User Roles:
 * - "user": Can create tickets and view their own tickets.
 * - "service": Can view and update the status of tickets.
 * - "admin": Can create users and all ticket operations.
 */
import express from "express";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.use(verifyToken);
router.get("/", getTickets);
router.post("/", createTicket, authorizeRole("user"));
router.patch("/:id", updateTicket, authorizeRole("service"));
router.delete("/:id", deleteTicket, authorizeRole("service"));

/**
 * Endpoints todo:
 * - GET /api/tickets/:id - Get a specific ticket by ID (accessible by 'user', 'service', 'admin')
 * - Something for service user that can receive tickets as assigned.
 * - something for admin to create users and offices.  
 */

export default router;

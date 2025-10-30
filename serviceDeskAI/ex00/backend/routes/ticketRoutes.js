/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ticketRoutes.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:35 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 22:47:17 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * User Roles:
 * - "user": Can create tickets and view their own tickets.
 * - "service": Can view and update the status of tickets.
 * - "admin": Can create users and all ticket operations.
 */
import express from "express";
import multer from 'multer';
import path from 'path';
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Multer setup for single photo upload
const uploadDir = path.resolve(process.cwd(), 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
});
const upload = multer({ storage });

router.use(verifyToken);
router.get("/", getTickets);
// POST /api/tickets - allow users to create tickets, optionally with a photo
router.post("/", authorizeRole("user"), upload.single('photo'), createTicket);
router.patch("/:id", authorizeRole("service"), updateTicket);
router.delete("/:id", authorizeRole("service"), deleteTicket);

/**
 * Endpoints todo:
 * - GET /api/tickets/:id - Get a specific ticket by ID (accessible by 'user', 'service', 'admin')
 * - Something for service user that can receive tickets as assigned.
 * - something for admin to create users and offices.  
 */

export default router;

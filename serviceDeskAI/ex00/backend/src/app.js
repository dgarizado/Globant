/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:40 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 23:00:29 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import express from "express";
import path from 'path';
import fs from 'fs';
import ticketRoutes from "../routes/ticketRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";


const app = express();
app.use(express.json());
const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ServiceDeskAI API online DGARIZAD-GLOBANT" });
});

export default app;

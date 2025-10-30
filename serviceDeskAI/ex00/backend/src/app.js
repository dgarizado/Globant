/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:40 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 10:47:33 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import express from "express";
import ticketRoutes from "../routes/ticketRoutes.js";
import authRoutes from "../routes/authRoutes.js";


const app = express();
app.use(express.json());
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ServiceDeskAI API online DGARIZAD-GLOBANT" });
});

export default app;

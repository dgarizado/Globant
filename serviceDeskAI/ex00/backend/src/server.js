/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:44 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 23:00:55 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import app from "./app.js";
import { connectDB } from "../config/db.js";
import { seedAdminUser } from "../config/seedAdmin.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();     
    await seedAdminUser(); 
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

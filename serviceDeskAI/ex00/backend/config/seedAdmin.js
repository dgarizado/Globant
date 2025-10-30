/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   seedAdmin.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 10:34:44 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 11:02:09 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


 
import bcrypt from "bcryptjs";
import User from "../models/User.js";

/**
 * Seeds the database with an Admin user if doesnt exist.
 * THIS COULD BE DANGEROUS IN PRODUCTION ENVIRONMENTS.
 * BETTER TO DO THIS DURING CONTAINER ORCHESTRATION.
 */
export const seedAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      name: process.env.ADMIN_USERNAME,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
  }
};

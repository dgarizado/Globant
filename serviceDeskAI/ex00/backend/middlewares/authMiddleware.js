/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   authMiddleware.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:16 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 09:59:17 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "not authorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

/** 
 * Middleware to authorize user roles.
 * @param  {...any} allowedRoles - Roles allowed to access the route.
 * Verifies if the user's role is included in the allowedRoles.
 * @returns 
 */
export const authorizeRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied, you do not have the required role" });
  }
  next();
};


/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   authRoutes.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:31 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 11:50:43 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;

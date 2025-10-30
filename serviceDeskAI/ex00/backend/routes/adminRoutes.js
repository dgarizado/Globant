/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   adminRoutes.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 22:59:36 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 22:59:45 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import express from 'express';
import { createUser } from '../controllers/adminController.js';
import { verifyToken, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/users', verifyToken, authorizeRole('admin'), createUser);

export default router;

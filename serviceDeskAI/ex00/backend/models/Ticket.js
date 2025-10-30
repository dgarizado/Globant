/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Ticket.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 10:00:03 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 10:00:04 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['open', 'in_progress', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;

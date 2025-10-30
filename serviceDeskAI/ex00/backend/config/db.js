/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   db.js                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dgarizad <dgarizad@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/10/30 09:59:07 by dgarizad          #+#    #+#             */
/*   Updated: 2025/10/30 09:59:08 by dgarizad         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const mongoURI = process.env.MONGO_URI || 'mongodb://database:27017/servicedeskai';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(' Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

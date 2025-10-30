import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    const saved = await user.save();

    res.status(201).json({ message: 'User created', user: { id: saved._id, name: saved.name, email: saved.email, role: saved.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const JWT_SECRET = process.env.JWT_SECRET || 'abcd';

const signup = async (req, res){
    const { username, email, password } = req.body;
}

try {
    const existingUser = User.findOne({ where: { email } })
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists please login' })
    }
    const newUser = User.create({ username, email, password })
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' })
    res.status(201).json({ token })
} catch (error) {
    res.status(500).json({ error: 'Error creating user' })

}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token })
    } catch (error) {
        return res.status(500).json({ error: 'Error logging user in' })
    }
}
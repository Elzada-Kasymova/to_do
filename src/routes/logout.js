import express from "express"

const router = express.Router()

router.post('/logout', (req, res) => {
    // Если вы используете cookie для токенов
    res.clearCookie('token', { httpOnly: true, secure: true });
    return res.status(200).json({ message: 'Logout successful' });
});

export default router
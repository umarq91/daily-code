import express, { Request, Response } from 'express';
const router = express.Router();
import { client } from '../db'; // Assuming client is correctly initialized elsewhere
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middlewares/auth';
// Middleware to handle errors and avoid repetitive code
const handleError = (res: Response, error: any) => {
    res.status(500).json({ error: error });
};

// Signup route
router.post('/signup', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {

        const query1 = 'SELECT * FROM users WHERE email = $1';
        const values1 = [email];
        const result1 = await client.query(query1, values1);

        if (result1.rows.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }


        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
        const values = [username, email, hashedPassword];
        const result = await client.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        handleError(res, error);
    }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        console.log("user");
       const token =  jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
       const {password_hash,...rest} = user
       res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        
       res.json({
            message:"Login Success"
        });
    } catch (error) {
        handleError(res, error);
    }
});


router.get('/profile', authenticateJWT, (req: Request, res: Response) => {
    res.json({ message: 'This is a protected route', user: (req as any).user });
});
export default router;

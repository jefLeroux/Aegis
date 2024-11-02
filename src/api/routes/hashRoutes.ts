import { Router } from 'express';
import { verifyHash } from '../services/hashService';

const router = Router();

// POST endpoint to verify file hash
router.post('/verify-hash', async (req, res) => {
    // console.log("Received request:", req.body); // Log incoming request
    const { filePath, correctHash } = req.body;

    try {
        const result = await verifyHash(filePath, correctHash);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

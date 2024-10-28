import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Hello from Hugging Face!');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        
        res.status(200).json({ photo: base64Image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

export default router;

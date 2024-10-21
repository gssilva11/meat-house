import express from 'express';
import { uploadImage, upload } from '../controllers/uploadController.js';

const router = express.Router();

// Rota para upload de imagem
router.post('/upload', upload.single('image'), uploadImage);

export default router;

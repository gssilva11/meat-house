import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do multer para armazenar os arquivos na pasta correta
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/src/assets/products')); // Caminho da pasta de upload
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Adiciona timestamp ao nome do arquivo
  }
});

export const upload = multer({ storage });

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }
  res.status(200).json({
    message: 'Upload feito com sucesso',
    imageUrl: `/src/assets/products/${req.file.filename}`
  });
};

import __dirname from "./index.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const type = req.query.type || 'documents';
        const folder = type === 'pet' ? 'pets' : 'documents';
        const uploadPath = path.join(__dirname, '..', 'public', folder);

        // Asegurar que exista la carpeta
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({ storage });
export default uploader;

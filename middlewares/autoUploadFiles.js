import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const uploadDir = path.join('.', 'public', 'assets');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024 // 5MB file size limit
  }
});

const autoFileUploadMiddleware = (req, res, next) => {
    upload.any()(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error', details: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Unknown upload error', details: err.message });
        }

        // If files were uploaded, modify the request body
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const fileUrl = `/statics/assets/${file.filename}`;
                
                for (let key in req.body) {
                    if (req.body[key] === file.originalname) {
                        req.body[key] = fileUrl;
                    }
                }
            });
        }

        next();
    });
};

export default autoFileUploadMiddleware;
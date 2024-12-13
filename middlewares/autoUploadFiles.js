import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// __dirname is not directly available in ES Modules. We need to derive it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the absolute path to the upload directory relative to the project root
const projectRootDir = path.join(__dirname, '..'); // Go up one level from the middleware directory
const uploadDir = path.join(projectRootDir, 'public', 'assets');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration (remains mostly the same)
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
    fileSize: 25 * 1024 * 1024 // 25MB file size limit (as you had)
  }
});

const autoFileUploadMiddleware = (req, res, next) => {
    upload.single('thumbnail')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'File upload error', details: err.message });
        } else if (err) {
          return res.status(500).json({ error: 'Unknown upload error', details: err.message });
        }

        if (req.file) {
          const fileUrl = `/statics/assets/${req.file.filename}`;
    
          req.body.thumbnail = fileUrl;
        }
    
        next();
      });
};

export default autoFileUploadMiddleware;
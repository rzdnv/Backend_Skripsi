import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';

// Define the storage configuration
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|image/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Jika tipe file sesuai, lanjutkan proses upload
    } else {
        cb(new Error('Only .png, .jpg, .jpeg, and .image formats are allowed!')); // Jika tidak sesuai, beri error
    }
};

// Set storage configuration
const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, 'public/assets/image'); // Folder tempat penyimpanan
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const timestamp = Date.now();
        const sanitizedFileName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '');
        const namaFile = `${timestamp}-${sanitizedFileName}`;

        req.body = { ...req.body, namaFile }; // Tambahkan nama file ke req.body
        cb(null, namaFile); // Set nama file
    }
});

// Middleware konfigurasi upload dengan file filter dan batas ukuran file
export const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // Batas ukuran file maksimal 3MB
    fileFilter, // Validasi tipe file
});

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({ 
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Tamaño máximo de archivo: 2MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos JPEG, JPG y PNG.'));
        }
    }
});

const storageDoc = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'Controller/docs');
    },
    filename: (req,file,cb) => {
        cb(null, `${file.originalname}`);
    }
})
export const upload_doc = multer ({
    storage: storageDoc
});
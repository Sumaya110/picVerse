import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images'); // Set destination folder for uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, Date.now() + ext); // Name the file based on the timestamp
  }
});

const upload = multer({ storage: storage });

export default upload;

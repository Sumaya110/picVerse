import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext); // Name the file based on the timestamp
  }
});

const upload = multer({ storage: storage });

export default upload;

// backend/routes/upload.js
import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);


router.post('/upload', (req, res) => {
  const form = formidable();

  form.uploadDir = path.join(__dirname, '../uploads/images');
  form.keepExtensions = true; 

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error processing file' });
    }

    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/images/${file.originalFilename}`;


   
    fs.rename(file.filepath, path.join(form.uploadDir, file.originalFilename), (err) => {
      if (err) {
        return res.status(500).json({ error: 'File rename failed' });
      }
    });

    res.status(200).json({ filePath });
  });
});

export default router;

import multer from 'multer';
import config from "../config";
import nanoid from "nanoid";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});


export default upload;
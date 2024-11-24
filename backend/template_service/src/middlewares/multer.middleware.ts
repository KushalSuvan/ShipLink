import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temp');
  },
  filename: function (req, file, cb) {
    const filename = `${req.user?.merchantId}-${req.body.productId}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });
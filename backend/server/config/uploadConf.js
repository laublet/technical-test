import multer from 'multer';

const storage = multer.diskStorage({
  destination: './public/usersAvatars/',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  // fileFilter: function(req, file, cb){
  //   checkFileType(file, cb);
  // }
});

export default upload;

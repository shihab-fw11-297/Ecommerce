const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "uploads");
    },
    filename(req, file, callback) {
      const id = uuidv4();
      const extName = file.originalname.split(".").pop();
      callback(null, `${id}.${extName}`);
    },
  });
  
let singleUpload = multer({ storage }).single("photo");
module.exports = singleUpload
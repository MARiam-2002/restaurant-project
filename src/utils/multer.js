// import multer from 'multer'
// import fs from 'fs'
// import { nanoid } from 'nanoid'
// import path from 'path'
// import { fileURLToPath } from 'url'
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// export const fileValidation = {
//     image: ['image/jpeg', 'image/png', 'image/gif'],
//     file: ['application/pdf', 'application/msword'],
//     video: ['video/mp4']
// }
// export function fileUpload(customPath = 'general', customValidation = []) {

//     const fullPath = path.join(__dirname, `../uploads/${customPath}`)
//     if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath, { recursive: true })
//     }
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, fullPath)
//         },
//         filename: (req, file, cb) => {
//             const uniqueFileName = nanoid() + "_" + file.originalname;
//             file.dest = `uploads/${customPath}/${uniqueFileName}`
//             cb(null, uniqueFileName)
//         }
//     })
//     function fileFilter(req, file, cb) {
//         if (customValidation.includes(file.mimetype)) {
//             cb(null, true)
//         } else {
//             cb('In-valid file format', false)
//         }
//     }

//     const upload = multer({ fileFilter, storage })
//     return upload
// }

import multer, { diskStorage } from "multer";

export const filterObject = {
  image: ["image/png", "image/jpeg"],
  pdf: ["application/pdf"],
  video: ["video/mp4"],
};
export const fileUpload = (filterArray) => {
  const fileFilter = (req, file, cb) => {
    if (!filterArray.includes(file.mimetype)) {
      return cb(new Error("invalid file formate"), false);
    }
    return cb(null, true);
  };

  return multer({ storage: diskStorage({}), fileFilter });
};

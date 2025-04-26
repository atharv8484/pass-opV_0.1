import multer from "multer";

const storage =  multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , "/media/atharv/pendrive/coding-projects/password manager/public/upload")
    },
    filename:function(req , file ,cb){
        cb(null , file.originalname)
    }
})

export const uploadFile =  multer({storage:storage})
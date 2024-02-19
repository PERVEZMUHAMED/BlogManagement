import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import multer, { FileFilterCallback, diskStorage, memoryStorage } from "multer";
import { extname, join } from "path";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, fileName: string) => void

let filePath = join("../../", "uploads");
if (!existsSync(filePath)) {
    mkdirSync(filePath);
}
const fileStorage = diskStorage({
    destination: (req: Request,
        file: Express.Multer.File, cb: DestinationCallback): void => {
        cb(null, filePath);
    },
    filename: (
        req: Request,
        file: Express.Multer.File, cb: FileNameCallback): void => {
        cb(null, Date.now() + extname(file.originalname));
    }
})
const fileFilter = (
    req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(null, false)
    }
}
export const upload = multer({
    storage: fileStorage,
    limits: { fileSize: 1000000 }, fileFilter: fileFilter
});
// const memeStorage = memoryStorage();
// export const uploadMem = multer({storage:memeStorage});

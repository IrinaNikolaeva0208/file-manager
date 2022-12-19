import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createWriteStream, createReadStream, open } from "fs";
import { fail } from "../main/errors.js";

async function compress(path_newPath) {
    try {
        path_newPath = path_newPath.split(" ");
        const filePath = path_newPath[0];
        const fileNewPath = path_newPath[1].toString();
        open(filePath, (err) => {
            if (err || path_newPath[2]) fail(1);
            else {
                const bComress = createBrotliCompress();
                const writable = createWriteStream(fileNewPath);
                const readable = createReadStream(filePath);
                readable.pipe(bComress).pipe(writable);
            }
        });
    } catch (err) {
        fail(err);
    }
}

async function decompress(path_newPath) {
    path_newPath = path_newPath.split(" ");
    const filePath = path_newPath[0];
    const fileNewPath = path_newPath[1].toString();
    open(filePath, (err) => {
        if (err || path_newPath[2]) fail(1);
        else {
            const bComress = createBrotliCompress();
            const writable = createWriteStream(fileNewPath);
            const readable = createReadStream(filePath);
            readable.pipe(bComress).pipe(writable);
        }
    });
}

export { compress, decompress };

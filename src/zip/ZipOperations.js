import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createWriteStream, createReadStream, open } from "fs";
import { fail } from "../main/errors.js";
import { getDir } from "../navigation/navigate.js";
import path from "path";

async function compress(path_newPath) {
    try {
        path_newPath = path_newPath.split(" ");
        let filePath = path_newPath[0];
        if (!path.isAbsolute(filePath))
            filePath = path.resolve(getDir(), filePath);
        let fileNewPath = path_newPath[1].toString();
        if (!path.isAbsolute(fileNewPath))
            fileNewPath = path.resolve(getDir(), fileNewPath);
        open(filePath, (err) => {
            if (err || path_newPath[2]) fail(1);
            else {
                const readable = createReadStream(filePath);
                open(fileNewPath, "w", (err) => {
                    if (err) fail(err);
                    else {
                        const bComress = createBrotliCompress();
                        const writable = createWriteStream(fileNewPath);
                        readable.pipe(bComress).pipe(writable);
                    }
                });
            }
        });
    } catch (err) {
        fail(err);
    }
}

async function decompress(path_newPath) {
    try {
        path_newPath = path_newPath.split(" ");
        let filePath = path_newPath[0];
        if (!path.isAbsolute(filePath))
            filePath = path.resolve(getDir(), filePath);
        let fileNewPath = path_newPath[1].toString();
        if (!path.isAbsolute(fileNewPath))
            fileNewPath = path.resolve(getDir(), fileNewPath);
        open(filePath, (err) => {
            if (err || path_newPath[2]) fail(1);
            else {
                const readable = createReadStream(filePath);
                open(fileNewPath, "w", (err) => {
                    if (err) fail(err);
                    else {
                        const bComress = createBrotliDecompress();
                        const writable = createWriteStream(fileNewPath);
                        readable.pipe(bComress).pipe(writable);
                    }
                });
            }
        });
    } catch (err) {
        fail(err);
    }
}

export { compress, decompress };

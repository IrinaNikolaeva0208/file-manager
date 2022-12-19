import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createWriteStream, createReadStream } from "fs";

function compress(path_newPath) {
    path_newPath = path_newPath.split(" ");
    const filePath = path_newPath[0];
    const fileNewPath = path_newPath[1];
    const bComress = createBrotliCompress();
    const writable = createWriteStream(fileNewPath);
    const readable = createReadStream(filePath);
    readable.pipe(bComress).pipe(writable);
}

function decompress(path_newPath) {
    path_newPath = path_newPath.split(" ");
    const filePath = path_newPath[0];
    const fileNewPath = path_newPath[1];
    const bComress = createBrotliDecompress();
    const writable = createWriteStream(fileNewPath);
    const readable = createReadStream(filePath);
    readable.pipe(bComress).pipe(writable);
}

export { compress, decompress };

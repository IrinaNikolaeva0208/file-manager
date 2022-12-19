import fs from "fs";
import path from "path";
import { getDir } from "../navigation/navigate.js";
import { fail } from "../main/errors.js";

async function cat(path) {
    try {
        const readable = fs.createReadStream(path, { encoding: "utf-8" });
        readable.on("data", (chunk) => console.log(chunk));
    } catch (err) {
        fail(err);
    }
}

async function rn(path_newPath) {
    path_newPath = path_newPath.split(" ");
    const filePath = path_newPath[0];
    const newFileName = path_newPath[1];
    fs.rename(filePath, newFileName, (err) => fail(err));
}

async function rm(path) {
    fs.rm(path, { recursive: true }, (err) => fail(err));
}

async function add(fileName) {
    fs.open(path.join(getDir(), fileName), "w", (err) => fail(err));
}

async function cp(path_newPath) {
    try {
        path_newPath = path_newPath.split(" ");
        const filePath = path_newPath[0];
        const newFilePath = path_newPath[1].toString();
        fs.open(filePath, (err) => {
            if (err) fail(err);
            else {
                const readable = fs.createReadStream(filePath);
                const writable = fs.createWriteStream(newFilePath);
                readable.pipe(writable);
            }
        });
    } catch (err) {
        fail(err);
    }
}

async function mv(path_newPath) {
    cp(path_newPath);
    rm(path_newPath.split(" ")[0]);
}

export { cat, rn, rm, add, cp, mv };

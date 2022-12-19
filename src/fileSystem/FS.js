import fs from "fs";
import path from "path";
import { getDir } from "../navigation/navigate.js";
import { fail } from "../main/errors.js";

async function cat(filePath) {
    if (!path.isAbsolute(filePath)) filePath = path.resolve(getDir(), filePath);
    try {
        const readable = fs.createReadStream(filePath, { encoding: "utf-8" });
        readable.on("data", (chunk) => console.log(chunk));
    } catch (err) {
        fail(err);
    }
}

async function rn(path_newPath) {
    path_newPath = path_newPath.split(" ");
    let filePath = path_newPath[0];
    if (!path.isAbsolute(filePath)) filePath = path.resolve(getDir(), filePath);
    let newFileName = path_newPath[1];
    if (!path.isAbsolute(newFileName))
        newFileName = path.resolve(getDir(), newFileName);
    fs.rename(filePath, newFileName, (err) => fail(err));
}

async function rm(filePath) {
    if (!path.isAbsolute(filePath)) filePath = path.resolve(getDir(), filePath);
    fs.rm(filePath, { recursive: true }, (err) => fail(err));
}

async function add(fileName) {
    if (!path.isAbsolute(fileName)) fileName = path.resolve(getDir(), fileName);
    fs.open(fileName, "w", (err) => fail(err));
}

async function cp(path_newPath) {
    try {
        path_newPath = path_newPath.split(" ");
        let filePath = path_newPath[0];
        if (!path.isAbsolute(filePath))
            filePath = path.resolve(getDir(), filePath);
        let newFilePath = path_newPath[1].toString();
        if (!path.isAbsolute(newFilePath))
            newFilePath = path.resolve(getDir(), newFilePath);
        fs.open(filePath, (err) => {
            if (err) fail(err);
            else {
                const readable = fs.createReadStream(filePath);
                fs.open(newFilePath, "w", (err) => {
                    if (err) fail(err);
                    const writable = fs.createWriteStream(newFilePath);
                    readable.pipe(writable);
                });
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

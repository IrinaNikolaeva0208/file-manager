import fs from "fs";
import path from "path";
import { getDir } from "../navigation/navigate.js";

function cat(path) {
    const readable = fs.createReadStream(path, { encoding: "utf-8" });
    readable.on("data", (chunk) => console.log(chunk));
}

function rn(path_newPath) {
    path_newPath = path_newPath.split(" ");
    const filePath = path_newPath[0];
    const newFileName = path_newPath[1];
    fs.rename(filePath, newFileName, (err) => {
        if (err) console.log("error");
    });
}

function rm(path) {
    console.log(path);
    fs.rm(path, { recursive: true }, (err) => {
        if (err) console.log(err);
    });
}

function add(fileName) {
    fs.open(path.join(getDir(), fileName), "w", (err) => {
        if (err) console.log("error");
    });
}

function cp(path_newPath) {
    //rewrite using streams
    path_newPath = path_newPath.split(" ");
    const dirPath = path_newPath[0];
    const newDirPath = path_newPath[1];
    fs.cp(dirPath, newDirPath, { recursive: true }, (err) => {
        if (err) console.log(err);
    });
}

function mv(path_newPath) {
    cp(path_newPath);
    rm(path_newPath.split(" ")[0]);
}

export { cat, rn, rm, add, cp, mv };

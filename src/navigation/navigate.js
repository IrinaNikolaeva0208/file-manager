import path from "path";
import { homedir } from "os";
import { stat } from "fs/promises";
import { readdir } from "fs";

let currentDirectory = homedir();

function logDir() {
    console.log("You are currently in " + currentDirectory);
}

function getDir() {
    return currentDirectory;
}

function up() {
    if (currentDirectory != homedir()) {
        currentDirectory = path.dirname(currentDirectory);
    }
}

function cd(pathArg) {
    if (path.isAbsolute(pathArg)) currentDirectory = pathArg;
    else currentDirectory = path.join(currentDirectory, pathArg);
}

function ls() {
    readdir(currentDirectory, async (err, files) => {
        if (err) console.log("error");
        else {
            function itemSorting(item1, item2) {
                if (item1.Type == "directory")
                    if (item2.Type == "file") return -1;
                    else return item1.Name.localeCompare(item2.Name);
                else {
                    if (item2.Type == "directory") return 1;
                    else return item1.Name.localeCompare(item2.Name);
                }
            }

            files = files.map(async (file) => {
                let type = await stat(path.join(currentDirectory, file));
                type = type.isDirectory() ? "directory" : "file";
                const obj = {};
                obj.Name = file;
                obj.Type = type;
                return obj;
            });
            Promise.all(files).then((result) =>
                console.table(result.sort(itemSorting))
            );
        }
    });
}

export { logDir, up, cd, ls, getDir };

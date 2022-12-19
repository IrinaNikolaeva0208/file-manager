import path from "path";
import { homedir } from "os";
import { stat } from "fs/promises";
import { readdir, opendir } from "fs";
import { fail, invalid } from "../main/errors.js";

let currentDirectory = homedir();
const root = path.parse(currentDirectory).root;

function logDir() {
    console.log("You are currently in " + currentDirectory);
}

function getDir() {
    return currentDirectory;
}

function up(args) {
    if (args) invalid();
    else if (currentDirectory != root) {
        currentDirectory = path.dirname(currentDirectory);
    }
}

async function cd(pathArg) {
    try {
        if (path.isAbsolute(pathArg)) {
            opendir(pathArg, (err) => {
                if (err) fail(err);
                else currentDirectory = pathArg;
            });
        } else {
            opendir(path.join(currentDirectory, pathArg), (err) => {
                if (err) fail(err);
                else currentDirectory = path.join(currentDirectory, pathArg);
            });
        }
    } catch (err) {
        fail(err);
    }
}

async function ls(args) {
    if (args) invalid();
    else
        try {
            readdir(currentDirectory, async (err, files) => {
                if (err) fail(err);
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
                        let type = await stat(
                            path.join(currentDirectory, file)
                        );
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
        } catch (err) {
            fail(err);
        }
}

export { logDir, up, cd, ls, getDir };

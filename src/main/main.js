import { logDir, up, cd, ls } from "../navigation/navigate.js";
import { os } from "../operatingSystem/OS.js";
import { cat, rn, rm, add, cp, mv } from "../fileSystem/FS.js";
import { hash } from "../hash/calcHash.js";
import { compress, decompress } from "../zip/ZipOperations.js";
import { invalid } from "./errors.js";

const processArg = process.argv[2];
const username = processArg.slice(processArg.indexOf("=") + 1);
console.log(`Welcome to the File Manager, ${username}!`);
logDir();
const readable = process.stdin;

process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
readable.on("data", (chunk) => {
    try {
        const result = chunk.toString().trim();
        if (result.match(".exit")) process.emit("SIGINT");
        let command;
        let args;
        if (result.includes(" ")) {
            command = result.slice(0, result.indexOf(" "));
            args = result.slice(result.indexOf(" ") + 1);
        } else {
            command = result;
            args = "";
        }
        eval(`${command}(args)`);
    } catch (err) {
        invalid();
    } finally {
        setTimeout(logDir, 10);
    }
});

import { spawn } from "child_process";
import { logDir, up, cd, ls } from "../navigation/navigate.js";
import { os } from "../operatingSystem/OS.js";
import { cat, rn, rm, add, cp, mv } from "../fileSystem/FS.js";

const processArg = process.argv[2];
const username = processArg.slice(processArg.indexOf("=") + 1);
console.log(`Welcome to the File Manager, ${username}!\n`);
logDir();
const readable = process.stdin;

process.on("SIGINT", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
readable.on("data", (chunk) => {
    const result = chunk.toString();
    const command = result.slice(0, result.indexOf(" ") || result.length - 1);
    const args = result.slice(result.indexOf(" ") + 1).trim();
    eval(`${command}(args)`);
    //spawn(command, [args]);
    logDir();
    if (result.match(".exit")) process.emit("SIGINT");
});

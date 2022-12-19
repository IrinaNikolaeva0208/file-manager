import { createHash } from "crypto";
import { readFile } from "fs";
import { fail } from "../main/errors.js";
import { getDir } from "../navigation/navigate.js";
import path from "path";

async function hash(filePath) {
    if (!path.isAbsolute(filePath)) filePath = path.resolve(getDir(), filePath);
    console.log(filePath);
    try {
        readFile(filePath, (err, fBuffer) => {
            if (err) fail(err);
            else {
                const hash = createHash("SHA256");
                console.log(hash.update(fBuffer).digest("hex"));
            }
        });
    } catch (err) {
        fail(err);
    }
}

export { hash };

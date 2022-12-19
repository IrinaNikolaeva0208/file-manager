import { createHash } from "crypto";
import { readFile } from "fs";
import { fail } from "../main/errors.js";

async function hash(filePath) {
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

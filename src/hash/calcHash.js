import { createHash } from "crypto";
import { readFile } from "fs";

function hash(filePath) {
    readFile(filePath, (err, fBuffer) => {
        if (err) console.log(err);
        else {
            const hash = createHash("SHA256");
            console.log(hash.update(fBuffer).digest("hex"));
        }
    });
}

export { hash };

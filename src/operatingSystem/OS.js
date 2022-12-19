import OS from "os";
import { invalid } from "../main/errors.js";

function os(args) {
    const flag = args.slice(2);
    switch (flag) {
        case "homedir":
            console.log(OS.homedir());
            break;
        case "EOL":
            console.log(JSON.stringify(OS.EOL));
            break;
        case "cpus":
            console.log(OS.cpus().length + " CPUs");
            OS.cpus().forEach((cpu, ind) =>
                console.log(`${ind + 1}: ${cpu.model}`)
            );
            break;
        case "username":
            console.log(OS.userInfo().username);
            break;
        case "architecture":
            console.log(OS.arch());
            break;
        default:
            invalid();
    }
}

export { os };

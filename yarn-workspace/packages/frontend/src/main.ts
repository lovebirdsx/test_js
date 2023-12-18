import { getName } from "common";
import * as dotenv from 'dotenv';

dotenv.config();

function main() {
    const name = getName();
    console.log(name);
}

main();

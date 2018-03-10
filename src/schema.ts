import * as fs from "fs";
import * as path from "path";

console.log("scheming");
export const schemas = fs.readdirSync(path.join(__dirname, "schema"))
    .filter(f => f.endsWith('.graphql'))
    .map(f => fs.readFileSync(path.join(__dirname, "schema", f)))
    .join('\n');
console.log("schemed:"+schemas);
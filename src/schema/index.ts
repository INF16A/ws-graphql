import * as fs from "fs";
import * as path from "path";

export const schemas = fs.readdirSync(__dirname)
    .map(f => {console.log(f); return f;})
    .filter(f => f.endsWith('.graphql'))
    .map(f => fs.readFileSync(path.join(__dirname, f)))
    .join('\n');

console.log(schemas);
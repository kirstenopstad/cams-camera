// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

function walk(dir, files = []) {
  const dirFiles = fs.readdirSync(dir);
  for (const f of dirFiles) {
    const stat = fs.lstatSync(dir + path.sep + f);
    if (stat.isDirectory()) {
      walk(dir + path.sep + f, files);
    } else {
      let fName = path.dirname(dir + path.sep + f);
      files.push(fName);
    }
  }
  return files;
}

function getPages(dir) {
  let files = walk(dir);
  let result = [];
  files.forEach((f) => {
    let formatF = f
      .replace(/\\/g, "/")
      .replace("./src/pages", "/")
      .replace("//", "/");
    if (!result.includes(formatF) && !formatF.includes("api")) {
      result.push(formatF);
    }
  });
  return result;
}

export default async function handler(req, res) {
  const foundFiles = getPages("./src/pages");
  res.status(200).json({ paths: foundFiles });
}

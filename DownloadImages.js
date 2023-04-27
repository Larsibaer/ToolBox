const axios = require("axios").default;
const fs = require("fs");
const filePath = "./";
const csvFilePath = "./";

/**
@param {string} url
@param {string} filename
/*/

fs.readFile(csvFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const rows = data.split("\n"); // Teilt die Daten in Zeilen auf
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let fileName = row.split("/");
    let fullFileName = filePath + "/" + fileName[fileName.length - 1];
    //console.log(row); // Gibt jede Zeile als Zeichenkette aus
    downloadImage(row, fullFileName);
  }
});

async function downloadImage(url, filePath) {
  // Responsetype is try & error, Arraybuffer works most of the time
  const data = (await axios.get(url, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(filePath, data, { encoding: "binary" });
}

const fs = require("fs");
const path = require("path");

function writeToFile(path, data) {
  fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log(`file created at ${path}`);
  });
}

function downloadFile(fileUrl, fileName) {
  return new Promise((res, rej) => {
    const https = require("https");
  const fs = require("fs");

  const file = fs.createWriteStream(`./videos/${fileName}`);

  https
    .get(fileUrl, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.count("video - ");
        res("video downloaded")
        // console.log(`Downloaded ${fileName}`);
      });
    })
    .on("error", (error) => {
      fs.unlink(fileName, () => {
        console.error(`Error downloading ${fileName}: ${error.message}`);
      });
    });
  })
}

function getFileList() {
  const folderPath = path.join(__dirname, 'videos');
    const files = fs.readdirSync(folderPath)
    return files
}

function mergeVideos(inputFiles) {
  const { exec } = require("child_process");

  // Define the output file name and location
  const outputFile = "./output.mp4";
const filePath = inputFiles.join(
    "|"
  )
  console.log(filePath)
  // Define the FFmpeg command to merge the videos
  const ffmpegCommand = `ffmpeg -i "concat:${filePath}" -codec copy ${outputFile}`;

  // Execute the FFmpeg command
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`FFmpeg error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`FFmpeg stderr: ${stderr}`);
      return;
    }
    console.log(`Videos merged successfully into ${outputFile}`);
  });
}

module.exports = {
  writeToFile,
  downloadFile,
  mergeVideos,
  getFileList
};

const { mergeVideos, getFileList } = require('./utils')
const path = require('path')

console.log("********merging videos**********");
let files = getFileList();
files = files.map(item=> path.join(__dirname, `/videos/${item}`))
console.log(files)
mergeVideos(files);
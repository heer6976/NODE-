const fs = require("fs")
const path = require("path")

function deleteImage(imageName) {
    if (imageName) {
        const imagePath = path.join(__dirname, "..", "..", "public", "upload", imageName)
        fs.unlinkSync(imagePath)
    }
}
 
module.exports = { deleteImage}
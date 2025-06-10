const fs = require("fs");
const path = require("path");

const musicDir = path.join(__dirname, "public", "music");
const coversDir = "covers"; // non serve, cover è nella cartella dell'album

function getAlbums() {
  const albums = [];
  const albumFolders = fs.readdirSync(musicDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  albumFolders.forEach(albumName => {
    const albumPath = path.join(musicDir, albumName);
    const files = fs.readdirSync(albumPath);
    const coverFile = files.find(f => /^cover\.(jpg|jpeg|png)$/i.test(f));
    const coverUrl = coverFile
      ? `/music/${albumName}/${coverFile}`
      : ""; // puoi mettere una cover di default qui

    const tracks = files
      .filter(f => f.endsWith(".mp3"))
      .map(f => ({
        name: path.parse(f).name,
        url: `/music/${albumName}/${f}`,
        cover: coverUrl
      }));

    const videoFile = files.find(f => /^video\.(mp4|webm)$/i.test(f));
    const videoUrl = videoFile ? `/music/${albumName}/${videoFile}` : "";

    if (tracks.length > 0) {
      albums.push({
        name: albumName,
        cover: coverUrl,
        video: videoUrl,
        tracks
      });
    }
  });

  return albums;
}

const albums = getAlbums();

console.log("// Incolla questo array in MusicPreviewApp.js");
console.log("const albums = ", JSON.stringify(albums, null, 2), ";");
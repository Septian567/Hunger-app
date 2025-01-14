/* eslint-disable no-console */
/* eslint-disable no-undef */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Folder sumber dan tujuan
const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

// Buat folder tujuan jika belum ada
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Fungsi untuk memeriksa apakah file adalah gambar
const isImage = (fileName) => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff'];
  return validExtensions.includes(path.extname(fileName).toLowerCase());
};

// Proses setiap file di folder target
fs.readdirSync(target).forEach((file) => {
  const sourcePath = path.join(target, file);

  // Lewati jika bukan file gambar
  if (!isImage(file)) {
    console.log(`Skipping non-image file: ${file}`);
    return;
  }

  // Buat gambar ukuran kecil (600px)
  sharp(sourcePath)
    .resize(600)
    .toFile(
      path.resolve(
        destination,
        `${path.parse(file).name}-small${path.extname(file)}`
      )
    )
    .then(() => console.log(`Processed small version of: ${file}`))
    .catch((err) => console.error(`Error processing small version of ${file}:`, err));

  // Buat gambar ukuran sedang (1200px)
  sharp(sourcePath)
    .resize(1200)
    .toFile(
      path.resolve(
        destination,
        `${path.parse(file).name}-medium${path.extname(file)}`
      )
    )
    .then(() => console.log(`Processed medium version of: ${file}`))
    .catch((err) => console.error(`Error processing medium version of ${file}:`, err));

  // Buat gambar ukuran besar (1920px)
  sharp(sourcePath)
    .resize(1920)
    .toFile(
      path.resolve(
        destination,
        `${path.parse(file).name}-large${path.extname(file)}`
      )
    )
    .then(() => console.log(`Processed large version of: ${file}`))
    .catch((err) => console.error(`Error processing large version of ${file}:`, err));
});

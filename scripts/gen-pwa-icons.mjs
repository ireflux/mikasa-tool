import sharp from 'sharp'

const sizes = [192, 512]
const src = 'src/assets/logo.svg'

for (const size of sizes) {
  await sharp(src).resize(size, size).png().toFile(`public/pwa-${size}x${size}.png`)
  console.log(`generated public/pwa-${size}x${size}.png`)
}

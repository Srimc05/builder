/**
 * Converts every JPG/PNG in assets/photos into responsive WebP variants in
 * public/images and writes a manifest (dimensions + blur placeholder) to
 * src/generated/images.json. Run with `npm run images` after adding photos.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'assets/photos')
const outDir = path.join(root, 'public/images')
const manifestPath = path.join(root, 'src/generated/images.json')
export const WIDTHS = [640, 1280, 1920]

await fs.mkdir(outDir, { recursive: true })
const files = (await fs.readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f))
const manifest = {}

for (const file of files) {
  const name = file.replace(/\.(jpe?g|png)$/i, '')
  const input = sharp(path.join(srcDir, file)).rotate()
  const { width, height } = await input.metadata()
  for (const w of WIDTHS) {
    const target = path.join(outDir, `${name}-${w}.webp`)
    await input
      .clone()
      .resize({ width: Math.min(w, width) })
      .webp({ quality: w > 1000 ? 74 : 78, effort: 5 })
      .toFile(target)
  }
  const blur = await input.clone().resize(24).webp({ quality: 40 }).toBuffer()
  manifest[name] = {
    width,
    height,
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
  }
  console.log(`✓ ${name}`)
}

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\n${files.length} images → public/images, manifest → src/generated/images.json`)

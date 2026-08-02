import { render, routePaths } from '../dist/entry-server.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read the built index.html as template
const templatePath = path.resolve(__dirname, '..', 'dist', 'index.html')
const template = fs.readFileSync(templatePath, 'utf-8')

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildPage(renderedHtml, { title, keywords, description }, routePath) {
  let output = template

  // 按页生成 canonical/og:url（以模板中已解析的根地址为前缀）
  const canonicalMatch = output.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)
  const canonicalBase = canonicalMatch ? canonicalMatch[1].replace(/\/?$/, '/') : '/'
  const cleanRoute = routePath.replace(/^\/+/, '').replace(/\/+$/, '')
  const pageUrl = canonicalBase + cleanRoute

  output = output.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"/,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}"`
  )
  output = output.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}"`
  )

  // Replace empty title tag
  output = output.replace(
    /<title><\/title>/,
    `<title>${escapeHtml(title)}</title>`
  )

  // Replace empty meta keywords
  output = output.replace(
    /<meta\s+name="keywords"\s+content="">/,
    `<meta name="keywords" content="${escapeHtml(keywords)}">`
  )

  // Replace empty meta description
  output = output.replace(
    /<meta\s+name="description"\s+content="">/,
    `<meta name="description" content="${escapeHtml(description)}">`
  )

  // Replace empty OG tags
  output = output.replace(
    /<meta\s+property="og:title"\s+content="">/,
    `<meta property="og:title" content="${escapeHtml(title)}">`
  )
  output = output.replace(
    /<meta\s+property="og:description"\s+content="">/,
    `<meta property="og:description" content="${escapeHtml(description)}">`
  )

  // Inject rendered app HTML into #app container
  output = output.replace(
    /<div\s+id="app"><\/div>/,
    `<div id="app">${renderedHtml}</div>`
  )

  return output
}

function getOutputPath(route) {
  if (route === '/') {
    return path.resolve(__dirname, '..', 'dist', 'index.html')
  }
  // Strip leading/trailing slashes so path.resolve treats it as relative
  const cleanRoute = route.replace(/^\/+/, '').replace(/\/+$/, '')
  return path.resolve(__dirname, '..', 'dist', cleanRoute, 'index.html')
}

async function main() {
  console.log(`Prerendering ${routePaths.length} routes...`)

  let successCount = 0
  let partialCount = 0
  let failCount = 0

  for (const routePath of routePaths) {
    try {
      const { html, title, keywords, description } = await render(routePath)
      const output = buildPage(html, { title, keywords, description }, routePath)

      const outputPath = getOutputPath(routePath)
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.writeFileSync(outputPath, output)
      if (html) {
        successCount++
        console.log(`  done: ${routePath}`)
      } else {
        partialCount++
        console.log(`  partial (meta only): ${routePath}`)
      }
    } catch (error) {
      failCount++
      console.error(`  fail: ${routePath} - ${error.message}`)
    }
  }

  console.log(`Prerendering complete. ${successCount} rendered, ${partialCount} meta-only, ${failCount} failed.`)
}

main()

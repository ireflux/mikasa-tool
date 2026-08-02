# Mikasa Tool

A client-side online toolbox that runs entirely in the browser — no backend required. Built with Vue 3, Vite, and TypeScript, with support for static site generation (SSG) via prerendering.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Vue 3 | Frontend framework |
| Vite | Build tool and dev server |
| TypeScript | Type safety |
| Element Plus | UI component library |
| Pinia | State management |
| Vue Router | Client-side routing |
| Tailwind CSS | Utility-first CSS |
| ECharts | Charts and visualizations |

## Features

Mikasa Tool includes **66** utilities across **7** categories:

- **DevOps**: password generator, URL encode/decode, UUID generator, timestamp converter, MD5, JSON formatter, regex tester, Unicode converter, HTTP status codes, JWT parser, HTML entity escape, JS/HTML/CSS formatter, Base64, base converter, storage unit converter, hash calculator, XML/SQL formatter, AES/RSA encryption, cron expression, image compression/format conversion
- **Text**: diff, Markdown editor, word count, duplicate removal, ASCII art, rich text editor, text replace, text workflow, word frequency
- **Education & Science**: unit converter, Morse code, number system conversion, ASCII table
- **Image**: QR code generator, image editor, text-to-image, image splitter, color picker, watermark
- **Charts**: bar, line, pie, scatter, word cloud
- **Random & Decision**: Chinese number converter, danmaku, color palette, color picker, pomodoro, reaction test, m3u8 player, rock-paper-scissors, emoji picker, calculator, date calculator, BMI/mortgage calculator
- **Miscellaneous**: random number, decision helper, coin flip, dice, lottery, spinner

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Build for production (with SSG prerendering)
pnpm build

# Lint and format
pnpm lint
pnpm format
```

## Acknowledgments

This project is based on [tools-web](https://github.com/naroat/tools-web)

## License

[MIT](./LICENSE)

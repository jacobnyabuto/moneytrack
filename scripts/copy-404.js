import { copyFileSync } from 'node:fs'

// GitHub Pages shows 404.html for unknown URLs.
// Copying index.html lets React Router handle them.
copyFileSync('dist/index.html', 'dist/404.html')
console.log('Created dist/404.html')
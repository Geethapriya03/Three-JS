// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        first: path.resolve(__dirname, 'src/03-first-threejs-application/index.html'),
        transform: path.resolve(__dirname, 'src/04-transform-objects/index.html'),
        animations: path.resolve(__dirname, 'src/05-animations/index.html'),
        cameras: path.resolve(__dirname, 'src/06-cameras/index.html'),
        fullscreen: path.resolve(__dirname, 'src/07-fullscreen-and-resizing/index.html'),
        geometries: path.resolve(__dirname, 'src/08-geometries/index.html'),
        debug: path.resolve(__dirname, 'src/09-debug-ui/index.html'),
        textures: path.resolve(__dirname, 'src/10-textures/index.html'),
        materials: path.resolve(__dirname, 'src/11-materials/index.html'),
        text3d: path.resolve(__dirname, 'src/12-3d-text/index.html')
      }
    }
  },
  publicDir: '../public'
})

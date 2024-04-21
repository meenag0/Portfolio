import { defineConfig } from 'vite';

export default defineConfig({
  root: 'Portfolio', // Replace 'your-root-directory' with the directory containing your project
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      input: {
        // Change this to point to your entry JavaScript file
        main: 'script.js'
      }
    }
  }// Replace 'your-base-url' with the base URL of your project
});
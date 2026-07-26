/** 
 * @type {import('vite').UserConfig}
*/
import { defineConfig } from 'vite'

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/Hub' : '',
    build: {
        outDir: 'dist',
        publicDir: 'art'
    },
    
}) 
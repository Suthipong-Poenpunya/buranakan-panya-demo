import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    base: 'https://github.com/Suthipong-Poenpunya/buranakan-panya-demo',
    server: {
        port: 3000, // กำหนด Port ที่ต้องการรัน (เช่น localhost:3000)
    },
})
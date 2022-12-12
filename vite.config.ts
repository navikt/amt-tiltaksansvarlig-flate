import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		outDir: 'build'
	},
	server: {
		port: 3002,
		open: true
	},
	base: process.env.BASE,
	plugins: [react()],
})

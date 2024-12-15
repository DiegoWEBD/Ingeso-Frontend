import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'service-worker.ts',

			injectManifest: {
				swSrc: 'src/service-worker.ts',
				swDest: 'dist/service-worker.js',
			},
			manifest: {
				name: 'Guía Farmacología',
				short_name: 'Farmacología',
				start_url: '/',
				display: 'standalone',
				description:
					'Guía de consulta rápida sobre cuidados de Enfermería en la administración de fármacos.',
				theme_color: '#ffffff',
				icons: [
					{
						purpose: 'maskable',
						sizes: '192x192',
						src: 'maskable_icon_x192.png',
						type: 'image/png',
					},
					{
						purpose: 'maskable',
						sizes: '512x512',
						src: 'maskable_icon_x512.png',
						type: 'image/png',
					},
				],
			},
		}),
	],
})

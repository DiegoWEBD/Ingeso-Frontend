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
						purpose: 'any maskable',
						src: '-48x48.png',
						sizes: '48x48',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-72x72.png',
						sizes: '72x72',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-96x96.png',
						sizes: '96x96',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-128x128.png',
						sizes: '128x128',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-144x144.png',
						sizes: '144x144',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-152x152.png',
						sizes: '152x152',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-384x384.png',
						sizes: '384x384',
						type: 'image/png',
					},
					{
						purpose: 'any maskable',
						src: '-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
})

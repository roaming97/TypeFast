import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const mode = process.env.NODE_ENV
const dev = mode === 'development'

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined
			}
		}
	},
	mode: process.env.MODE || 'production',
	css: {
		postcss: {
			plugins: [
				autoprefixer(),
				...(!dev
					? [
							cssnano({
								preset: ['default', { discardComments: { removeAll: true } }]
							})
					  ]
					: [])
			]
		}
	},
	plugins: [sveltekit()],
	server: {
		port: 3000,
		fs: {
			allow: ['..']
		},
		hmr: {
			overlay: false
		}
	}
})

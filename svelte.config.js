import preprocess from 'svelte-preprocess'
import auto from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
export default {
	extensions: ['.svelte'],
	preprocess: [preprocess()],
	kit: {
		adapter: auto()
	}
}

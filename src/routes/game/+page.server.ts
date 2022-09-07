import type { PageServerLoad } from './$types'
import { texts } from '$lib/data'

export const load: PageServerLoad = () => {
	const text = texts[Math.floor(Math.random() * texts.length)]
	return { text }
}

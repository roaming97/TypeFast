import { page } from '$app/stores'
import { get } from 'svelte/store'
import capitalized from './capitalized'

/**
 * Parses the url pathname and returns just the capitalized page title.
 * @param path - The current url pathname.
 * @example ```svelte
 * <svelte:head>
 *   <title> {pageTitle($page.url.pathname)} <title>
 * </svelte:head>
 * ```
 */
export default (path: string) => {
	const appName = 'TypeFast'
	if (path === '/') return appName
	if (get(page).error) return `${get(page).status}`
	const title = path.split('/')[1]
	return capitalized(title) + ` - ${appName}`
}

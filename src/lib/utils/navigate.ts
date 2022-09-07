import { pageOpacity, navigating } from '$lib/stores'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { get } from 'svelte/store'

export default (path: string) => {
	if (get(page).url.pathname == path || get(navigating)) return
	navigating.set(true)

	pageOpacity.set(0)

	setTimeout(() => {
		goto(path)

		setTimeout(() => {
			pageOpacity.set(1)
			navigating.set(false)
		}, 1)
	}, 300)
}

<script lang="ts">
	import { charsWritten, pageOpacity } from '$lib/stores'
	import { pageTitle } from '$lib/utils'
	import { page } from '$app/stores'
	import { Fractils, initTheme, mobileThreshold } from 'fractils'
	import { Header } from '$lib/components'
	import { onMount } from 'svelte'
	import 'greset'
	import '../../styles/app.scss'

	$: title = pageTitle($page.url.pathname)
	$mobileThreshold = 1024

	onMount(() => initTheme())
</script>

<template lang="pug">
	svelte:head
		title {title}

	+if('!$page.error')
		Header

	.slot(style='opacity: {$pageOpacity}')
		slot

	Fractils

	svelte:window(on:keydown|preventdefault!='{() => $charsWritten++}')
</template>

<style lang="scss">
	@use '../../styles/media' as *;
	.slot {
		padding: 1rem;
		margin: 1rem 0;

		transition: opacity 250ms;
	}
	@include media('>desktop') {
		.slot {
			padding: 2rem;
		}
	}
</style>

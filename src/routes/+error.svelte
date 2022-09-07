<script lang="ts">
	import { dev } from '$app/environment'
	import { page } from '$app/stores'

	if (dev) console.error($page.error.stack)
</script>

<template lang="pug">
	h1.title {$page.status}
	pre.msg {$page.error.message}

	+if('dev && $page.error.stack')
		.error
			pre {$page.error.stack}
</template>

<style lang="scss">
	@use '../../styles/media' as *;
	::selection {
		background-color: rgb(145, 15, 26) !important;
	}
	h1 {
		margin: 1rem 0;

		font-weight: 100;
		font-size: 40vw;

		color: var(--warn);
		text-shadow: 60px 0 80px #f05, -60px 0 80px #f20;
	}
	pre {
		color: var(--dark-c);
		opacity: 0.75;

		margin: 0 auto;

		font-size: 0.8rem;

		white-space: pre-wrap;
		&.msg {
			color: var(--dark-a);
			font-size: 1rem;
		}
	}
	@include media('>desktop') {
		h1 {
			font-size: 20vw;
		}
		.error {
			margin: 0 auto;
		}
		pre,
		.error {
			width: 60vw;
		}
	}
</style>

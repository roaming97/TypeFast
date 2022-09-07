<script lang="ts">
	import { navigate } from '$lib/utils'
	export let label: string
	export let path: string
</script>

<template lang="pug">
    button(on:click|preventDefault!='{navigate(path)}') {label}
</template>

<style lang="scss">
	button {
		outline: none;
		border: none;

		font-family: var(--font-primary);
		text-transform: uppercase;

		border-radius: 2rem;

		box-shadow: 0px 0.5px 1.6px rgba(0, 0, 0, 0.016), 0px 1.1px 5.4px rgba(0, 0, 0, 0.025),
			0px 1.9px 10.5px rgba(0, 0, 0, 0.031), 0px 3px 16.1px rgba(0, 0, 0, 0.037),
			0px 4.6px 21.7px rgba(0, 0, 0, 0.044), 0px 7.2px 27px rgba(0, 0, 0, 0.053),
			0px 12px 31.8px rgba(0, 0, 0, 0.069), 0px 24px 36px rgba(0, 0, 0, 0.11);

		padding: 1rem 2rem;
		margin: 1rem;

		background-color: var(--brand-b);

		transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
		&:hover {
			transform: scale(1.05);
		}
	}
</style>

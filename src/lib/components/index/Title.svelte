<script lang="ts">
	import { indexText } from '$lib/stores'
	import { mobile } from 'fractils'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

	$: on = false
	$: bg_color = 'transparent'
	$: display = $mobile ? 'none' : 'block'

	onMount(() => {
		setInterval(() => {
			on = !on
			bg_color = on ? 'var(--brand-a)' : 'transparent'
		}, 500)
	})
</script>

<template lang="pug">
    .title-container
        .text(in:fly!='{{x: -30, duration: 1000, easing: quintOut}}') 
            h1 TypeFast
            .beam(style='background-color: {bg_color}; display: {display}')
        input(type="text" bind:value!='{$indexText}' maxlength="100" in:fly!=`{{x: -30, duration: 1000, delay: 200, easing: quintOut}}`)
</template>

<style lang="scss">
	@use '../../../../styles/media' as *;

	.title-container {
		flex-direction: column;
		justify-content: center;
		display: flex;
		.text {
			display: flex;
			h1 {
				color: var(--brand-a);

				padding: 0.5rem;

				letter-spacing: -0.25rem;
				text-align: left;
				font-weight: 800;
				font-size: 16vw;
			}

			.beam {
				margin: 0 1rem;
				height: 12rem;
				width: 1rem;
			}
		}
		input {
			padding: 1rem;
			border: none;

			width: 100%;

			font-family: var(--font-primary);
			font-size: 1em;
			font-weight: 300;
			line-height: 1.5;

			color: var(--brand-b, --text-color);
			background: transparent;
		}
	}

	@include media('>desktop') {
		.title-container {
			.text {
				h1 {
					padding: 0.5rem 0;
					font-size: 12rem;
				}
			}
			input {
				font-size: 1.2em;
			}
		}
	}
</style>

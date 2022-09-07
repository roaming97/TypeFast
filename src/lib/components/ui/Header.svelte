<script lang="ts">
	import { ThemeToggle } from 'fractils'
</script>

<template lang="pug">
	header
		ThemeToggle
</template>

<style lang="scss">
	header {
		flex-direction: row-reverse;
		align-items: center;
		display: flex;

		padding: 1rem;
		height: 3rem;
		width: 100vw;

		background-color: var(--light-b);
	}
</style>

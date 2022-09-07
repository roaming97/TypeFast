<script lang="ts">
	export let name: string
	export let value: string | number
	export let color: string = 'var(--dark-a)'
</script>

<template lang="pug">
    .stat
        p {name}
        h2(style='color: {color}') {value}
</template>

<style lang="scss">
	.stat {
		flex-direction: column;
		align-items: center;
		display: flex;

		margin: 1rem;
	}

	h2 {
		font-size: 4rem;
		font-weight: 200;

		transition: color 300ms;
	}
</style>

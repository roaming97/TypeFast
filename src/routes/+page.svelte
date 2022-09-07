<script lang="ts">
	import { Title, Button } from '$lib/components'
	import { charsWritten } from '$lib/stores'
</script>

<template lang="pug">
    Title
    Button(label="Start" path="/game")
</template>

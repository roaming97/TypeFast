<script lang="ts">
	import type { PageServerData } from './$types'
	import { gameNumber } from '$lib/stores'
	import { Stat } from '$lib/components'
	import { excludedKeys, charThreshold, gradeColors } from '$lib/data'
	import { onMount } from 'svelte'
	export let data: PageServerData

	$: text = data.text
	$: typos = 0
	$: pos = 0
	$: time = 0
	$: mask = 'linear-gradient(to bottom, white 50%, transparent)'

	let charsThisSecond: string[] = []
	let grossEntries: number[] = []
	let netEntries: number[] = []
	$: grossCPM = 0
	$: netCPM = 0

	$: percent = parseInt(((pos / text.length) * 100).toFixed())
	$: grade = ((text.length - typos) / text.length) * 100
	$: gradeColor = gradeColors[0]

	$: chars = [] as number[]
	let gameNumberOpacity = 0
	let scroll = 0
	let tx = 0
	let timeInterval: NodeJS.Timer
	let ref: HTMLInputElement

	const changeGradeColor = () =>
		(gradeColor = grade > 80 ? gradeColors[0] : grade > 50 ? gradeColors[1] : gradeColors[2])

	const calculateCPM = (entries: number[]) => {
		return (
			(entries.reduce((a, b) => {
				return a + b
			}, 0) /
				entries.length) *
			60
		)
	}

	const handleKey = (e: KeyboardEvent) => {
		const k = e.key
		ref.value = ''
		scroll = Math.floor(pos / charThreshold)
		if (excludedKeys.includes(k)) return
		if (pos <= 0)
			timeInterval = setInterval(() => {
				time++
				//Calculate CPS
				grossEntries.push(charsThisSecond.length)
				netEntries.push(
					charsThisSecond.filter((c) => {
						return c.split('-')[1] !== 'wrong'
					}).length
				)
				grossCPM = calculateCPM(grossEntries)
				netCPM = calculateCPM(netEntries)
				charsThisSecond = []
			}, 1000)
		if (pos < text.length) {
			let ctp = k
			if (k !== text.charAt(pos)) {
				chars.push(0)
				tx = Math.random() > 0.5 ? -1 : 1
				setTimeout(() => (tx = 0), 100)
				typos++
				ctp += '-wrong'
				changeGradeColor()
			} else chars.push(1)
			pos++
			charsThisSecond.push(ctp)
			if (pos >= charThreshold)
				mask = 'linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)'
			if (pos >= text.length) clearInterval(timeInterval)
		}
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	const confirmation = (e: BeforeUnloadEvent) => {
		return true
	}

	onMount(() => {
		ref.focus()
		$gameNumber++
		gameNumberOpacity = 1
	})
</script>

<template lang="pug">
	.text-container(style="mask-image: {mask}; -webkit-mask-image: {mask}")
		p(style="translate: {tx}rem -{scroll * 1.5}em;")
			+each('text.slice(0, pos) as c, i')
				+if('chars[i] === 1')
					span.correct {c}
					+else()
					+if('c === " "')
						span(style="background-color: var(--warn)") {c}
						+else()
						span(style="color: var(--warn)") {c}
			+if('text.split("")[pos]')
				span.current-char {text.split("")[pos]}
			span {text.slice(pos + 1)}
		input(bind:this!='{ref}' value="" style="translate: {tx}rem -{scroll}em;" on:keydown|preventDefault!="{handleKey}")
	.stats
		Stat(name="Typed" value!="{percent}%")
		Stat(name="Time" value!="{formatTime(time)}")
		Stat(name="Grade" value!="{grade.toFixed(1) + '%'}" color!=`{gradeColor}`)
		Stat(name="Gross" value!="{(grossCPM.toFixed())}cpm")
		Stat(name="Net" value!="{(netCPM.toFixed())}cpm")

	h3(style="opacity: {gameNumberOpacity}") Game #
		|{$gameNumber}

	svelte:window(on:beforeunload!="{confirmation}")
</template>

<style lang="scss">
	@use '../../../styles/media' as *;

	.text-container {
		justify-content: center;
		display: flex;

		position: relative;

		height: 50vh;

		overflow-y: clip;

		p {
			position: absolute;

			font-weight: 600;
			line-height: 1.25em;
			font-size: 2.5rem;

			word-wrap: break-word;

			color: var(--dark-a);

			user-select: none;

			transition: translate 1000ms cubic-bezier(0.22, 1, 0.36, 1);
		}

		input {
			height: 100%;
			width: 100%;
			opacity: 0;
		}
	}

	h3 {
		color: var(--dark-d);
		text-align: center;
		font-size: 1em;

		transition: opacity 500ms;
	}

	.correct {
		color: var(--correct);
	}

	.current-char {
		background-color: rgb(129 202 236);
		//background-color: var(--light-d);
	}

	.stats {
		grid-template-columns: repeat(3, 1fr);
		justify-content: space-evenly;
		align-items: center;
		display: grid;
	}

	@include media('>desktop') {
		.text-container,
		.stats {
			margin: 0 auto;
			width: 50vw;
		}

		.stats {
			flex-direction: row;
		}
	}
</style>

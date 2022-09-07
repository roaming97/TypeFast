import { localStorageStore } from 'fractils'
import { writable } from 'svelte/store'

export const pageOpacity = writable(1)
export const navigating = writable(false)
export const charsWritten = localStorageStore('chars', 0)
export const indexText = localStorageStore('index-text', 'Typing game with a twist.')
export const gameNumber = localStorageStore('games-played', 0)

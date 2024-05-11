import { writable } from 'svelte/store';

export const quizPool = writable(new Set<string>());

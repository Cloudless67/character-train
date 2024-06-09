import { gatakanas } from '$lib/gatakanas';
import { hiraganas } from '$lib/hiraganas';
import { writable } from 'svelte/store';

export const quizPool = writable(new Set<string>());

export const answerSheet = writable<Record<string, string>>(Object.assign(hiraganas, gatakanas));

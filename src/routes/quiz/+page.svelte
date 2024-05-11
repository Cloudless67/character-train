<script lang="ts">
	import { onMount } from 'svelte';
	import { hiraganas } from '$lib/hiraganas';
	import { randomizeArray } from '$lib/utils/randomizeArray';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let quiz = '' as keyof typeof hiraganas;
	let quizPool = [] as (keyof typeof hiraganas)[];
	let quizIndex = 0;
	let finished = false;

	onMount(async () => {
		const query = $page.url.searchParams.get('pool')?.split(',') ?? [];
		quizPool = randomizeArray(query) as (keyof typeof hiraganas)[];
		quiz = quizPool[0];
	});

	const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const target = e.target as HTMLInputElement;
		if (hiraganas[quiz] !== target.value) return;

		quizIndex++;
		quiz = quizPool[quizIndex] ?? '';
		target.value = '';

		if (quizIndex === quizPool.length) {
			alert('Quiz finished!');
			goto('/');
		}
	};
</script>

<main class="d-flex flex-column justify-content-center align-items-center">
	<div class="quiz">{quiz}</div>
	<div>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class="form-control"
			type="text"
			name="answer"
			id="answer"
			autofocus
			on:input={handleInput}
		/>
	</div>
</main>

<style>
	.quiz {
		font-size: 5rem;
	}
</style>

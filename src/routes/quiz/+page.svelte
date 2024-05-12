<script lang="ts">
	import { onMount } from 'svelte';
	import { randomizeArray } from '$lib/utils/randomizeArray';
	import { answerSheet } from '../../store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let quiz = '';
	let value = '';
	let quizPool = [] as string[];
	let quizIndex = 0;
	let input: HTMLInputElement;
	let hidden: HTMLInputElement;

	onMount(async () => {
		const query = $page.url.searchParams.get('pool')?.split(',') ?? [];
		quizPool = randomizeArray(query);
		quiz = quizPool[0];
	});

	const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const target = e.target as HTMLInputElement;
		if ($answerSheet[quiz] !== target.value) return;

		quizIndex++;
		quiz = quizPool[quizIndex] ?? '';
		value = '';
		// if iOS, blur the input to hide the keyboard
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
			input.blur();
			hidden.focus();
			setTimeout(() => {
				input.focus();
			}, 200);
		}

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
			bind:this={input}
			class="form-control"
			type="text"
			name="answer"
			id="answer"
			autofocus
			bind:value
			on:input={handleInput}
		/>
		<input bind:this={hidden} type="hidden" name="hidden" />
	</div>
</main>

<style>
	.quiz {
		font-size: 5rem;
	}
</style>

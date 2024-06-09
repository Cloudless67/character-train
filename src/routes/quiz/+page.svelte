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
	let correct = false;
	let exposeAnswer = false;

	onMount(async () => {
		const query = $page.url.searchParams.get('pool')?.split(',') ?? [];
		quizPool = randomizeArray(query);
		quiz = quizPool[0];
	});

	$: {
		if (!correct) {
			input?.focus();
			input?.setAttribute('autofocus', 'true');
		}
	}

	const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const target = e.target as HTMLInputElement;
		if (!target.value) return;
		if (!$answerSheet[quiz].includes(target.value)) return;

		correct = true;
		value = '';

		if (quizIndex + 1 === quizPool.length) {
			alert('Quiz finished!');
			goto('/');
			return;
		}

		setTimeout(() => {
			quizIndex++;
			quiz = quizPool[quizIndex];
			correct = false;
		}, 300);
	};

	function showAnswer() {
		exposeAnswer = true;
		setTimeout(() => {
			exposeAnswer = false;
		}, 700);
	}
</script>

<main class="d-flex flex-column justify-content-center align-items-center">
	<div class="quiz">{quiz}</div>
	<div class="answer" class:expose={exposeAnswer}>{$answerSheet[quiz]}</div>
	{#if correct}
		<img src="/check.svg" alt="correct" />
	{:else}
		<div>
			<form class="d-flex">
				<!-- svelte-ignore a11y-autofocus -->
				<input
					bind:this={input}
					class="form-control"
					type="text"
					name="answer"
					id={quiz}
					autofocus
					bind:value
					on:input={handleInput}
				/>
				<button class="btn" on:click={showAnswer}>정답</button>
			</form>
		</div>
	{/if}
</main>

<style>
	.quiz {
		font-size: 5rem;
	}

	.answer {
		opacity: 0;
		transition: opacity 0.5s ease-out;
	}

	.expose {
		opacity: 1;
	}

	.btn {
		margin-left: 1rem;
		width: 5rem;
	}
</style>

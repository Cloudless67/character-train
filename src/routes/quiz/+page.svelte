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
		if (!target.value) return;
		if (!$answerSheet[quiz].includes(target.value)) return;

		quizIndex++;
		quiz = quizPool[quizIndex] ?? '';
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
			console.log('iOS detected');

			const newInput = document.createElement('input');
			newInput.type = 'text';
			document.body.appendChild(newInput);
			newInput.focus();
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
		<form>
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
		</form>
	</div>
</main>

<style>
	.quiz {
		font-size: 5rem;
	}
</style>

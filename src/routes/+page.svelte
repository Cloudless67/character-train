<script lang="ts">
	import GanaList from '$lib/components/GanaList.svelte';
	import { gatakanas, gatakanasGroup } from '$lib/gatakanas';
	import { hiraganas, hiraganasGroup } from '$lib/hiraganas';
	import { answerSheet, quizPool } from '../store';

	function setAnswerSheet() {
		if ($quizPool.size) {
			$answerSheet = Object.assign(hiraganas, gatakanas);
		}
	}
</script>

<main class="d-flex flex-column justify-content-center align-items-center px-4">
	<h1>히라가나</h1>
	<GanaList group={hiraganasGroup} />
	<h1>가타카나</h1>
	<GanaList group={gatakanasGroup} />
	<a
		class="test-button"
		class:disabled={!$quizPool.size}
		href={`/quiz?pool=${[...$quizPool.values()].join(',')}`}
		on:click={setAnswerSheet}>테스트</a
	>
</main>

<style lang="scss">
	.test-button {
		position: fixed;
		bottom: 0.5rem;
		right: 0.5rem;
		padding: 1rem;
		background-color: #007bff;
		color: white;
		text-decoration: none;
		border-radius: 0.5rem;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}

		&.disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}
</style>

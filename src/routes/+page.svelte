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

<svelte:head>
	<title>히라가나와 가타카나</title>
	<meta name="description" content="히라가나와 가타카나를 학습하고 테스트해보세요." />
	<meta name="keywords" content="히라가나, 가타카나, 일본어, 일본어 학습" />
	<meta property="og:title" content="히라가나와 가타카나" />
	<meta property="og:description" content="히라가나와 가타카나를 학습하고 테스트해보세요." />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:url" content="https://character-train.cloudless.blog" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="히라가나와 가타카나" />
	<meta property="og:locale" content="ko_KR" />
</svelte:head>
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

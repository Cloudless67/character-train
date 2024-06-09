<script lang="ts">
	import GanaList from '$lib/components/GanaList.svelte';
	import { gatakanas, gatakanasGroup } from '$lib/gatakanas';
	import { hiraganas, hiraganasGroup } from '$lib/hiraganas';
	import { answerSheet, quizPool } from '../store';

	function setAnswerSheet() {
		$answerSheet = Object.assign(hiraganas, gatakanas);
	}
</script>

<main class="d-flex flex-column justify-content-center align-items-center px-4">
	<h1>선택</h1>
	<GanaList group={hiraganasGroup} />
	<GanaList group={gatakanasGroup} />
	<a href={`/quiz?pool=${[...$quizPool.values()].join(',')}`} on:click={setAnswerSheet}>테스트</a>
</main>

<style>
</style>

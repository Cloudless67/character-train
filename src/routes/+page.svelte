<script lang="ts">
	import GanaList from '$lib/components/GanaList.svelte';
	import { gatakanas, gatakanasGroup } from '$lib/gatakanas';
	import { hiraganas, hiraganasGroup } from '$lib/hiraganas';
	import { answerSheet, quizPool } from '../store';
</script>

<main class="d-flex flex-column justify-content-center align-items-center px-4">
	<h1>선택</h1>
	<button class="btn btn-primary"> 히라가나 </button>
	<GanaList group={hiraganasGroup} />
	<a
		href={`/quiz?pool=${[...$quizPool.values()].join(',')}`}
		on:click={() => {
			$answerSheet = hiraganas;
		}}>테스트</a
	>
	<button class="btn btn-primary"> 가타카나 </button>
	<GanaList group={gatakanasGroup} />
	<a
		href={`/quiz?pool=${[...$quizPool.values()].join(',')}`}
		on:click={() => {
			$answerSheet = gatakanas;
		}}>테스트</a
	>
</main>

<style>
</style>

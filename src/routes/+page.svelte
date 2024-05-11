<script lang="ts">
	import HiraganaList from '$lib/components/HiraganaList.svelte';
	import { quizPool } from '../store';
</script>

<main class="d-flex flex-column justify-content-center align-items-center px-4">
	<h1>선택</h1>
	<button class="btn btn-primary"> 히라가나 </button>
	<HiraganaList />
	<a href={`/quiz?pool=${[...$quizPool.values()].join(',')}`}>테스트</a>
</main>

<style>
</style>

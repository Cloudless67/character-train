<script lang="ts">
	import { hiraganasGroup } from '$lib/hiraganas';
	import { quizPool } from '../../store';
	import HiraganaListColumn from './HiraganaListColumn.svelte';

	const basic50 = ['아', '카', '사', '타', '나', '하', '마', '야', '라', '와'] as const;
	const dakuten = ['가', '자', '다', '바', '파'] as const;
	const yoon = ['캬', '샤', '차', '냐', '햐', '먀', '랴', '갸', '쟈', '뱌', '퍄'] as const;

	$: set50Active = basic50.every((column) =>
		hiraganasGroup[column].every($quizPool.has.bind($quizPool))
	);
	$: setDakutenActive = dakuten.every((column) =>
		hiraganasGroup[column].every($quizPool.has.bind($quizPool))
	);
	$: setYoonActive = yoon.every((column) =>
		hiraganasGroup[column].every($quizPool.has.bind($quizPool))
	);

	function set50() {
		basic50.forEach((column) => {
			const cb = (set50Active ? $quizPool.delete : $quizPool.add).bind($quizPool);
			hiraganasGroup[column].forEach(cb);
		});
		$quizPool = $quizPool;
	}

	function setDakuten() {
		dakuten.forEach((column) => {
			const cb = (setDakutenActive ? $quizPool.delete : $quizPool.add).bind($quizPool);
			hiraganasGroup[column].forEach(cb);
		});
		$quizPool = $quizPool;
	}

	function setYoon() {
		yoon.forEach((column) => {
			const cb = (setYoonActive ? $quizPool.delete : $quizPool.add).bind($quizPool);
			hiraganasGroup[column].forEach(cb);
		});
		$quizPool = $quizPool;
	}
</script>

<div class="vw-100 my-2 px-2">
	<div class="d-flex">
		<button
			class="mb-2 mx-1"
			on:click={() => {
				$quizPool.clear();
				$quizPool = $quizPool;
			}}>초기화</button
		>
		<button class="mb-2 mx-1" class:selected={set50Active} on:click={set50}>기본 50음</button>
		<button class="mb-2 mx-1" class:selected={setDakutenActive} on:click={setDakuten}>탁음</button>
		<button class="mb-2 mx-1" class:selected={setYoonActive} on:click={setYoon}>요음</button>
	</div>
	<dl class="d-flex overflow-x-scroll">
		{#each Object.keys(hiraganasGroup) as column}
			<HiraganaListColumn {column} />
		{/each}
	</dl>
</div>

<style>
	.selected {
		background-color: #007bff;
		color: white;
	}
</style>

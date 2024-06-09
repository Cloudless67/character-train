<script lang="ts">
	import { onMount } from 'svelte';
	import { quizPool } from '../../store';
	import GanaListColumn from './GanaListColumn.svelte';

	export let group: Record<string, string[]>;

	const basic50 = ['아', '카', '사', '타', '나', '하', '마', '야', '라', '와'];
	const dakuten = ['가', '자', '다', '바', '파'];
	const yoon = ['캬', '샤', '차', '냐', '햐', '먀', '랴', '갸', '쟈', '뱌', '퍄'];
	const all = basic50.concat(dakuten).concat(yoon);
	let isMobile = true;

	onMount(() => {
		isMobile = window.innerWidth < 768;
	});

	$: set50Active = basic50.every((column) => group[column].every($quizPool.has.bind($quizPool)));
	$: setDakutenActive = dakuten.every((column) =>
		group[column].every($quizPool.has.bind($quizPool))
	);
	$: setYoonActive = yoon.every((column) => group[column].every($quizPool.has.bind($quizPool)));
	$: setAllActive = all.every((column) => group[column].every($quizPool.has.bind($quizPool)));

	function set50() {
		basic50.forEach((column) => {
			const cb = (set50Active ? $quizPool.delete : $quizPool.add).bind($quizPool);
			group[column].forEach(cb);
		});
		$quizPool = $quizPool;
	}

	function setDakuten() {
		dakuten.forEach((column) => {
			const cb = (setDakutenActive ? $quizPool.delete : $quizPool.add).bind($quizPool);
			group[column].forEach(cb);
		});
		$quizPool = $quizPool;
	}

	function setYoon() {
		yoon.forEach((column) => {
			const cb = (setYoonActive ? $quizPool.delete : $quizPool.add).bind($quizPool);
			group[column].forEach(cb);
		});
		$quizPool = $quizPool;
	}

	function setAll() {
		all.forEach((column) => {
			const cb = (setAllActive ? $quizPool.delete : $quizPool.add).bind($quizPool);
			group[column].forEach(cb);
		});
		$quizPool = $quizPool;
	}
</script>

<div class="w-100 my-2 px-2">
	<div class="d-flex">
		<button class="mb-2 mx-1" class:selected={setAllActive} on:click={setAll}>전체</button>
		<button class="mb-2 mx-1" class:selected={set50Active} on:click={set50}>기본 50음</button>
		<button class="mb-2 mx-1" class:selected={setDakutenActive} on:click={setDakuten}>탁음</button>
		<button class="mb-2 mx-1" class:selected={setYoonActive} on:click={setYoon}>요음</button>
	</div>
	<dl class="d-flex overflow-x-scroll" class:vertical={isMobile}>
		{#each Object.keys(group) as column}
			<GanaListColumn {column} {group} />
		{/each}
	</dl>
</div>

<style>
	.selected {
		background-color: #007bff;
		color: white;
	}

	.vertical {
		flex-direction: column;
	}
</style>

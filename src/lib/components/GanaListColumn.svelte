<script lang="ts">
	import { onMount } from 'svelte';
	import { quizPool } from '../../store';

	export let group: Record<string, string[]>;
	export let column: string;

	let checkBox: HTMLButtonElement;
	let isMobile = true;

	onMount(() => {
		isMobile = window.innerWidth < 768;
	});

	$: checked = group[column].every($quizPool.has.bind($quizPool));
</script>

<dd class="mx-1" class:horizontal={isMobile}>
	<button
		bind:this={checkBox}
		class="btn"
		class:mb-2={!isMobile}
		class:me-2={isMobile}
		class:selected={checked}
		id={column}
		on:click={() => {
			checked = !checked;
			if (checked) {
				group[column].forEach($quizPool.add.bind($quizPool));
			} else {
				group[column].forEach($quizPool.delete.bind($quizPool));
			}
			$quizPool = $quizPool;
		}}
		>{column}
	</button>
	<ul class="list-group" class:list-group-horizontal={isMobile}>
		{#each group[column] as hiragana, i}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				class="list-group-item"
				class:selected={$quizPool.has(hiragana)}
				on:click={() => {
					if ($quizPool.has(hiragana)) {
						$quizPool.delete(hiragana);
					} else {
						$quizPool.add(hiragana);
					}
					$quizPool = $quizPool;
				}}
			>
				{hiragana}
			</li>
		{/each}
	</ul>
</dd>

<style>
	.selected {
		background-color: #007bff;
		color: white;
	}

	.horizontal {
		display: flex;
		flex-direction: row;
	}

	.btn {
		width: 48px;
		height: 42px;
	}
</style>

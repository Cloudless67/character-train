<script lang="ts">
	import { hiraganasGroup } from '$lib/hiraganas';
	import { quizPool } from '../../store';

	export let column: keyof typeof hiraganasGroup;

	let checkBox: HTMLButtonElement;

	$: checked = hiraganasGroup[column].every($quizPool.has.bind($quizPool));
</script>

<dd class="mx-1">
	<button
		bind:this={checkBox}
		class="btn mb-2 w-100"
		class:selected={checked}
		id={column}
		on:click={() => {
			checked = !checked;
			if (checked) {
				hiraganasGroup[column].forEach($quizPool.add.bind($quizPool));
			} else {
				hiraganasGroup[column].forEach($quizPool.delete.bind($quizPool));
			}
			$quizPool = $quizPool;
		}}
		>{column}
	</button>
	<ul class="list-group">
		{#each hiraganasGroup[column] as hiragana, i}
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
</style>

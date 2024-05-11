<script lang="ts">
	import { quizPool } from '../../store';

	export let group: Record<string, string[]>;
	export let column: string;

	let checkBox: HTMLButtonElement;

	$: checked = group[column].every($quizPool.has.bind($quizPool));
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
				group[column].forEach($quizPool.add.bind($quizPool));
			} else {
				group[column].forEach($quizPool.delete.bind($quizPool));
			}
			$quizPool = $quizPool;
		}}
		>{column}
	</button>
	<ul class="list-group">
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
</style>

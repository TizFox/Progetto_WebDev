<script lang="ts">
	import type { PageData } from "./$types";

	import Empty from "$lib/components/Empty.svelte";
	import HistoryRecord from "$lib/components/HistoryRecord.svelte";

	let { data } = $props();
	let { history }: PageData = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>History - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

{#if history.length !== 0}
	<section class="page page-col">
		<h1 class="main-text pt-5">HISTORY</h1>

		<div class="page page-col flex-col-reverse">
			{#each history as h}
				<HistoryRecord
					id={h.id}
					createdAt={h.created_at}
					total={h.total}
				/>
			{/each}
		</div>
	</section>
{:else}
	<Empty msg="Empty History" />
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>

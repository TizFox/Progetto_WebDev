<script lang="ts">
	import { formatDate } from "$lib/client/utils";

	let {
		id,
		createdAt,
		total,
	}: {
		id: string;
		createdAt: string;
		total: number;
	} = $props();
</script>

<!------------------------------------------>

<a
	href="/order{id}"
	class="std-btn w-full
				hover:border-d2 hover:bg-d2 hover:text-dark"
>
	<div class="side-by-side">
		<p class="text-left">
			<span class="main-text">Order Id</span>: {id}<br />
			<span class="main-text">Created</span>: {formatDate(createdAt)}
		</p>
		<p class="inverted-price-tag">Total: €{total}</p>
	</div>
</a>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>

<script lang="ts">
	import { page } from "$app/stores";
</script>

<main>
	<aside>
		<nav>
			<li>▶️<a href="/dashboard/{$page.params.userEmail}">21</a></li>
			<li>📑<a href="/dashboard/{$page.params.userEmail}/journal">Journal</a></li>
		</nav>
	</aside>
	<div class="contentDiv">
		<slot />
	</div>
</main>

<style>
	.contentDiv {
		width: 100%;
		height: 100%;
		padding: 0 20px;
	}

	main {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
	}

	nav {
		width: 200px;
		height: 300px;
		background-color: var(--primary-focus);
		color: black;
		border-radius: 5px;
		padding: 10px;
	}

	nav a {
		text-decoration: underline;
		color: var(--secondary);
		margin-left: 0.25rem;
	}

	nav li {
		display: flex;
		flex-direction: row;
	}
</style>

<script lang="ts">
	import "@picocss/pico";
	import "../app.css";
	import { delete_cookie } from "./cookies";

	let current_theme: "light" | "dark" = "dark";
	let theme_button: HTMLButtonElement;

	function toggle_theme() {
		let html = document.querySelector("html");
		if (html) {
			if (current_theme === "dark") {
				html.setAttribute("data-theme", "light");
				current_theme = "light";
			} else {
				html.setAttribute("data-theme", "dark");
				current_theme = "dark";
			}
		}

		// de-focus the button
		theme_button.blur();
	}
</script>

<main>
	<nav>
		<ul>
			<li><strong>21 Day Week</strong></li>
		</ul>
		<ul>
			<li class="themeSelector">
				<button id="theme_button" bind:this={theme_button} on:click={toggle_theme}
					>{current_theme.toUpperCase()}</button
				>
			</li>
		</ul>
	</nav>
	<slot />
</main>

<style>
	nav {
		border-bottom: 1px solid var(--secondary);
		margin-bottom: 1.5em;
		margin-top: 0;
	}

	nav strong {
		font-size: 1.5em;
	}

	.themeSelector {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.themeSelector button {
		border: none;
		padding: 5px 10px;
		width: 100px;
		cursor: pointer;
	}

	:global(html) {
		transition: background-color 0.2s ease-in-out;
	}

	main {
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 20px 20px 20px;
	}
</style>

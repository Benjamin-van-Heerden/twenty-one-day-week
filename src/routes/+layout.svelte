<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	let currentTheme: 'light' | 'dark' = 'dark';
    let themeButton: HTMLButtonElement;

	function toggleTheme() {

		let html = document.querySelector('html');
		if (html) {
			if (currentTheme === 'dark') {
				html.setAttribute('data-theme', 'light');
				currentTheme = 'light';
			} else {
				html.setAttribute('data-theme', 'dark');
				currentTheme = 'dark';
			}
		}

        // de-focus the button
        themeButton.blur();

	}
</script>

<main>
	<nav>
        <ul>
          <li><strong>21 Day Week</strong></li>
        </ul>
        <ul>
          <li class="themeSelector">
            <button id="themeButton" bind:this={themeButton} on:click={toggleTheme}>{currentTheme.toUpperCase()}</button></li>
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
        padding: 5px 10px;
        border-radius: 5px;
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





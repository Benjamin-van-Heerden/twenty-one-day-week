<script lang="ts">
	export let user_email: string;
	export let goal_type: string;
	export let time_of_day: string;
	export let start_date: string;
	let opened = false;
</script>

<main>
	<button
		class="openButton"
		on:click={() => {
			opened = true;
		}}
	>
		+
	</button>

	<dialog open={opened}>
		<article>
			<h3>New Goal</h3>
			<p>Goal Type: <strong>{goal_type}</strong></p>
			<p>Time of Day: <strong>{time_of_day}</strong></p>
			<p>Start Day: <strong>{start_date}</strong></p>
			<form method="post" action="?/create">
				<input name="user_email" value={user_email} hidden />
				<input name="goal_type" value={goal_type} hidden />
				<input name="time_of_day" value={time_of_day} hidden />
				<input name="start_date" value={start_date} hidden />
				<textarea name="description" placeholder="Goal Description" />
				<small>Active Days:</small>
				<div class="grid">
					<label><input type="checkbox" name="schedule" value="1" /><span>MON</span></label>
					<label><input type="checkbox" name="schedule" value="2" /><span>TUE</span></label>
					<label><input type="checkbox" name="schedule" value="3" /><span>WED</span></label>
					<label><input type="checkbox" name="schedule" value="4" /><span>THU</span></label>
					<label><input type="checkbox" name="schedule" value="5" /><span>FRI</span></label>
					<label><input type="checkbox" name="schedule" value="6" /><span>SAT</span></label>
					<label><input type="checkbox" name="schedule" value="0" /><span>SUN</span></label>
				</div>
				<button type="submit">Create Goal</button>
				<button class="cancel" type="button" on:click={() => (opened = false)}>Cancel</button>
			</form>
		</article>
	</dialog>
</main>

<style>
	main {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.openButton {
		height: 30px;
		width: 75px;
		background-color: var(--primary);
		color: white;
		padding: 0;
		font-size: 0.75rem;
		text-align: center;
		border: 2px solid var(--primary-hover);
	}

	.cancel {
		background-color: tomato;
		border: none;
	}

	.grid input:checked {
		background-color: var(--secondary);
	}

	.grid {
		margin-bottom: 1rem;
		text-align: center;
	}

	input {
		width: 100%;
		margin: 0;
	}

	textarea {
		width: 100%;
		height: 75px;
	}

	h3 {
		margin: 0.5rem 0;
	}

	p {
		margin: 0.25rem 0;
	}

	form {
		margin-top: 1rem;
		width: 550px;
	}

	article {
		padding: 40px;
	}
</style>

<script lang="ts">
	import CreateGoalModal from "./CreateGoalModal.svelte";
	import { page } from "$app/stores";

	export let data;
	const email = $page.params.user_email;
	let yesterday_today = false; // false if today, true if yesterday
	$: working_date = yesterday_today ? new Date(Date.now() - 86400000) : new Date();
</script>

<main>
	<div class="yesterdayTodayOuter grid">
		<div class="yesterdayTodayInner">
			<label>
				<input
					type="checkbox"
					checked={yesterday_today}
					on:click={() => {
						yesterday_today = true;
					}}
				/>
				<span>Yesterday</span>
			</label>
			<label>
				<input
					type="checkbox"
					checked={!yesterday_today}
					on:click={() => {
						yesterday_today = false;
					}}
				/>
				<span>Today</span>
			</label>
		</div>
		<h2>Active Day: <strong>{working_date}</strong></h2>
	</div>
	<div class="goalBox">
		<div class="goals">
			<h1>Morning</h1>
			<div class="major">
				<h4>Major</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal user_email={email} goal_type="major" time_of_day="morning" />
			</div>
			<div class="minor">
				<h4>Minor</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal user_email={email} goal_type="minor" time_of_day="morning" />
			</div>
		</div>
		<div class="graph" />
	</div>
	<div class="goalBox">
		<div class="goals">
			<h1>Afternoon</h1>
			<div class="major">
				<h4>Major</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal user_email={email} goal_type="major" time_of_day="afternoon" />
			</div>
			<div class="minor">
				<h4>Minor</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal user_email={email} goal_type="minor" time_of_day="afternoon" />
			</div>
		</div>
		<div class="graph" />
	</div>
	<div class="goalBox">
		<div class="goals">
			<h1>Evening</h1>
			<div class="major">
				<h4>Major</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal user_email={email} goal_type="major" time_of_day="evening" />
			</div>
			<div class="minor">
				<h4>Minor</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal user_email={email} goal_type="minor" time_of_day="evening" />
			</div>
		</div>
		<div class="graph" />
	</div>
</main>

<style>
	.yesterdayTodayOuter {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.yesterdayTodayInner {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.yesterdayTodayInner label {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin: 0 1rem;
		padding: 0.5rem;
		width: 120px;
		border: 1px solid var(--secondary);
		border-radius: 5%;
	}

	h1 {
		margin: 0 0 1rem 0;
	}

	h4 {
		margin: 0 0 0.5rem 0;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		list-style-type: none;
		margin: 0.5rem 0;
		padding: 0;
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 0 2rem;
	}

	.goalBox {
		display: flex;
		flex-direction: row;
		margin-bottom: 1rem;
	}

	.goals {
		display: flex;
		flex-direction: column;
		width: 50%;
	}

	.graph {
		width: 50%;
	}
</style>

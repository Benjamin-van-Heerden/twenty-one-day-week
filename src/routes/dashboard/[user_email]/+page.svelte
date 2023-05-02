<script lang="ts">
	import CreateGoalModal from "./CreateGoalModal.svelte";
	import { page } from "$app/stores";

	export let data;
	const goals = data.goals;

	const display_date_formatter = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});
	const active_date_formatter = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});
	const email = $page.params.user_email;
	let yesterday_today = false; // false if today, true if yesterday
	$: display_date = yesterday_today
		? display_date_formatter.format(new Date(Date.now() - 86400000))
		: display_date_formatter.format(new Date());
	$: active_date = yesterday_today
		? active_date_formatter.format(new Date(Date.now() - 86400000))
		: active_date_formatter.format(new Date());
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
		<h2>Active Day: <u><strong>{display_date}</strong></u></h2>
	</div>
	<div class="goalBox">
		<div class="goals">
			<h1>Morning</h1>
			<div class="major">
				<h4>Major</h4>
				<ul class="goalList">
					{#if typeof goals !== "string"}
						{#each goals as goal (goal.id)}
							{#if goal.time_of_day === "morning" && goal.goal_type === "major"}
								<li>
									<div class="goalBox">
										<input type="checkbox" /><strong>{goal.description}</strong>
									</div>
								</li>
							{/if}
						{/each}
					{/if}
				</ul>
				<CreateGoalModal
					start_date={active_date}
					user_email={email}
					goal_type="major"
					time_of_day="morning"
				/>
			</div>
			<div class="minor">
				<h4>Minor</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal
					start_date={active_date}
					user_email={email}
					goal_type="minor"
					time_of_day="morning"
				/>
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
				<CreateGoalModal
					start_date={active_date}
					user_email={email}
					goal_type="major"
					time_of_day="afternoon"
				/>
			</div>
			<div class="minor">
				<h4>Minor</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal
					start_date={active_date}
					user_email={email}
					goal_type="minor"
					time_of_day="afternoon"
				/>
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
				<CreateGoalModal
					start_date={active_date}
					user_email={email}
					goal_type="major"
					time_of_day="evening"
				/>
			</div>
			<div class="minor">
				<h4>Minor</h4>
				<ul>
					<li />
				</ul>
				<CreateGoalModal
					start_date={active_date}
					user_email={email}
					goal_type="minor"
					time_of_day="evening"
				/>
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
		margin-bottom: 1rem;
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

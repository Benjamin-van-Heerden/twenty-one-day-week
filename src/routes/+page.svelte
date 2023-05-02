<script lang="ts">
	import { fade } from "svelte/transition";
	import { superForm } from "sveltekit-superforms/client";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import type { PageData } from "./$types";
	import { z } from "zod";
	import * as HomeSchema from "./schemas";

	let show_register = false;
	let loading = false;

	let login_button: HTMLButtonElement;
	let register_button: HTMLButtonElement;
	let goto_login_button: HTMLButtonElement;
	let goto_register_button: HTMLButtonElement;

	function switch_login_register() {
		show_register = !show_register;
	}

	export let data: PageData;

	const {
		form: login_form,
		errors: login_errors,
		enhance: login_enhance
	} = superForm(data.login_form, {
		invalidateAll: false,
		validators: HomeSchema.LoginSchema,
		onSubmit: () => {
			loading = true;
			login_button.disabled = true;
			goto_register_button.disabled = true;
		},
		onResult: () => {
			loading = false;
			login_button.disabled = false;
			goto_register_button.disabled = false;
		},
		onError: () => {
			loading = false;
			login_button.disabled = false;
			goto_register_button.disabled = false;
		}
	});

	const {
		form: register_form,
		errors: register_errors,
		enhance: register_enhance
	} = superForm(data.register_form, {
		invalidateAll: false,
		validators: HomeSchema.RegisterSchema,
		onSubmit: ({ cancel }) => {
			loading = true;
			register_button.disabled = true;
			goto_login_button.disabled = true;
			if ($register_form.password !== $register_form.confirm_password) {
				alert("Passwords do not match");
				cancel();
			}
		},
		onResult: () => {
			loading = false;
			register_button.disabled = false;
			goto_login_button.disabled = false;
		},
		onError: () => {
			loading = false;
			register_button.disabled = false;
			goto_login_button.disabled = false;
		}
	});
</script>

<div class="custom-shape-divider-bottom-1682715300">
	<svg
		data-name="Layer 1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1200 120"
		preserveAspectRatio="none"
	>
		<path
			d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
			opacity=".25"
			class="shape-fill"
		/>
		<path
			d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
			opacity=".5"
			class="shape-fill"
		/>
		<path
			d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
			class="shape-fill"
		/>
	</svg>
</div>

<main>
	<p>Benjamin</p>

	{#if !show_register}
		<form in:fade method="post" action="?/login" use:login_enhance>
			<input
				type="email"
				name="user_email"
				placeholder="Email"
				bind:value={$login_form.user_email}
			/>
			{#if $login_errors.user_email}
				<small>{$login_errors.user_email}</small>
			{/if}
			<input
				type="password"
				name="password"
				placeholder="Password"
				bind:value={$login_form.password}
			/>
			{#if $login_errors.password}
				<small>{$login_errors.password}</small>
			{/if}
			<button type="submit" bind:this={login_button}>Login</button>
			<div class="registerField">
				{#if loading}
					<div class="spinner" />
				{/if}
				<label for="registerButton">Don't have an account?</label>
				<button
					id="registerButton"
					class="loginNavButton"
					on:click={switch_login_register}
					bind:this={goto_register_button}>Register</button
				>
			</div>
		</form>
	{:else}
		<form in:fade method="post" action="?/register" use:register_enhance>
			<input
				type="text"
				name="first_name"
				placeholder="First Name"
				bind:value={$register_form.first_name}
			/>
			{#if $register_errors.first_name}
				<small>{$register_errors.first_name}</small>
			{/if}
			<input
				type="text"
				name="last_name"
				placeholder="Last Name"
				bind:value={$register_form.last_name}
			/>
			{#if $register_errors.last_name}
				<small>{$register_errors.last_name}</small>
			{/if}
			<input
				type="email"
				name="user_email"
				placeholder="Email"
				bind:value={$register_form.user_email}
			/>
			{#if $register_errors.user_email}
				<small>{$register_errors.user_email}</small>
			{/if}
			<input
				type="password"
				name="password"
				placeholder="Password"
				bind:value={$register_form.password}
			/>
			{#if $register_errors.password}
				<small>{$register_errors.password}</small>
			{/if}
			<input
				type="password"
				name="confirm_password"
				placeholder="Confirm Password"
				bind:value={$register_form.confirm_password}
			/>
			{#if $register_errors.confirm_password}
				<small>{$register_errors.confirm_password}</small>
			{/if}
			<button type="submit" bind:this={register_button}>Register</button>
			<div class="loginField">
				<button
					id="backToLoginButton"
					class="loginNavButton"
					on:click={switch_login_register}
					bind:this={goto_login_button}>Back to Login</button
				>
				{#if loading}
					<div class="spinner" />
				{/if}
			</div>
		</form>
	{/if}
</main>

<style>
	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		border-left-color: var(--secondary);
		animation: spin 1s ease infinite;
		margin-right: auto;
	}

	.loginField .spinner {
		margin-right: 0;
		margin-left: auto;
	}

	.loginNavButton {
		border: none;
		background-color: var(--secondary);
		width: 30%;
		height: 30px;
		font-size: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loginNavButton:hover {
		background-color: var(--secondary-hover);
	}

	.loginField {
		display: flex;
		justify-content: start;
	}

	.registerField {
		display: flex;
		justify-content: end;
	}

	#registerButton {
		margin-left: 1rem;
	}

	main {
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	form {
		margin-top: 2em;
		width: 50vw;
	}

	form input {
		height: 2rem;
	}

	.custom-shape-divider-bottom-1682715300 {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
	}

	.custom-shape-divider-bottom-1682715300 svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 150px;
	}

	.custom-shape-divider-bottom-1682715300 .shape-fill {
		fill: var(--primary);
	}

	/** For mobile devices **/
	@media (max-width: 767px) {
		.custom-shape-divider-bottom-1682715300 svg {
			width: calc(100% + 1.3px);
			height: 193px;
		}
	}
</style>

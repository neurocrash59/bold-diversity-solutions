<script>
	import Modal from './Modal.svelte';

	export let showModal = false;

	const close = () => (showModal = false);
</script>

{#if showModal}
	<Modal on:close={close} header="Login">
		<form action="/" enctype="application/x-www-form-urlencoded">
			<div>
				<label for="username" class="block text-sm text-gray-800">Username</label>
				<input
					type="text"
					class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-all duration-200"
				/>
			</div>

			<div class="mt-4">
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm text-gray-800">Password</label>
					<a href="/" class="text-xs text-gray-600 dark:text-gray-400 hover:underline"
						>Forgot Password?</a
					>
				</div>

				<input
					type="password"
					class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-all duration-200"
				/>
			</div>

			<div class="mt-6">
				<button
					class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
				>
					Login
				</button>
			</div>
		</form>
	</Modal>
{/if}

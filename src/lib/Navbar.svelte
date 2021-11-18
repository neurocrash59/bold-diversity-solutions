<script>
	import LoginModal from './LoginModal.svelte';

	let showModal = false;

	const toggleModal = () => (showModal = !showModal);
</script>

<header class="font-opencon font-bold shadow-lg">
	<nav class="bg-taupe">
		<div class="px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
			<div class="flex items-center justify-between">
				<div>
					<a class="text-xl font-bold text-gray-600 md:text-2xl hover:text-light-600" href="/"
						>Bold Diversity Solutions</a
					>
				</div>

				<!-- Mobile menu button -->
				<div class="flex md:hidden">
					<button
						type="button"
						class="text-gray-600 hover:text-light-600 focus:outline-none focus:text-light-600"
						aria-label="toggle menu"
					>
						<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
							<path
								fill-rule="evenodd"
								d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
			<div class="items-center hidden md:flex">
				<div class="flex flex-col md:flex-row md:mx-6">
					<a class="font-bold my-1 text-gray-600 hover:text-light-600 md:mx-4 md:my-0" href="/"
						>Home</a
					>
					<a
						class="font-bold my-1 text-gray-600 hover:text-light-600 md:mx-4 md:my-0"
						href="/coaching-packages">Coaching Packages</a
					>
					<a
						class="font-bold my-1 text-gray-600 hover:text-light-600 md:mx-4 md:my-0"
						sveltekit:prefetch
						href="/articles">Articles</a
					>
					<a class="font-bold my-1 text-gray-600 hover:text-light-600 md:ml-4 md:my-0" href="/about"
						>About</a
					>
				</div>

				<div class="flex justify-center md:block">
					<button
						class="font-bold text-gray-600 hover:text-light-600 md:my-0"
						on:click={toggleModal}>Login</button
					>
				</div>
			</div>
		</div>
	</nav>
</header>

<LoginModal {showModal} />

<!-- <style>
	header {
		font-family: 'Montserrat', sans-serif;
	}
</style> -->

<script>
	import Button from '$lib/Button.svelte';
</script>

<div class="hero container min-h-screen">
	<div class="hero-overlay absolute w-full h-full z-10" />
	<div class="hero-content h-full flex justify-center md:items-center mx-4">
		<div class="max-w-md z-20">
			<h1 class="mb-5 text-5xl text-white">
				Moving Forward to a Better Normal <span class="align-top text-base">&reg;</span>
			</h1>
			<p class="mb-5 text-white">Some placeholder text</p>
			<Button
				bg="bg-indigo-600"
				hoverBg="hover:bg-indigo-700"
				textColor="text-white"
				text="Click it, whitey"
			/>
		</div>
	</div>
</div>

<style>
	.hero {
		background-image: url('/passion.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center left;
		height: 92.5vh;
	}

	.hero-overlay {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.hero-content {
		padding-top: 20%;
	}

	@media (min-width: 768px) {
		.hero {
			background-position: bottom;
		}
	}
</style>

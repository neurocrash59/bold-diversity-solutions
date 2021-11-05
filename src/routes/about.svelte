<script>
	import AboutOne from '$lib/about/AboutOne.svelte';
	import AboutTwo from '$lib/about/AboutTwo.svelte';
	import AboutThree from '$lib/about/AboutThree.svelte';
	import AboutFour from '$lib/about/AboutFour.svelte';
</script>

<div class="w-11/12 border rounded-lg px-8" id="aboutHeader" />

<section class="mx-auto">
	<AboutOne />
</section>

<section class="mx-auto bg-lightgray">
	<AboutTwo />
</section>

<section class="mx-auto">
	<AboutThree />
</section>

<section class="mx-auto bg-lightgray">
	<AboutFour />
</section>

<style>
	#aboutHeader {
		background-image: url('/chalkboard.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: right 40% bottom 45%;
		margin: 2rem auto;
		height: 87.5vh;
	}

	@media (min-width: 768px) {
		#aboutHeader {
			background-position: center;
		}
	}
</style>

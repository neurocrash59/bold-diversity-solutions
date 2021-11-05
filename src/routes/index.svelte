<script>
	import Hero from '$lib/homepage/Hero.svelte';
	import FeatureOne from '$lib/homepage/FeatureOne.svelte';
	import FeatureTwo from '$lib/homepage/FeatureTwo.svelte';
	import FeatureThree from '$lib/homepage/FeatureThree.svelte';
	import FeatureFour from '$lib/homepage/FeatureFour.svelte';
</script>

<svelte:head>
	<title>Bold Diversity Solutions</title>
</svelte:head>

<Hero />

<main class="my-8">
	<FeatureOne />
	<FeatureTwo />
	<FeatureThree />
	<FeatureFour />
</main>

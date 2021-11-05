<script>
	import 'virtual:windi.css';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<!-- <svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@0,300;0,700;1,300&display=swap"
		rel="stylesheet"
	/>
</svelte:head> -->

<div class="min-h-screen">
	<Navbar />
	<slot />
	<Footer />
</div>

<style>
	@font-face {
		font-family: 'Open Sans Condensed';
		font-style: normal;
		font-weight: 300;
		src: url(/fonts/OpenSansCondensed-Light.ttf);
	}

	@font-face {
		font-family: 'Open Sans Condensed';
		font-style: italic;
		font-weight: 300;
		src: url(/fonts/OpenSansCondensed-LightItalic.ttf);
	}

	@font-face {
		font-family: 'Open Sans Condensed';
		font-style: bold;
		font-weight: 700;
		src: url(/fonts/OpenSansCondensed-Bold.ttf);
	}

	*,
	div {
		font-family: 'Open Sans Condensed', 'Open Sans', 'sans-serif';
	}
</style>

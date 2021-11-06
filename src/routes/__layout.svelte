<script>
	import 'virtual:windi.css';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

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

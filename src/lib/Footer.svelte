<script>
	import PrivacyPolicy, { openModal } from './PrivacyPolicy.svelte';
</script>

<svelte:head>
	<!-- Font Awesome -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
		integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
	<!-- Academicons -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons/css/academicons.min.css"
	/>
</svelte:head>

<footer class="bg-taupe p-12">
	<p>
		<a href="https://www.patreon.com/bolddiversitysolutions" target="_blank"
			><i class="fab fa-patreon fa-2x" /></a
		>

		<a href="https://schooling.academia.edu/?prem_fnl_first=true" target="_blank"
			><i class="ai ai-academia-square ai-2x ml-4" /></a
		>

		<a
			href="https://linkedin.com/in/diana-schooling-m-legal-studies-m-tesol-95b8565a/"
			target="_blank"><i class="fab fa-linkedin fa-2x ml-4" /></a
		>

		<a href="https://www.instagram.com/schoolingdiana_official/" target="_blank"
			><i class="fab fa-instagram-square fa-2x ml-4" /></a
		>

		<a href="https://twitter.com/SchoolingDiana" target="_blank"
			><i class="fab fa-twitter-square fa-2x ml-4" /></a
		>
	</p>

	<p>
		&copy; 2017–2021 Bold Diversity Solutions, powered by Aqua Wealth & Media LLC &middot;
		<button on:click={openModal}>Privacy</button>
		&middot;
		<a href="#termsModal" data-bs-toggle="modal">Terms</a>
		&middot;
		<a href="#disclaimerModal" data-bs-toggle="modal">Disclaimer</a>
	</p>

	<PrivacyPolicy />
</footer>

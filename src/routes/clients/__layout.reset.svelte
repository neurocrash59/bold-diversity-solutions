<script>
	import Navbar from '$lib/Navbar.svelte';
	import Sidebar from '$lib/clients/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div class="flex flex-wrap justify-between h-screen w-full">
	<div class="item w-full">
		<Navbar />
	</div>
	<div class="item w-1/5 h-full">
		<Sidebar />
	</div>
	<div class="item w-4/5 h-full pl-8 pt-8">3</div>
	<div class="item w-full">
		<Footer />
	</div>
</div>

<script>
  import "virtual:windi.css"
  import Navbar from "$lib/Navbar.svelte";
  import Footer from '$lib/Footer.svelte';
</script>

<div class="min-h-screen">
  <Navbar />
  <slot />
  <Footer />
</div>
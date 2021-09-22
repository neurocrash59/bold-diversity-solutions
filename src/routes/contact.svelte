<script>
	import ContactForm from '$lib/contact/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact Us</title>
</svelte:head>

<main class="w-full min-h-screen">
	<section class="text-gray-600 body-font relative">
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col text-center w-full mb-12">
				<h1 class="sm:text-3xl text-2xl font-medium font-cormorant title-font mb-4 text-gray-900">
					Contact Us
				</h1>
			</div>
			<ContactForm />
		</div>
	</section>
</main>

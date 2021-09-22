<script>
	export let title;
	export let date;
	export let description;
</script>

<div class="p-4 bg-light-400 mb-4 h-64 rounded-md shadow">
	<h5 class="text-sm text-indigo-600 font-bold">Featured Article</h5>
	<h3 class="font-cormorant text-2xl">{title}</h3>
	<h4 class="text-lg text-gray-400 mb-2">{date}</h4>
	<p class="text-lg">
		{description}
	</p>
</div>

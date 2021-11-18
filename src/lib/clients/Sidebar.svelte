<script>
	import Icon from 'svelte-awesome';
	import { home, envelope, cog } from 'svelte-awesome/icons';
</script>

<div
	class="w-72 w-full bg-taupe h-screen flex flex-col text-gray-800 font-bold fixed lg:absolute lg:sticky top-0 transition-transform transform duration-500 ease -translate-x-full lg:translate-x-0"
>
	<svg
		aria-hidden="true"
		focusable="false"
		data-prefix="fas"
		data-icon="bars"
		class="svg-inline--fa fa-bars fa-w-14 absolute right-0 transform translate-x-double top-0 mt-8 text-3xl text-blue-800 cursor-pointer lg:hidden"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
	>
		<path
			fill="currentColor"
			d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
		/></svg
	><a href="/" class="no-underline block mt-6"
		><img
			src="https://gustui.s3.amazonaws.com/Gust+Logo+White.png"
			class="w-40 mx-auto"
			alt=""
		/></a
	>
	<div class="flex-1 mt-8">
		<div class="mt-6">
			<a
				href="/"
				class="flex justify-between no-underline w-full px-8 py-3 border-l-4 text-sm transition-colors duration-200 ease-in-out hover:text-blue-400 bg-osiyoblue border-osiyoblue"
				><div>
					<Icon data={home} scale={2} />
					Home
				</div></a
			><a
				href="/"
				class="flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent text-sm transition-colors duration-200 ease-in-out hover:text-blue-400"
				><div>
					<Icon data={envelope} scale={2} />
					Dogs
				</div>
				<span class="rounded-sm py-1 px-2 text-xs font-medium text-white bg-gray-900">3</span></a
			><a
				href="/"
				class="flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent text-sm transition-colors duration-200 ease-in-out hover:text-blue-400"
				><div>
					<Icon data={cog} scale={2} />
					Settings
				</div></a
			>
		</div>
	</div>
</div>

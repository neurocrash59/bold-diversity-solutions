<script context="module">
	export const load = async ({ page: { params }, fetch, session, stuff }) => {
		const { slug } = params;
		const res = await fetch(`http://localhost:1337/articles/${slug}`);

		if (res.status === 404) {
			const error = new Error('Article not found!');
			return { status: 404, error };
		} else {
			const data = await res.json();
			const article = data;

			return {
				props: {
					article
				}
			};
		}
	};
</script>

<script>
	import snarkdown from 'snarkdown';

	export let article;
	let content = article.content;

	let newDate = new Date(article.created_at).toDateString();
	let postedDate = newDate.slice(4);
</script>

<article class="w-8/12 my-4 mx-auto p-6" id="article">
	<div class="font-sans">
		<p class="text-base md:text-sm text-indigo-500 font-bold">
			&lt; <a href="/articles" class="font-bold no-underline hover:underline"
				>Back to Article Index</a
			>
		</p>

		<img src={article.image} alt="" class="title-img w-full h-auto object-cover mb-4" />

		<h1 class="font-bold font-sans break-normal pt-6 pb-2 text-3xl md:text-4xl">
			{article.title}
		</h1>
		<p class="text-sm md:text-base font-normal text-gray-400 mb-8">Published {postedDate}</p>
	</div>

	<section class="prose">{@html snarkdown(article.content)}</section>
</article>

<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('articles/getArticles');
		const data = await res.json();

		const articles = data;
		console.log(articles);

		return {
			props: {
				articles
			}
		};
	};
</script>

<script>
	import FeatureArticleCard from '$lib/articles/FeatureArticleCard.svelte';
	import ArticlePreviewCard from '$lib/articles/ArticlePreviewCard.svelte';

	export let articles;
	export let featuredArticles = articles.filter(article => article.featured === true);

	articles = articles.reverse();
</script>

<div class="w-full border rounded-lg mb-4 px-8" id="blogHeader" />

<section>
	<div class="font-opencon grid overflow-hidden grid-cols-2 gap-x-12 w-full h-full my-4 px-8">
		
	{#each featuredArticles as feature}
		<FeatureArticleCard title={feature.title} date={feature.posted} description={feature.description} />
	{/each}	
	</div>
</section>

<section class="mt-8">
	<h2 class="font-cormorant text-3xl italic my-8 ml-10">Most Recent Articles</h2>

	<div class="font-opencon grid overflow-hidden grid-cols-1 w-3/4 h-full my-4 px-8">

		{#each articles as article}
			<a href="/articles/{article.id}">
				<ArticlePreviewCard title={article.title} date={article.posted} description={article.description} />
			</a>
		{/each}

	</div>
</section>

<style>
	#blogHeader {
		background-image: url('/typewriter-sm.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		margin: 0 auto;
		width: 90vw;
		height: 87.5vh;
	}
</style>
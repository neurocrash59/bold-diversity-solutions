<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('articles/getArticles');
		const data = await res.json();

		const articles = data;

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
	export let featuredArticles = articles.filter((article) => article.featured === true);

	articles = articles.reverse();
</script>

<div class="w-11/12 border rounded-lg" id="blogHeader" />

<section id="featured-articles">
	<div class="font-opencon grid overflow-hidden md:grid-cols-2 md:gap-x-12 h-full my-4 px-8">
		{#if !featuredArticles}
			<p>Uh-oh! No featured articles!</p>
		{:else}
			{#each featuredArticles as feature}
				<a sveltekit:prefetch href="/articles/{feature.id}">
					<FeatureArticleCard
						title={feature.title}
						date={feature.posted}
						description={feature.description}
					/>
				</a>
			{/each}
		{/if}
	</div>
</section>

<section class="mt-8">
	<h2 class="font-cormorant text-3xl italic my-8 ml-10">Most Recent Articles</h2>

	<div class="font-opencon grid overflow-hidden md:grid-cols-1 md:w-3/4 h-full my-4 px-8">
		{#if !articles}
			<p>Uh-oh! There aren't any regular articles, either!</p>
		{:else}
			{#each articles as article}
				<a sveltekit:prefetch href="/articles/{article.id}">
					<ArticlePreviewCard
						title={article.title}
						date={article.posted}
						description={article.description}
					/>
				</a>
			{/each}
		{/if}
	</div>
</section>

<style>
	#blogHeader {
		background-image: url('/typewriter-sm.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		margin: 2rem auto;
		height: 87.5vh;
	}
</style>

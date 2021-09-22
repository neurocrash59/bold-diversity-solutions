export async function get() {
	const res = await fetch('http://45.79.95.19:1337/articles');
	const articles = await res.json();

	for (let article of articles) {
		let newDate = new Date(article.created_at).toDateString();
		article.posted = newDate.slice(4);
	}

	return {
		body: articles
	};
}

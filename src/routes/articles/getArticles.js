export async function get() {
	const res = await fetch('http://localhost:1337/posts');
	const articles = await res.json();

	for (let article of articles) {
		let newDate = new Date(article.created_at).toDateString();
		article.posted = newDate.slice(4);
	}

	return {
		body: articles
	};
}

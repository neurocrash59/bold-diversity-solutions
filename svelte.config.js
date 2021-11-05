import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: vercel(),
		target: '#svelte',
		vite: () => ({
			plugins: [WindiCSS()]
		})
	}
};
export default config;

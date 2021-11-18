import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: node({
			out: 'build',
			precompress: 'false',
			env: {
				host: 'HOST',
				port: 'PORT'
			}
		}),
		target: '#svelte',
		vite: () => ({
			plugins: [WindiCSS()]
		})
	}
};
export default config;

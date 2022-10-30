import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({
		postcss: true,
		replace: [
			[/WROOT/g,process.env.NODE_ENV==='production'?'https://24.99.231.214':'http://10.0.0.2:5173'],
			[/CMPNTS/g,process.cwd() + '/src/components/'],
			[/LIB/g,process.cwd() + '/src/lib/'],
		]
	})],

	kit: {
		adapter: adapter({
			out: 'public'
			/*pages: 'build',
			assets: 'build',
			fallback: null
			//for static */
		}),
	}
};

export default config;

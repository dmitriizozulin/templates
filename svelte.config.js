import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), sveltePreprocess()],
	kit: {
		adapter: adapter(),
		alias: {
			'@common': 'src/common',
			'@components': 'src/components',
			'@domain': 'src/domain',
			'@utils': 'src/utils',
			'@infrastructure': 'src/infrastructure',
			'@hooks': 'src/hooks',
		},
	},
    onwarn: (warning, handler) => {
        if (warning.code.startsWith('a11y-')) return;
        handler(warning);
    },
};

export default config;

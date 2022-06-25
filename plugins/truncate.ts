import type { Plugin } from '@nuxt/types';

type Truncater = (text: string, maxLength: number) => string

declare module 'vue/types/vue' {
	interface Vue {
		$truncate: Truncater
	}
}

const truncater: Truncater = (text: string, maxLength: number = 30) => text.length > maxLength
	? `${text.substring(0, maxLength)}...`
	: text;

const truncatePlugin: Plugin = (_context, inject) => {
	inject('truncate', truncater);
};

export default truncatePlugin;

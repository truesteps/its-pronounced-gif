import type { Plugin } from '@nuxt/types';
import axios, { CancelToken, CancelTokenSource } from 'axios';

type GetCancelToken = (tokenName: string) => CancelToken;
type GetRandomInt = (min: number, max: number) => number;

interface CancelTokenSources {
	[key: string]: CancelTokenSource;
}

interface Helpers {
	getCancelToken: GetCancelToken;
	getRandomInt: GetRandomInt;
}

declare module 'vue/types/vue' {
	interface Vue {
		$helpers: Helpers
	}
}

declare module 'vuex/types/index' {
	interface Store<S> {
		$helpers: Helpers,
	}
}

const cancelTokenSources: CancelTokenSources = {};

const nuxtHelpers: Helpers = {
	getCancelToken(name: string) {
		if (cancelTokenSources[name]) {
			cancelTokenSources[name].cancel();
		}

		cancelTokenSources[name] = axios.CancelToken.source();

		return cancelTokenSources[name].token;
	},

	// get random int between a min and max threshold, from mdn
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);

		// The maximum is exclusive and the minimum is inclusive
		return Math.floor(Math.random() * (max - min) + min);
	}
};

const nuxtHelpersPlugin: Plugin = (_context, inject) => {
	inject('helpers', nuxtHelpers);
};

export default nuxtHelpersPlugin;

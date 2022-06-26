import type { Plugin } from '@nuxt/types';
import axios, { CancelToken, CancelTokenSource } from 'axios';

type GetCancelToken = (tokenName: string) => CancelToken;

interface CancelTokenSources {
	[key: string]: CancelTokenSource;
}

interface Helpers {
	getCancelToken: GetCancelToken;
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
};

const nuxtHelpersPlugin: Plugin = (_context, inject) => {
	inject('helpers', nuxtHelpers);
};

export default nuxtHelpersPlugin;

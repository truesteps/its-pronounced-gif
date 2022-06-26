import type { Plugin } from '@nuxt/types';
import axios, { CancelToken, CancelTokenSource } from 'axios';

type GetCancelToken = (tokenName: string) => CancelToken;
type GetRandomInt = (min: number, max: number) => number;
type CopyToClipboard = (text: string) => void;

interface CancelTokenSources {
	[key: string]: CancelTokenSource;
}

interface Helpers {
	getCancelToken: GetCancelToken;
	getRandomInt: GetRandomInt;
	copyToClipboard: CopyToClipboard;
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
	},

	// return a promise
	copyToClipboard(textToCopy: string): Promise<void> {
		// navigator clipboard api needs a secure context (https)
		if (navigator.clipboard && window.isSecureContext) {
			// navigator clipboard api method
			return navigator.clipboard.writeText(textToCopy);
		} else {
			// text area method
			const textArea: HTMLTextAreaElement = document.createElement('textarea');

			textArea.value = textToCopy;
			// make the textarea out of viewport
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			textArea.style.top = '-999999px';

			document.body.appendChild(textArea);

			textArea.focus();
			textArea.select();

			return new Promise((res, rej) => {
				// here the magic happens
				document.execCommand('copy') ? res() : rej();
				textArea.remove();
			});
		}
	}
};

const nuxtHelpersPlugin: Plugin = (_context, inject) => {
	inject('helpers', nuxtHelpers);
};

export default nuxtHelpersPlugin;

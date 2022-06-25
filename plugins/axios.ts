import axios from 'axios';
import { Plugin } from '@nuxt/types';

const axiosPlugin: Plugin = function interceptingAxios({ app, store, $axios }) {
	$axios.onRequest((config) => {
		app.$debug(`"${config.method}" request to ${config.url}`);
	});
};

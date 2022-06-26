import { Plugin } from '@nuxt/types';

const axiosPlugin: Plugin = function interceptingAxios({ app, $axios }) {
	$axios.onRequest((config) => {
		if (app.$config.appEnv === 'production') {
			return;
		}

		console.log(`"${config.method}" request to ${config.url}`);
	});
};

export default axiosPlugin;

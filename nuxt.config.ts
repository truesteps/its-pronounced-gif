import type { NuxtConfig } from '@nuxt/types';

require('dotenv').config({ path: '.env' });

const config: NuxtConfig = {
	ssr: false,

	build: {},

	buildModules: [
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify'
	],

	css: [],

	publicRuntimeConfig: {
		tenorApiKey: process.env.TENOR_API_KEY,
		tenorClientKey: process.env.TENOR_CLIENT_KEY,
		tenorBaseUrl: process.env.TENOR_BASE_URL,
	},

	head: {
		titleTemplate: '%s - It\'s pronounced /dʒɪf/',
		title: 'It\'s pronounced /dʒɪf/',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: 'A very special project for some very special people by a very special person <3'
			}
		],
		link: []
	},

	loading: { color: '#0c64c1' },

	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios'
	],

	plugins: [
		'~/plugins/truncate'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		proxy: true,
		baseURL: process.env.TENOR_BASE_URL,
		browserBaseURL: '/server',
		retry: {
			retries: 3
		},
		headers: {
			common: {
				Accept: 'application/json',
			}
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		treeShake: process.env.APP_ENV !== 'development',
		lang: {
			current: 'cs'
		},
		theme: {
			themes: {
				light: {
					secondary: '#424242'
				},
				dark: {
					secondary: '#ffffff'
				}
			}
		}
	},
};

export default config;

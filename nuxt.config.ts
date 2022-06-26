import type { NuxtConfig } from '@nuxt/types';

require('dotenv').config({ path: '.env' });

const config: NuxtConfig = {
	ssr: false,

	target: 'static',

	build: {},

	buildModules: [
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify'
	],

	server: {
		port: process.env.PORT || 3000,
		host: process.env.HOST,
	},

	css: [],

	publicRuntimeConfig: {
		appEnv: process.env.APP_ENV,
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
		link: [
			{ rel: 'apple-touch-icon', sizes: '152x152', href: '../favicon/apple-touch-icon.png' },
			{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '../favicon/favicon-32x32.png' },
			{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '../favicon/favicon-16x16.png' },
			{ rel: 'manifest', href: '../favicon/site.webmanifest' },
			{ rel: 'mask-icon', href: '../favicon/safari-pinned-tab.svg', color: '#26262b' },
		]
	},

	loading: { color: '#0c64c1' },

	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
	],

	plugins: [
		'~/plugins/axios',
		'~/plugins/truncate',
		'~/plugins/nuxtHelpers',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: process.env.TENOR_BASE_URL,
		retry: {
			retries: 3
		},
		headers: {
			common: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		treeShake: process.env.APP_ENV !== 'development',
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

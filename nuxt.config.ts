import type { NuxtConfig } from '@nuxt/types'

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

	env: {},

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
				content: 'A boilerplate to start a Nuxt+TS project quickly'
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
}

export default config

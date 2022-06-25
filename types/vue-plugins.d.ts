import Vue from 'vue';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

// Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
	interface Vue {
		$axios: NuxtAxiosInstance;
	}
}

export type VForm = Vue & { validate: () => boolean };

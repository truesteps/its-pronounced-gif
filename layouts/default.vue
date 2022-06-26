<template>
	<v-app>
		<v-navigation-drawer v-model="isNavbarOpen" app>
			<v-divider />

			<v-list
				dense
				nav
			>
				<v-list-item
					v-for="item in items"
					:key="item.label"
					:to="item.to"
					:class="item.class"
					link
					nuxt
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>
							{{ item.label }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app>
			<v-app-bar-nav-icon class="hamburger-menu-button" @click="toggleNavbar" />

			<v-toolbar-title>
				<v-list-item class="logo" @click="$router.push('/')">
					<v-list-item-title>
						<div class="text-h6">
							It's pronounced /dʒɪf/
						</div>
					</v-list-item-title>
				</v-list-item>
			</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';

	interface MenuItem {
		label: string;
		icon: string;
		to: string;
		class: string;
	}

	export default Vue.extend({
		name: 'DefaultLayout',

		data() {
			return {
				isNavbarOpen: false as boolean,

				items: [
					{
						label: 'Trends',
						to: '/',
						icon: 'mdi-trending-up',
						class: 'link-to-trends',
					},
					{
						label: 'Search',
						to: '/search',
						icon: 'mdi-magnify',
						class: 'link-to-search',
					}
				] as MenuItem[]
			};
		},

		methods: {
			toggleNavbar(): void {
				this.isNavbarOpen = !this.isNavbarOpen;
			},
		},
	});
</script>

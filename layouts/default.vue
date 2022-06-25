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
					link
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
			<v-app-bar-nav-icon @click="toggleNavbar" />

			<v-toolbar-title @click="$router.push('/')">
				<div class="text-h6">
					It's pronounced /dʒɪf/
				</div>
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
						icon: 'mdi-trending-up'
					},
					{
						label: 'Search',
						to: '/search',
						icon: 'mdi-magnify'
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

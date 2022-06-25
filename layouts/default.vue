<template>
	<v-app>
		<v-navigation-drawer app permanent>
			<v-list-item @click="$router.push('/')">
				<v-list-item-content>
					<v-list-item-title class="text-h6 text-center">
						It's pronounced /dʒɪf/
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

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

		<v-main>
			<v-container fluid>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	export default {
		name: 'DefaultLayout',

		data() {
			return {
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
				] as {
					label: string
					icon: string
					to: string
				}[]
			};
		},
	};
</script>

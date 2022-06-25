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
		name: 'DefaultLayout'
	}
</script>

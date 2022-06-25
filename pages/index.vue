<template>
	<v-row>
		<v-col cols="12">
			<v-row>
				<v-col cols="12" class="text-center">
					<h2 class="text-left">
						Trending GIFs
					</h2>
				</v-col>
			</v-row>

			<v-row>
				<v-col
					v-for="loader in loaders"
					:key="loader"
					cols="12"
					sm="6"
					md="4"
					lg="3"
				>
					<v-skeleton-loader
						class="mx-auto"
						max-width="300"
						type="card"
						elevation="1"
					/>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'PageIndex',

		head: {
			title: 'Trends'
		},

		computed: {
			itemsPerRow(): number {
				if (this.$vuetify.breakpoint.xs) {
					return 1;
				}

				if (this.$vuetify.breakpoint.sm) {
					return 2;
				}

				if (this.$vuetify.breakpoint.md) {
					return 3;
				}

				return 4;
			},

			loaders(): number[] {
				return Array.apply(null, Array(this.itemsPerRow)).map((item, index) => index);
			}
		},

		methods: {
			async fetchTrendingGifs(): Promise<void> {

			},
		}
	});
</script>

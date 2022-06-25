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
				<v-col v-for="trendingGif in trendingGifs" :key="trendingGif.id" cols="12" sm="6" md="4" lg="3">
					<gif-card :gif="trendingGif" />
				</v-col>

				<v-col key="show-more-gifs" cols="12" sm="6" md="4" lg="3">
					<show-more-gifs @loadMore="load" />
				</v-col>
			</v-row>

			<v-row v-if="isLoading">
				<v-col v-for="loader in loaders" :key="loader" cols="12" sm="6" md="4" lg="3">
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
	import { mapActions, mapMutations, mapState } from 'vuex';

	import { ActionType, MutationType, Namespace as GifsStoreNamespace, GifsState } from '~/store/gifs';
	import GifCard from '~/components/GifCard.vue';
	import ShowMoreGifs from '~/components/ShowMoreGifs.vue';

	export default Vue.extend({
		name: 'PageIndex',

		components: {
			ShowMoreGifs,
			GifCard
		},

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
			},

			limit(): number {
				return (this.itemsPerRow * 3) - 1;
			},

			...mapState(GifsStoreNamespace, {
				trendingGifs: (state: GifsState) => state.trendingGifs,

				isLoading: (state: GifsState) => state.isLoading,
			})
		},

		created() {
			this.load();
		},

		beforeDestroy() {
			this.resetTrendingGifs();
		},

		methods: {
			async load(): Promise<void> {
				await this.fetchTrendingGifs({
					key: this.$config.tenorApiKey,
					client_key: this.$config.tenorClientKey,
					limit: this.trendingGifs.length < 1 ? this.limit : this.limit + 1,
				});
			},

			...mapActions(GifsStoreNamespace, {
				fetchTrendingGifs: ActionType.FETCH_TRENDING_GIFS,
			}),

			...mapMutations(GifsStoreNamespace, {
				resetTrendingGifs: MutationType.RESET_TRENDING_GIFS,
			}),
		}
	});
</script>

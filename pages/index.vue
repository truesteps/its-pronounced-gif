<template>
	<v-row>
		<v-col cols="12">
			<v-row>
				<v-col cols="12">
					<h2>
						Trending GIFs
					</h2>

					<span>
						Click on a GIF to copy its URL to your clipboard.
					</span>
				</v-col>
			</v-row>

			<v-row>
				<v-col v-for="trendingGif in trendingGifs" :key="trendingGif.id" cols="12" sm="6" md="4" lg="3">
					<gif-card :gif="trendingGif" />
				</v-col>

				<v-col v-if="!reachedEnd" key="show-more-gifs" cols="12" sm="6" md="4" lg="3">
					<load-more-gifs @loadMore="load" />
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
	import { mapActions, mapMutations, mapState } from 'vuex';

	import { ActionType, MutationType, Namespace as GifsStoreNamespace, GifsState } from '~/store/gifs';
	import GifCard from '~/components/GifCard.vue';
	import LoadMoreGifs from '~/components/LoadMoreGifs.vue';

	import GridMixin from '~/mixins/GridMixin.vue';

	export default GridMixin.extend({
		name: 'PageIndex',

		components: {
			LoadMoreGifs,
			GifCard
		},

		head: {
			title: 'Trends'
		},

		computed: {
			...mapState(GifsStoreNamespace, {
				trendingGifs: (state: GifsState) => state.trendingGifs,

				isLoading: (state: GifsState) => state.isLoading,

				reachedEnd: (state: GifsState) => state.reachedEnd,
			}),
		},

		created() {
			this.load();
		},

		beforeDestroy() {
			this.resetTrendingGifs();
		},

		methods: {
			async load(loadMoreEvent?: LoadMoreGifsEvent | undefined): Promise<void> {
				// if we're loading the first batch of gifs, subtract 1 from the limit to show the "load more" button
				let limit = this.trendingGifs.length < 1 ? this.limit : this.limit + 1;

				// if we're entering burning CORPSES WITH THE AMOUNT OF GIFS THAT CAME FROM THE UNDERWORLD mode
				// let's DOUBLE the limit, yes, you heard me, DOBULE IT!
				if (loadMoreEvent && loadMoreEvent.shouldLoadDouble) {
					limit *= 2;
				}

				await this.fetchTrendingGifs({
					key: this.$config.tenorApiKey,
					client_key: this.$config.tenorClientKey,
					limit,
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

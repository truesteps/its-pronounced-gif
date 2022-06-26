<template>
	<v-row>
		<v-col cols="12">
			<v-row>
				<v-col cols="12" class="text-center">
					<h2 class="text-left">
						Search GIFs
					</h2>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12">
					<v-text-field v-model="search" label="Type to search..." autofocus />
				</v-col>
			</v-row>

			<v-row v-if="hasValidSearchTerm && !isLoading">
				<v-col v-for="gif in gifs" :key="gif.id" cols="12" sm="6" md="4" lg="3">
					<gif-card :gif="gif" />
				</v-col>

				<v-col key="show-more-gifs" cols="12" sm="6" md="4" lg="3">
					<show-more-gifs @loadMore="load(false)" />
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
	import { debounce } from 'ts-debounce';

	import { ActionType, MutationType, Namespace as GifsStoreNamespace, GifsState } from '~/store/gifs';

	import GridMixin from '~/mixins/GridMixin.vue';
	import { mapActions, mapMutations, mapState } from 'vuex';
	import GifCard from '~/components/GifCard.vue';
	import ShowMoreGifs from '~/components/ShowMoreGifs.vue';

	export default GridMixin.extend({
		name: 'SearchPage',

		components: {
			ShowMoreGifs,
			GifCard
		},

		data() {
			return {
				search: '' as string,
				searchTermLengthThreshold: 3 as number,
				debounceTimeMs: 200 as number,
			};
		},

		computed: {
			hasValidSearchTerm(): boolean {
				return this.search.length >= this.searchTermLengthThreshold;
			},

			...mapState(GifsStoreNamespace, {
				gifs: (state: GifsState) => state.gifs,

				isLoading: (state: GifsState) => state.isLoading,
			})
		},

		head: {
			title: 'Search',
		},

		watch: {
			search: {
				handler(newValue: string, oldValue: string) {
					// if the search query didn't change, we skip handler
					if (newValue === oldValue) {
						return;
					}

					// in case the search term is too short, we clear the URL query and skip handler
					if (newValue.length < this.searchTermLengthThreshold) {
						this.$router.push({
							query: {
								search: undefined,
							},
						});

						return;
					}

					// in case all validation passes, we update the URL and fetch gifs
					this.$router.push({
						query: { search: newValue },
					});

					this.load(true);
				},
				immediate: true,
			},
		},

		created() {
			if (this.$route.query.search) {
				this.search = this.$route.query.search as string;
			}
		},

		beforeDestroy() {
			this.resetGifs();
		},

		methods: {
			async load(resetGifs: boolean = false) {
				// do something in the future

				if (resetGifs) {
					this.resetGifs();
				}

				await this.fetchGifs({
					key: this.$config.tenorApiKey,
					client_key: this.$config.tenorClientKey,
					// if we're loading the first batch of gifs, subtract 1 from the limit to show the "load more" button
					limit: this.gifs.length < 1 ? this.limit : this.limit + 1,
					q: this.search,
				});

				// ToDo: reset gifs before new query if searchTerm changed
				// ToDo: perform search with new searchTerm
				// ToDo: merge common functionality from index page and search page into a mixin
			},

			...mapActions(GifsStoreNamespace, {
				fetchGifs: ActionType.FETCH_GIFS,
			}),

			...mapMutations(GifsStoreNamespace, {
				resetGifs: MutationType.RESET_GIFS,
			}),

			//debouncedFetchGifs: debounce(this.fetchGifs, this.debounceTimeMs),
		}
	});
</script>

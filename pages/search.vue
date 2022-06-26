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

			<v-row v-if="hasValidSearchTerm">
				<v-col v-for="gif in gifs" :key="gif.id" cols="12" sm="6" md="4" lg="3">
					<gif-card :gif="gif" />
				</v-col>

				<v-col v-if="!isLoading" key="show-more-gifs" cols="12" sm="6" md="4" lg="3">
					<show-more-gifs @loadMore="load(false)" />
				</v-col>
			</v-row>

			<v-row v-else>
				<v-col cols="12">
					<v-img height="200" contain :src="typingGifs[typingGifsRandomizer]">
						<template #placeholder>
							<v-row
								class="fill-height ma-0"
								align="center"
								justify="center"
							>
								<v-progress-circular indeterminate color="grey" />
							</v-row>
						</template>
					</v-img>
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

	const debounceTimeMs: number = 200;

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
				typingGifs: [
					'https://c.tenor.com/KkerOljBwakAAAAd/computer-nerd.gif',
					'https://c.tenor.com/bCfpwMjfAi0AAAAC/cat-typing.gif',
					'https://c.tenor.com/z4_HKSF6Nx8AAAAC/typing-jim-carrey.gif',
					'https://c.tenor.com/M8NOboaCB2MAAAAC/peter-griffin-nails.gif',
					'https://c.tenor.com/JJ_is357rXYAAAAd/spike-monkey-typing.gif',
					'https://c.tenor.com/VrzXhtoSwcsAAAAd/hacker-typing.gif',
					'https://c.tenor.com/jCk8c5_Q4J0AAAAC/hacker.gif',
					'https://c.tenor.com/W93VsNUYX6MAAAAd/sa-tis-c.gif',
				] as string[],
				typingGifsRandomizer: 0 as number,
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

					this.loadWithDebounce(true);
				},
				immediate: true,
			},
		},

		created() {
			this.typingGifsRandomizer = this.$helpers.getRandomInt(0, this.typingGifs.length - 1);

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
			},

			loadWithDebounce: debounce(function (this: any, resetGifs: boolean = false) {
				this.load(resetGifs);
			}, debounceTimeMs),

			...mapActions(GifsStoreNamespace, {
				fetchGifs: ActionType.FETCH_GIFS,
			}),

			...mapMutations(GifsStoreNamespace, {
				resetGifs: MutationType.RESET_GIFS,
			}),
		}
	});
</script>

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
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { debounce } from 'ts-debounce';

	export default Vue.extend({
		name: 'SearchPage',

		data() {
			return {
				search: '' as string,
				searchTermLengthThreshold: 3 as number,
				debounceTimeMs: 200 as number,
			};
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

					this.fetchGifs();
				},
				immediate: true,
			},
		},

		created() {
			if (this.$route.query.search) {
				this.search = this.$route.query.search as string;
			}
		},

		methods: {
			fetchGifs() {
				// do something in the future

				// ToDo: reset gifs before new query if searchTerm changed
				// ToDo: perform search with new searchTerm
				// ToDo: merge common functionality from index page and search page into a mixin
			},

			//debouncedFetchGifs: debounce(this.fetchGifs, this.debounceTimeMs),
		}
	});
</script>

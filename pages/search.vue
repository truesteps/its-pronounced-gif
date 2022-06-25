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
					if (newValue === oldValue) {
						return;
					}

					if (newValue.length < this.searchTermLengthThreshold) {
						// clear route query
						this.$router.push({
							query: {
								search: undefined,
							},
						});

						return;
					}

					// set route query
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
			},

			// @ts-ignore
			debouncedFetchGifs: debounce(this.fetchGifs, this.debounceTimeMs),
		}
	});
</script>

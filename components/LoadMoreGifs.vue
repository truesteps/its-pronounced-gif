<template>
	<v-card
		min-height="254"
		class="h-100 load-more-gifs"
		:elevation="elevation"
		@click="loadMoreGifs"
		@mouseenter="setIsHovering(true)"
		@mouseleave="setIsHovering(false)"
	>
		<v-card-text class="h-100" :style="computedStyle">
			<v-row
				class="fill-height ma-0"
				align="center"
				justify="center"
			>
				<div class="load-text text-h6">
					<v-icon
						x-large
						:color="isOverBurningClicksThreshold ? 'white' : 'gray'"
					>
						mdi-plus
					</v-icon>

					<br />

					<span :class="{'white--text': isOverBurningClicksThreshold}">
						{{ label }}
					</span>
				</div>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
	import GifCardMixin from '~/mixins/GifCardMixin.vue';

	export default GifCardMixin.extend({
		name: 'LoadMoreGifs',

		data() {
			return {
				clicksCount: 0 as number,
				burningClicksThreshold: 2 as number,
				burningImageSrc: 'https://c.tenor.com/Pd0Kna5m45cAAAAC/skeleton-burning.gif' as string,
			};
		},

		computed: {
			isOverBurningClicksThreshold(): boolean {
				return this.clicksCount > this.burningClicksThreshold;
			},

			label(): string {
				return this.isOverBurningClicksThreshold ? 'Load MORE FUCKING GIFs' : 'Load more GIFs';
			},

			computedStyle(): string {
				if (!this.isOverBurningClicksThreshold) {
					return '';
				}

				return `background-image: url('${this.burningImageSrc}'); background-position: cover`;
			},
		},

		methods: {
			loadMoreGifs(): void {
				this.clicksCount++;

				this.$emit('loadMore', {
					shouldLoadDouble: this.isOverBurningClicksThreshold,
				});
			},
		},
	});
</script>

<style lang="scss" scoped>
	.h-100 {
		height: 100%;
	}

	.load-text {
		display: block;
		width: 100%;
		text-align: center;
	}
</style>

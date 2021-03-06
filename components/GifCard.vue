<template>
	<v-card
		class="gif-card "
		:disabled="isOverlayVisible"
		:elevation="elevation"
		:data-test-url="gif.url"
		@click="copyToClipboard"
		@mouseenter="setIsHovering(true)"
		@mouseleave="setIsHovering(false)"
	>
		<v-img height="200px" class="grey darken-4" contain :src="gif.media_formats.gif.url">
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

		<v-card-text>
			{{ $truncate(gif.content_description) }}
		</v-card-text>

		<v-overlay v-model="isOverlayVisible" absolute dark opacity="1" class="darker-overlay">
			<div class="text-center">
				<v-icon color="green" large>mdi-check</v-icon>
			</div>

			<br />

			URL copied to clipboard
		</v-overlay>
	</v-card>
</template>

<script lang="ts">
	import { PropType } from 'vue';

	import GifCardMixin from '~/mixins/GifCardMixin.vue';

	import { Gif } from '~/types/gifs';

	export default GifCardMixin.extend({
		name: 'GifCard',

		props: {
			gif: { type: Object as PropType<Gif>, required: true },
		},

		data() {
			return {
				isOverlayVisible: false as boolean,

				overlayTimeout: 2000 as number,
			};
		},

		methods: {
			async copyToClipboard(): Promise<void> {
				if (this.isOverlayVisible) {
					return;
				}

				this.isOverlayVisible = true;

				setTimeout(() => {
					this.isOverlayVisible = false;
				}, this.overlayTimeout);

				await this.$helpers.copyToClipboard(this.gif.url);
			},
		},
	});
</script>

<style lang="scss" scoped>
	.darker-overlay.v-overlay--active {
		opacity: 0.9;
	}
</style>

<template>
	<v-card>
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
	</v-card>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
	import { Gif } from '~/types/gifs';

	export default Vue.extend({
		name: 'GifCard',

		props: {
			gif: { type: Object as PropType<Gif>, required: true },
		},
	});
</script>

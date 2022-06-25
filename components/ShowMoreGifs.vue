<template>
	<v-card class="h-100" @click="$emit('loadMore')">
		<v-card-text class="h-100">
			<v-row
				class="fill-height ma-0"
				align="center"
				justify="center"
			>
				<div class="load-text text-h6">
					<v-icon x-large>mdi-plus</v-icon>

					<br />

					Load more GIFs
				</div>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'ShowMoreGifs',
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

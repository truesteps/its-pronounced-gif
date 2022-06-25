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
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'SearchPage',

		head: {
			title: 'Search',
		}
	});
</script>

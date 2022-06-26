<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'GridMixin',

		data() {
			return {
				numberOfRows: 4 as number,
			};
		},

		computed: {
			itemsPerRow(): number {
				if (this.$vuetify.breakpoint.xs) {
					return 1;
				}

				if (this.$vuetify.breakpoint.sm) {
					return 2;
				}

				if (this.$vuetify.breakpoint.md) {
					return 3;
				}

				return 4;
			},

			limit(): number {
				return (this.itemsPerRow * this.numberOfRows) - 1;
			},

			loaders(): number[] {
				return this.generateArrayOfLength(this.limit);
			},
		},

		methods: {
			// generate an array at a length of supplied argument
			generateArrayOfLength(length: number): number[] {
				return Array.apply(null, Array(length)).map((item, index: number) => index);
			},
		},
	});
</script>

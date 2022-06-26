<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'GifCardMixin',

		data() {
			return {
				isHovering: false as boolean,
			};
		},

		computed: {
			elevation(): number {
				return this.isHovering ? 12 : 2;
			},
		},

		methods: {
			setIsHovering(isHovering: boolean): void {
				this.isHovering = isHovering;
			}
		},
	});
</script>

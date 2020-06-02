<template>
	<poplist class="omni-button button">
		<template slot="fuze">{{currentButton}}<i class="icon-downArrow"></i></template>
		<itemlist>
			<li v-for="(button, key) in buttonlist" @click="handleClick(key, button)">{{ button }}</li>
		</itemlist>
	</poplist>
</template>
<script>
	export default {
		name: 'omniButton',
		props: {
			buttonlist: {
				type: Array
			},
			currentButton: {
				type: String
			}
		},
		data() {
			return {
				index: 0,
			}
		},
		methods: {
			handleClick(key, button) {
				this.index = key
				this.currentButton = button
				this.buttonlist.remove(button)
				var auxButton = this.buttonlist.unshift(button);
			}
		},
        mounted() {
        	if (!this.currentButton) this.currentButton = this.buttonlist[0]
        }

	}
</script>
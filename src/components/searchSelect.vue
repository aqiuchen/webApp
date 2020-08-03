<template>
	<div class="searchSelect-box">
		<div class="searchSelect">
			<ul v-show="isList" ref="searchSelect" :style="{ marginTop: -offsetHeight + 'px' }">
				<li v-for="(item, index) in selects" :key="index" @click="liClick(item)">{{ item }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {
			offsetHeight: 0
		};
	},
	mounted() {},
	computed: {
		...mapState({
			selects: state => state.searchSelect.selects,
			isList: state => state.searchSelect.isList
		})
	},
	methods: {
		liClick(item) {
			this.$store.commit('getClickVal', item);
			console.log(this.$store.state.searchSelect.inputVal);
		}
	},
	watch: {
		selects() {
			this.$nextTick(() => {
				let searchSelect = this.$refs.searchSelect;
				let offsetHeight = searchSelect.offsetHeight;
				console.log(offsetHeight);
				if (offsetHeight != 0) {
					let to = setInterval(() => {
						offsetHeight--;
						this.offsetHeight = offsetHeight;
						if (offsetHeight <= 0) {
							clearInterval(to);
						}
					}, 1);
				}
			});
		}
	}
};
</script>

<style>
.searchSelect-box{
	position: absolute;
	width: 100% !important;
	border: none !important;
	padding: 0 !important;
}
.searchSelect {
	top: 0;
	left: 0;
	width: 90% !important;
	padding: 0 5% !important;
	max-height: 3.2rem !important;
	min-height: 0 !important;
	overflow: hidden;
	border: none !important;
}
.searchSelect ul {
	max-height: 3.2rem;
	min-height: 0;
	box-shadow: 0 0 0.1rem #999999;
	-moz-box-shadow: 0 0 0.1rem #999999;
	-moz-box-shadow: 0 0 0.1rem #999999;
	border-bottom: 0.04rem solid #dddddf;
	overflow-y: auto !important;
	/* animation: drsSelectOpen 0.5s linear; */
	/* -webkit-animation: drsSelectOpen 0.5s linear; */
}
.searchSelect li {
	height: 0.8rem;
	line-height: 0.8rem;
	/* border-bottom: 0.02rem solid #f4f4f7; */
	font-size: 0.28rem;
	background-color: white;
	text-align: center;
}
@keyframes drsSelectOpen {
	from {
		margin-top: -3.2rem;
	}
	to {
		margin-top: 0;
	}
}
</style>

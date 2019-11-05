<template>
	<div>
		<h1>Операционные дни</h1>

		<Views	:items="getOperDaysAll"/> 

		<router-view></router-view>

	</div>
</template>
<script>
import Views from '../components/opdays/Views.vue';
import { createNamespacedHelpers } from 'vuex'
const {mapGetters} = createNamespacedHelpers('mOperDays');

export default{
	name: 'Opdays',
	components:{ Views},
	data(){
		return {

		};
	},
	computed:{
		...mapGetters([
			'getOperDaysAll'
			]),

	},
	methods:{

	},
	created(){

	}
};
</script>

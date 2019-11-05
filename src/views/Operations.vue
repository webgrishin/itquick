<template>
	<div>
		<h1>Операции</h1>

		<Views	:items="getOperationsAll"/> 

		<router-view></router-view>
	</div>
</template>
<script>
import Views from '../components/operations/Views.vue';
import { createNamespacedHelpers } from 'vuex'
const {mapGetters} = createNamespacedHelpers('mOperations');

export default{
	name: 'Operations',
	components:{ Views },
	data(){
		return {

		};
	},
	computed:{
		...mapGetters([
			'getOperationsAll'
			]),

	},
	
	methods:{},
};
</script>
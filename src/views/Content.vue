<template>
	<div>
		<div class="row">
			<div class="col-sm-2">
				<VNavbar/>
			</div>
			<div class="col-sm">
				<div>
					<template v-if="error.message">
						<transition name="fade">
							<div class="alert alert-danger alert-dismissible">
								<button type="button" class="close" @click="hide">
									<span>&times;</span>
								</button>
								<div v-for="(message, key) in error" v-if="error.message">
									<strong>{{key}}:</strong> {{ message }}
								</div>

							</div>
						</transition>
					</template>


					<router-view class="page-content"></router-view>

				</div>
			</div>

		</div>
	</div>
	
</template>

<script>
import VNavbar from './VNavbar.vue';
export default {
	name: 'contents',
	components:{VNavbar},
	computed:{
		error(){
			return this.$store.getters.error;
		},
	},
	methods:{
		hide(e){
			this.$store.commit('clearError');
		},
	},
};
</script>
<style>
.page-content {
  width: calc(100% - 17rem);
  margin-left: 10rem;
  /*transition: all 0.4s;*/
}
</style>

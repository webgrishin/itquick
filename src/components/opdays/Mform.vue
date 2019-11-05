<template>

	<b-modal
	id="bv-modal-form"
	@show="resetModal"
	@ok="saveModal"
	:title="item.title"

	>

	<form @submit.stop.prevent="handleSubmit">

	<b-form-group
		label="Дата"
		label-for="date-input"
		:invalid-feedback="invalidDate"
		:valid-feedback="validDate"
		:state="stateDate"
	>
		<b-form-input
		id="date-input"
		type="date"
		v-model="item.OpDate"
		:state="stateDate"
		required
		></b-form-input>
	</b-form-group>

</form>

</b-modal>



</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const {mapGetters, mapActions}  = createNamespacedHelpers('mOperDays');
export default{
	name:'ModalForm',
	props:{
		item:{
			title:String,
			OpDate:String,
		}
	},
	data(){
		return{
			saveOpDate:'',

		};
	},
	computed:{
		...mapGetters(['getAcctBalancesById']),
		stateDate() {
			return this.item.OpDate ? true : false
		},
		invalidDate() {
			return 'Введите дату';
		},
		validDate() {
			return this.stateDate === true ? 'Спасибо' : '';
		},

		
	},
	methods:{
		...mapActions(['saveRowOperDays']),

		resetModal(){
			/*if (this.id){
				this.item = {...this.getAcctBalancesById(this.id)};
			}else{
				this.item.id = '';
				this.item.AcctNum = '';
				this.item.Balance = '';
				this.item.OpDate = '';
			}*/

			this.saveOpDate = this.item.OpDate;

		},
		saveModal(){
			this.saveRowOperDays({oldDate:this.saveOpDate, newDate:this.item.OpDate});

			if (this.$route.params.opDay == this.saveOpDate && this.saveOpDate != this.item.OpDate)
				this.$router.push({ name: 'opdays'});
		}

	},
};

</script>
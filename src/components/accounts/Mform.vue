<template>

	<b-modal
	id="bv-modal-form"
	@show="resetModal"
	@ok="saveModal"
	:title="title"

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

	<b-form-group
		label="Номер счёта"
		label-for="acctNum-input"
		:invalid-feedback="invalidAcctNum"
		:valid-feedback="validAcctNum"
		:state="stateAcctNum"
	>
		<b-form-input
		id="acctNum-input"
		v-model="item.AcctNum"
		:state="stateAcctNum"
		trim
		required
		></b-form-input>
	</b-form-group>

	<b-form-group
		label="Баланс"
		label-for="balance-input"
		:invalid-feedback="invalidBalance"
		:valid-feedback="validBalance"
		:state="stateBalance"
	>
		<b-form-input
		id="balance-input"
		v-model="item.Balance"
		:state="stateBalance"
		required
		></b-form-input>
	</b-form-group>
</form>

</b-modal>



</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const {mapGetters, mapActions}  = createNamespacedHelpers('mAcctBalances');
export default{
	name:'ModalForm',
	props:{
		title:String,
		id:Number,
	},
	data(){
		return{
			saveAcctNum:'',

			item:{
				id:'',
				AcctNum:'',
				Balance:'',
				OpDate:''
			}
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
			return this.stateDate=== true ? 'Спасибо' : '';
		},

		stateAcctNum() {
			return /^\d{20}$/.test(this.item.AcctNum);
		},
		invalidAcctNum() {
			return 'Должно быть 20 цифр';
		},
		validAcctNum() {
			return this.stateAcctNum === true ? 'Спасибо' : '';
		},


		stateBalance() {
			return /^-?\d+(\.\d+)?$/.test(this.item.Balance);
		},
		invalidBalance() {
			return 'Должно быть оложительное или отрицательное число';
		},
		validBalance() {
			return this.stateBalance === true ? 'Спасибо' : '';
		}
	},
	methods:{
		...mapActions(['saveRowAcctBalances']),

		resetModal(){
			if (this.id){
				this.item = {...this.getAcctBalancesById(this.id)};
			}else{
				this.item.id = '';
				this.item.AcctNum = '';
				this.item.Balance = '';
				this.item.OpDate = '';
			}

			this.saveAcctNum = this.item.AcctNum;

		},
		saveModal(){
			this.saveRowAcctBalances(this.item);

			if (this.$route.params.acctNum == this.saveAcctNum && this.saveAcctNum != this.item.AcctNum)
				this.$router.push({ name: 'accounts'});
		}

	},
};

</script>
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
		label="Cчёт дебета"
		label-for="acctNumDB"
		:invalid-feedback="invalidAcctNumDB"
		:valid-feedback="validAcctNumDB"
		:state="stateAcctNumDB"
	>
		<b-form-input
		id="acctNumDB"
		v-model="item.AcctNumDB"
		:state="stateAcctNumDB"
		trim
		required
		></b-form-input>
	</b-form-group>
	<b-form-group
		label="Cчёт кредита"
		label-for="acctNumCr"
		:invalid-feedback="invalidAcctNumCr"
		:valid-feedback="validAcctNumCr"
		:state="stateAcctNumCr"
	>
		<b-form-input
		id="acctNumCr"
		v-model="item.AcctNumCr"
		:state="stateAcctNumCr"
		trim
		required
		></b-form-input>
	</b-form-group>

	<b-form-group
		label="Сумма"
		label-for="balance-input"
		:invalid-feedback="invalidAmount"
		:valid-feedback="validAmount"
		:state="stateAmount"
	>
		<b-form-input
		id="balance-input"
		v-model="item.Amount"
		:state="stateAmount"
		required
		></b-form-input>
	</b-form-group>
</form>

</b-modal>



</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const {mapActions}  = createNamespacedHelpers('mOperations');
export default{
	name:'ModalForm',
	props:{
			title:'',
			item:{
				id: {
					type: Number,
					default: 0,
				},
				OpDate:{
					type: String,
					default: '',
				},
				AcctNumDB:{
					type: String,
					default: '',
				},
				AcctNumCr:{
					type: String,
					default: '',
				},
				Amount:{
					type: Number,
					default: 0,
				},
			}
	},
	data(){
		return{
			saveAcctNum:'',
		};
	},
	computed:{
		stateDate() {
			return this.item.OpDate ? true : false
		},
		invalidDate() {
			return 'Введите дату';
		},
		validDate() {
			return this.stateDate=== true ? 'Спасибо' : '';
		},

		stateAcctNumDB() {
			return /^\d{20}$/.test(this.item.AcctNumDB);
		},
		invalidAcctNumDB() {
			return 'Должно быть 20 цифр';
		},
		validAcctNumDB() {
			return this.stateAcctNumDB === true ? 'Спасибо' : '';
		},
		stateAcctNumCr(val) {
			return /^\d{20}$/.test(this.item.AcctNumCr);
		},
		invalidAcctNumCr() {
			return 'Должно быть 20 цифр';
		},
		validAcctNumCr() {
			return this.stateAcctNumCr === true ? 'Спасибо' : '';
		},


		stateAmount() {
			return /^-?\d+(\.\d+)?$/.test(this.item.Amount);
		},
		invalidAmount() {
			return 'Должно быть оложительное или отрицательное число';
		},
		validAmount() {
			return this.stateAmount === true ? 'Спасибо' : '';
		}
	},
	methods:{
		...mapActions(['saveRowOperations']),

		resetModal(){
			this.saveAcctNum = this.item.AcctNumDB;
		},
		saveModal(){
			this.saveRowOperations(this.item);

			if (this.$route.params.acctNumDB == this.saveAcctNum && this.saveAcctNum != this.item.AcctNumDB)
				this.$router.push({ name: 'operations'});
		}

	},
};

</script>
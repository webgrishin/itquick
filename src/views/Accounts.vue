<template>
	<div>
		<h1>Счета с остатками на дату</h1>

		<div class="form-group row">
			<label for="inputDate" class="col-sm-3 col-form-label">Выберите дату</label>
			<div class="col-sm-3">
				<input type="date" class="form-control" id="inputDate" name="date" v-model="cDate" @input="changeDate">
			</div>
		</div>


		<Views	:items="accounts" @deleteRow="deleteRow"/>


		<router-view></router-view>

	</div>
</template>
<script>
import Views from '../components/accounts/Views.vue';

import { createNamespacedHelpers } from 'vuex';

const {mapGetters, mapActions}  = createNamespacedHelpers('mAcctBalances');
//import {mapGetters, mapActions} from 'vuex';

export default{
	name: 'Accounts',
	components:{ Views},
	data(){
		return {
			cDate:'',
			acctFlag:0,
		};
	},
	computed:{
		...mapGetters([
			'getLastOpDate',
			'getAcctBalancesByDate'
			]),
		accounts(){
			this.acctFlag;
			return this.getAcctBalancesByDate(this.cDate);
		}
	},
	methods:{
		...mapActions(['deleteRowAcctBalances']),

		deleteRow(item){
			this.deleteRowAcctBalances(item.id)
			.then((res)=>{
				if (res){
					this.acctFlag = !this.acctFlag;

					if (this.$route.params.acctNum == item.AcctNum)
						this.$router.push({ name: 'accounts'});

				}
			});
		},
		setLastOpDate(){
			this.cDate = this.getLastOpDate;	
		},
		changeDate(){
			// if (!this.cDate)
				//this.setLastOpDate();
				
			if (this.$route.params.acctNum){
				this.$router.push({ name: 'accounts'});
			}
		}
	},
	created(){
		this.setLastOpDate();
	}
};
</script>

<template>
	<div class="overflow-auto mt-3 card">
		<div class="card-header">

        <b-table
        
        id="my-table"
        :items="acctBalances"
        :fields="fields"
        small
        left
        >
    </b-table>
</div>
</div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const {mapGetters} = createNamespacedHelpers('mOperations');

export default{
	name: 'TransactionsAcct',
	props: {
		acctNumDB: String,
	},
	data(){
		return {
			fields: [
		        {
		          key:'AcctNum',
		          label: 'Номер счёта',
		          sortable: true,
		        },
		        {
		          key: 'Balance',
		          label: 'Остаток',
		          sortable: true,
		        },
		      ],
		};
	},
	computed:{
		...mapGetters(['getAcctBalancesByAccountOnDate']),
		acctBalances(){
			if (this.$route.query.date){
			return [
				this.getAcctBalancesByAccountOnDate(this.acctNumDB, this.$route.query.date),
				this.getAcctBalancesByAccountOnDate(this.$route.query.AcctNumCr, this.$route.query.date)
			];
			}
			return [];
		}

	},
	methods:{},
};
</script>
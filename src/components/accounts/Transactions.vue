<template>
	<div class="overflow-auto mt-3 card">
		<div class="card-header">
      <!-- <b-pagination
        v-model="currentPage"
        :total-rows="items.length"
        :per-page="perPage"
        aria-controls="my-table"
        ></b-pagination> -->

        <b-table
        
        id="my-table"
        :items="transactions"
        :fields="fields"
        small
        left
        >
        <template v-slot:cell(index)="data" :cp="currentPage">
        	{{data.index+1}}
        </template>
    </b-table>
</div>
</div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const {mapGetters}  = createNamespacedHelpers('mAcctBalances');

export default{
	name: 'TransactionsAcct',
	props: {
		acctNum: String
	},
	//components:{},
	data(){
		return {
			fields: [
		        {
		          key:'index',
		          label:'#',
		        },
		        {
		          key:'AcctNumCr',
		          label: 'Счет кредита',
		          sortable: true,
		        },
		        {
		          key:'AcctNumDB',
		          label: 'Счет дебета',
		          sortable: true,
		        },
		        {
		          key: 'Amount',
		          label: 'Сумма',
		          sortable: true,
		        },
		        ,
		        {
		          key: 'OpDate',
		          label: 'Дата',
		          
		        },
		      ],
		};
	},
	computed:{
		...mapGetters(['getTransactionsByAccount']),
		transactions(){
			return this.getTransactionsByAccount(this.acctNum);
		}

	},
	methods:{},
};
</script>
<template>
	<div class="overflow-auto mt-3 card">
		<div class="card-header">

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
import { createNamespacedHelpers } from 'vuex'
const {mapGetters}  = createNamespacedHelpers('mOperDays');

export default{
	name: 'TransactionsAcct',
	props: {
		opDay: String
	},
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
		      ],
		};
	},
	computed:{
		...mapGetters(['getTransactionsByDate']),
		transactions(){
			return this.getTransactionsByDate(this.opDay);
		}

	},
	methods:{},
};
</script>
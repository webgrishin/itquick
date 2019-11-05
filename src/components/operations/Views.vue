<template>
  <div class="overflow-auto">

        <b-button size="sm" variant="primary" @click="addRow()" class="mb-2">
            Добавить запись
        </b-button>

        <b-table
        id="my-table"
        :items="items"
        :fields="fields"
        small
        left
        >

        <template v-slot:cell(index)="data">
          {{data.index +1 }}
        </template>

        <template v-slot:cell(AcctNumDB)="data">
          <router-link :to="{ name: 'transOp', params: { acctNumDB: data.value }, query: { AcctNumCr:data.item.AcctNumCr, date: data.item.OpDate }}">{{data.value}}</router-link>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button size="sm" class="mr-1" variant="success" @click="changeRow(row.item)">
            Изменить
          </b-button>
          <b-button size="sm" @click="deleteRow(row.item)">
            Удалить
          </b-button>
        </template>

      </b-table>

      <modal-form :title="mform.title" :item="mform.item"/>
    </div>
  </template>

  <script>
  import { createNamespacedHelpers } from 'vuex'
  const {mapActions}  = createNamespacedHelpers('mOperations');
  import ModalForm from './Mform.vue';


  export default {
    name: 'views',
    components:{ ModalForm },
    props: {
      items: Array,
    },
    data() {
      return {
        
        mform:{
          title:'',
          item:{},
        },

        fields: [
          {
            key:'index',
            label:'#',
          },
          {
            key:'OpDate',
            label: 'Дата операционного дня',
            sortable: true,
          },
          {
            key:'AcctNumDB',
            label: 'Счёт дебита',
            sortable: true,
          },
          {
            key:'AcctNumCr',
            label: 'Cчёт кредита',
            sortable: true,
          },
          {
            key:'Amount',
            label: 'Сумма',
            sortable: true,
          },
          
          
          { key: 'actions', label: 'Действия' }
          
        ],
      }
    },
    methods:{
      ...mapActions(['deleteRowOperations']),

      deleteRow(item){
        this.deleteRowOperations(item.id)
        .then((res)=>{
          if (res){
            if (this.$route.params.acctNumDB == item.AcctNumDB)
              this.$router.push({ name: 'operations'});
          }
        });
      },
      addRow(){
        this.mform.title = "Добавить запись"
        this.mform.item = {};
        this.$nextTick(() => {
          this.$bvModal.show('bv-modal-form');
        });
      },
      changeRow(item){
        this.mform.title = "Изменить запись"
        this.mform.item = item;
        this.$nextTick(() => {
          this.$bvModal.show('bv-modal-form');
        });
      },
  
    },
  };
  </script>


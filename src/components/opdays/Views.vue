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

        <template v-slot:cell(index)="data" :cp="currentPage">
          {{data.index +1 }}
        </template>

        <template v-slot:cell(OpDate)="data">
          <router-link :to="{ name: 'transOpDays', params: { opDay: data.value }}">{{data.value}}</router-link>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button size="sm" class="mr-1" variant="success" @click="changeRow(row.item.OpDate)">
            Изменить
          </b-button>
          <b-button size="sm" @click="deleteRow(row.item.OpDate)">
            Удалить
          </b-button>
        </template>

      </b-table>

      <modal-form :item="mform"/>
    </div>
  </template>

  <script>
  import { createNamespacedHelpers } from 'vuex'
  const {mapActions}  = createNamespacedHelpers('mOperDays');
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
          OpDate:'',
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
          { key: 'actions', label: 'Действия' }
          
        ],
      }
    },
    methods:{
          ...mapActions(['deleteRowOperDays']),

    deleteRow(date){
      
      this.deleteRowOperDays(date)
      .then((res)=>{
        if (res){
          if (this.$route.params.opDay == date)
            this.$router.push({ name: 'opdays'});
        }
      });
    },
      addRow(){
        this.mform.title = "Добавить запись"
        this.mform.OpDate = '';
        this.$nextTick(() => {
          this.$bvModal.show('bv-modal-form');
        });
      },
      changeRow(date){
        this.mform.title = "Изменить запись"
        this.mform.OpDate = date;
        this.$nextTick(() => {
          this.$bvModal.show('bv-modal-form');
        });
      },
  
    },
  };
  </script>


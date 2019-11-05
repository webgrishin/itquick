<template>
  <div class="overflow-auto">
      <!-- <b-pagination
        v-model="currentPage"
        :total-rows="items.length"
        :per-page="perPage"
        aria-controls="my-table"
        ></b-pagination> -->

        <b-button size="sm" variant="primary" @click="addRow()" class="mb-2">
            Добавить запись
        </b-button>

        <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        small
        left
        >

        <template v-slot:cell(index)="data" :cp="currentPage">
          {{(currentPage-1)*perPage + data.index +1 }}
        </template>

        <template v-slot:cell(AcctNum)="data">
          <router-link :to="{ name: 'accountTransactions', params: { acctNum: data.value }}">{{data.value}}</router-link>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button size="sm" class="mr-1" variant="success" @click="changeRow(row.item.id)">
            Изменить
          </b-button>
          <b-button size="sm" @click="deleteRow(row.item)">
            Удалить
          </b-button>
        </template>

      </b-table>

      <modal-form :title="mform.title" :id="mform.id"/>
    </div>
  </template>

  <script>
  import ModalForm from './Mform.vue';

  export default {
    name: 'views',
    components:{ ModalForm },
    props: {
      items: Array,
    },
    data() {
      return {
        perPage: 5,
        currentPage: 1,
        mform:{
          title:'',
          id:0,
        },

        fields: [
          {
            key:'index',
            label:'#',
          },
          {
            key:'AcctNum',
            label: 'Номер счета',
            sortable: true,
          },
          {
            key: 'Balance',
            label: 'Остаток',
            sortable: true,
          },
          { key: 'actions', label: 'Действия' }
        ],
      }
    },
    methods:{
      addRow(){
        this.mform.title = "Добавить запись"
        this.mform.id = 0;
        this.$nextTick(() => {
          this.$bvModal.show('bv-modal-form');
        });
      },
      changeRow(id){
        this.mform.title = "Изменить запись"
        this.mform.id = id;
        this.$nextTick(() => {
          this.$bvModal.show('bv-modal-form');
        });
      },
    
      deleteRow(id){
        this.$emit('deleteRow', id);
      },

    },
  };
  </script>


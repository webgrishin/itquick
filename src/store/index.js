import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import {accounts, acctBalances, operDays, transactions} from './db';
import mAcctBalances from './acctBalancesStore';
//mAcctBalances.state.acctBalances = acctBalances;

import mOperDays from './operDaysStore';
//mOperDays.state.operDays = operDays;

import mOperations from './operationsStore';
//mOperations.state.transactions = transactions;


export default new Vuex.Store({
	state: {
		accounts:[],

  	error:{
  		name:'',
  		message:'',
  		stack:'',
  	},
  },
  mutations: {
  	
  	setError(state, e){
  		state.error.name = e.name;
  		state.error.message = e.message;
  		state.error.stack = e.stack;
  	},
  	clearError(state){
  		state.error.name = '';
  		state.error.message = '';
  		state.error.stack = '';
  	},
    addRowAccounts(state, newItem){
      if( !state.accounts.filter(item => item.AcctNum == newItem.AcctNum )[0] )
        state.accounts.push({AcctNum: newItem.AcctNum});
    },
    fetchAllData(state){
      state.accounts = accounts;
      state.mAcctBalances.acctBalances = acctBalances;
      state.mOperDays.operDays = operDays;
      state.mOperations.transactions = transactions;
    }
  },

  actions: {
    fetchAllData({commit}){
      commit('fetchAllData');
    }
  },
  getters: {
  	error(state){
  		return state.error;
  	}
  },
  modules: {
    mAcctBalances,
    mOperDays,
    mOperations,
  }
})

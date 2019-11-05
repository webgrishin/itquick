
export default{
  namespaced: true,

	state: {
    transactions:[],
  },

  mutations: {
    deleteRowOperations(state, i){
      state.transactions.splice(i, 1);
    },
    updateRowOperations(state, newItem){
      for (let i = 0; i<state.transactions.length; i++) {
        if (state.transactions[i].id == newItem.id){
          state.transactions[i].AcctNumDB = newItem.AcctNumDB;
          state.transactions[i].AcctNumCr = newItem.AcctNumCr;
          state.transactions[i].Amount = newItem.Amount;
          state.transactions[i].OpDate = newItem.OpDate;
          break;
        }
      }
    },
    addRowOperations(state, item){
      item.id = parseInt(Math.random()*1000);
      state.transactions.push(item);
    },

  },

  actions: {
    deleteRowOperations({state, commit}, id){
      for (let i = 0; i<state.transactions.length; i++) {
        if (state.transactions[i].id == id){
          commit('deleteRowOperations', i);
          return true;
        }
      }
      return false;
    },

    saveRowOperations({commit}, item){
      if (item.id){
        commit('updateRowOperations', item);
      }
      else{
        commit('addRowOperations', item);
        commit('addRowAccounts', {AcctNum: item.AcctNumDB}, { root: true });
        commit('addRowAccounts', {AcctNum: item.AcctNumCr}, { root: true });
        commit('mOperDays/addRowOperDays', item.OpDate, { root: true });
      }
    },
  
  },

  getters: {
    getOperationsAll: (state) => {
      return state.transactions;
    },
     getAcctBalancesByAccountOnDate:(state, getters, rootState) => (account, date)=> {
      let d = rootState.mAcctBalances.acctBalances.filter(item => (account == item.AcctNum) && (date == item.OpDate) );
      return d.length ? d[0] : false
    },
  
  },

}

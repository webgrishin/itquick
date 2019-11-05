
export default{
  namespaced: true,
	state: {
    acctBalances:[],
  },
  mutations: {
  	
    deleteRowAcctBalances(state, i){
      state.acctBalances.splice(i, 1);
    },
    updateRowAcctBalances(state, newItem){
      for (let i = 0; i<state.acctBalances.length; i++) {
        if (state.acctBalances[i].id == newItem.id){
          state.acctBalances[i].AcctNum = newItem.AcctNum;
          state.acctBalances[i].Balance = newItem.Balance;
          state.acctBalances[i].OpDate = newItem.OpDate;
          break;
        }
      }
    },
    addRowAcctBalances(state, item){
      item.id = parseInt(Math.random()*1000);
      state.acctBalances.push(item);
    },
    
  },

  actions: {
    deleteRowAcctBalances({state, commit}, id){
      for (let i = 0; i<state.acctBalances.length; i++) {
        if (state.acctBalances[i].id == id){
          commit('deleteRowAcctBalances', i);
          return true;
        }
      }

      return false;
    },

    saveRowAcctBalances({commit}, item){
      if (item.id){
        commit('updateRowAcctBalances', item);
      }
      else{
        commit('addRowAcctBalances', item);
        commit('addRowAccounts', item, { root: true });
        commit('mOperDays/addRowOperDays', item.OpDate, { root: true });
      }
    },
  	

  },
  getters: {
    getLastOpDate(state, getters, rootState){
      if (rootState.mOperDays.operDays[0]){
        let d = rootState.mOperDays.operDays.reduce((maxDate, item)=>{
          let cDate = Date.parse(item.OpDate);
          return maxDate >= cDate ? maxDate : cDate;
        }, 
        Date.parse(rootState.mOperDays.operDays[0].OpDate) );

        d = new Date(d);
        let m = d.getMonth()+1;
        let dd = d.getDate();
        return `${d.getFullYear()}-${m<10?'0'+m:m}-${dd<10?'0'+dd:dd}`
      }
      return '';
    },
    getAcctBalancesByDate:state => date => {
      return state.acctBalances.filter(item => Date.parse(item.OpDate) == Date.parse(date) );
    },
    getAcctBalancesById:state => id => {
      return state.acctBalances.filter(item => id == item.id )[0];
    },
    getTransactionsByAccount:(state, getters, rootState) => account => {
      /*Связываю с дебетовым счётом*/
      return rootState.mOperations.transactions.filter(item => account == item.AcctNumDB );
    },
  },
}

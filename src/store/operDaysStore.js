
export default{
  namespaced: true,
	state: {
    operDays:[],
  },
  mutations: {
    addRowOperDays(state, OpDate){
      if( !state.operDays.filter(item => item.OpDate == OpDate )[0] )
        state.operDays.push({OpDate: OpDate});
    },
    deleteRowOperDays(state, i){
      state.operDays.splice(i, 1);
    },
    updateRowOperDays(state, {i, date}){
      state.operDays[i].OpDate = date;
    }
  },

  actions: {
    deleteRowOperDays({state, commit}, date){
      for (let i = 0; i<state.operDays.length; i++) {
        if (state.operDays[i].OpDate == date){
          commit('deleteRowOperDays', i);
          return true;
        }
      }

      return false;
    },

    saveRowOperDays({getters, commit}, {oldDate, newDate}){

      if( getters.getIdOperDays(newDate) !== false)
          throw new Error(`Новое значение ${newDate} уже присутствует в базе данных`);
      
      if (oldDate){
          let i = getters.getIdOperDays(oldDate);
          commit('updateRowOperDays', {i, date:newDate});
      }
      else{
          commit('addRowOperDays', newDate);
      }
    },

  },
  getters: {
    getOperDaysAll: state => {
      return state.operDays;
    },
    getIdOperDays: state => date => {
      for (let i = 0; i<state.operDays.length; i++) {
          if (state.operDays[i].OpDate == date){
            return i;   
          }
      }
      return false;
    },
    getTransactionsByDate:(state, getters, rootState) => date => {
      // Связываю с дебетовым счётом
      return rootState.mOperations.transactions.filter(item => date == item.OpDate );
    },
  },
}

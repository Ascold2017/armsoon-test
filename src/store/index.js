import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    valutePairs: [],
    currentPair: '',
    quoteHistory: [],
    orders: []
  },
  mutations: {
    SOCKET_ONOPEN: (state, data) => {},
    SOCKET_ONMESSAGE: (state, data) => {},
    SET_VALUTE_PAIRS: (state, data) => {
      state.valutePairs = data
    },
    UPDATE_VALUTE_PAIR: (state, data) => {
      data.forEach(pair => {
        state.valutePairs = state.valutePairs.map(existsPair => {
          if (pair.symbol === existsPair.symbol) {
            return { ...existsPair, ...pair }
          }
          return existsPair
        })
      })
    },
    UPDATE_QUOTE_HISTORY: (state, data) => {
      data.forEach(pair => {
        state.quoteHistory = state.quoteHistory.map(existsPair => {
          if (pair.symbol === existsPair.symbol) {
            return { ...existsPair, ...pair }
          }
          return existsPair
        })
      })
    },
    SET_CURRENT_PAIR: (state, symbol) => {
      state.currentPair = symbol
    },
    SET_QUOTE_HISTORY: (state, data) => {
      state.quoteHistory = data
    },
    SET_ORDERS: (state, data) => {
      state.orders = data
    }
  },
  actions: {
    partial: () => {},
    update: ({ commit }, { data }) => {
      commit('UPDATE_VALUTE_PAIR', data)
    },
    insert: ({ commit }, { data }) => {
      commit('UPDATE_QUOTE_HISTORY', data)
    },
    getPairs: ({ commit, dispatch }) => new Promise((resolve, reject) => {
      axios.get('//localhost:3000/valute-pairs')
        .then(response => {
          commit('SET_VALUTE_PAIRS', response.data)
          dispatch('updatePairs')
          resolve(response)
        })
        .catch(reject)
    }),
    updatePairs: () => {
      Vue.prototype.$socket.send(`{"op": "subscribe","args": "instrument"}`)
    },

    getQuoteHistory: ({ commit, dispatch }, symbol) => new Promise((resolve, reject) => {
      commit('SET_CURRENT_PAIR', symbol)
      axios.get('//localhost:3000/quote-history/' + symbol)
        .then(response => {
          commit('SET_QUOTE_HISTORY', response.data)
          dispatch('updateQuoteHistory', symbol)
          resolve(response)
        })
        .catch(reject)
    }),

    updateQuoteHistory: (_, symbol) => {
      Vue.prototype.$socket.send(`{ "op": "subscribe","args": "tradeBin1m:${symbol}", "namespace": "quoteHistory" }`)
    },

    createOrder: ({ state }, { count, side }) => new Promise((resolve, reject) => {
      const data = {
        symbol: state.currentPair,
        count,
        side
      }
      axios.post('//localhost:3000/order/', data)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error.response.data))
    }),

    getOrders: ({ commit }) => new Promise((resolve, reject) => {
      axios.get('//localhost:3000/order/')
        .then(response => {
          commit('SET_ORDERS', response.data)
          resolve(response)
        })
        .catch(error => reject(error.response.data))
    })
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import * as moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    raw_resources: [
    {
      id:1,
      name:"Chain init",
      source: "google.com",
      score: 1,
      type_id : 1,
      timestamp: moment().format('DD/MM/YYYY')
    },
    {
      id:2,
      name:"Chain duplicate",
      source: "yahoo.com",
      score: 1,
      type_id : 2,
      timestamp: moment().format('DD/MM/YYYY')
    },
    {
      id:3,
      name:"Block upgrading",
      source: "crypto.com",
      score: 10,
      type_id : 3,
      timestamp: moment().format('DD/MM/YYYY')
    }
  ],
    raw_resource_types: [
      {id: 1, role: "Agent"},
      {id: 2, role: "Manager"},
      {id: 3, role: "Supervisor"},
      {id: 4, role: "Owner"},
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  actions: {
    async create({state} , new_item){
      new_item.timestamp = moment().format('DD/MM/YYYY')
      new_item.id = +state.raw_resources[state.raw_resources.length-1].id + 1

      state.raw_resources.push(new_item)

      return Promise.resolve();
    },

    async get({state}, id){
      return state.raw_resources.find(item => +item.id === +id);
    },

    async update({state}, {id, data}){
      const index = state.raw_resources.findIndex(item => +item.id === +id)

      Object.assign(state.raw_resources[index], data) 

      return Promise.resolve();
    },

    async destroy({state}, id){
    

      return state.raw_resources.pop(item => +item.id === +id);

    }

  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import * as moment from 'moment'
import axios from 'axios';
import e from 'cors';

const baseURL = `/api/v1`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    raw_resources: [],
    raw_resource_types: []
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
    async fetchRawResourceTypes({state}) {

      const fetch = require(`node-fetch`);
      
      var response = fetch(`${baseURL}/rawresourcetypes`).then(  (result)=>{
        const rawResourceTypes =  result.json().then((data) => { 
                                      //console.log(`data`, data)
                                      state.raw_resource_types = [ `Please Select Type` , ...data.map(d => d.Name)]
                                      //return;
                                    })
        }).catch((error)=>{
          console.log(`Error`,error);
        });


      return null;
    },
    async fetchRawResource({state}) {

      const fetch = require(`node-fetch`);
      
      var response = await fetch(`${baseURL}/rawresources`)
      
      const rawResources =  await response.json()

      let result = rawResources 

      state.raw_resources = result.map(el => {
        el.id = el.ID
        el.name = el.Name
        el.type_id = el.TypeID
        el.arrival_time = moment(el.arrival_time || moment()).format('DD/MM/YYYY')
        el.timestamp = moment(el.timestamp || moment()).format('DD/MM/YYYY')
        el.weight = el.Weight
        el.arrival_time = el.ArrivalTime
        el.timestamp = el.Timestamp

        return el;
    })


      return null;
    },

    async get({state}, id){

      const fetch = require(`node-fetch`);
      
      var response = await fetch( `${baseURL}/rawresources/${id}`)
  
      const rawResources =  await response.json()

      return rawResources;
    },

      async create({ state }, new_item) {

        data.weight = +data.weight

            const response = await fetch(`${baseURL}/rawresources`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new_item)
            })

            let newRawResource = response.json()

            return newRawResource
        },

        async update({ state }, { id, data }) {

            data.weight = +data.weight

            const response = await fetch(`${baseURL}/rawresources/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            let newRawResource = response.json()

            return newRawResource
        },
        async destroy({ state }, id) {

            const response = await fetch(`${baseURL}/rawresources/${id}`, {
                method: 'DELETE'
            })

            return Promise.resolve();
        }

  }
})

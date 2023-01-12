<template lang = "pug">
  v-row   
    v-col(md="8" offset-md="2")
        v-data-table(
          :headers="headers"
          :items="raw_resources"
        )
          template(v-slot:item.id="{item}")
            router-link(:to="'/update/' + item.id") Update    
            a(@click="destroy(item.id)") Destroy
</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import { mapState } from 'vuex';

  export default {
    data(){
      return {
        headers: [
          {text: 'Actions', value: 'id'},
          {text: 'Name', value: 'name'},
          {text: 'Source', value: 'source'},
          {text: 'Score', value: 'score'},
          {text: 'Arrival time', value: 'timestamp'},
        ],
      };
    },
    computed:{
      ...mapState(
        {raw_resources: state => state.raw_resources}
      ),
    },
    methods: {
      async destroy(id){
        const vm = this;

        await vm.$store.dispatch("destroy", id);
      }
    }
  }
</script>

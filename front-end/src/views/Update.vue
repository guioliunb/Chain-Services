<template lang = "pug">
    v-row
        v-col(md="6" offset-md= "2")
            v-text-field(
                label = "Name"
                v-model = "name"
            )
            v-text-field(
                label = "Score"
                v-model = "score"
            )
            v-text-field(
                label = "Source"
                v-model = "source"
            )
    
    
            v-select(
                label = "Type"
                v-model = "type_id"
                :items = "raw_resources"
                item-text = "role"
                item-value = "id"
            )
    
            v-btn(color = "sucess" @click= "update" ) Update
    
    </template>
      
    <script>
    
    import { mapState } from 'vuex';
    
    export default {
        name: "update",
        data(){
        return {

            name : "",
            score: 0,
            source : "",    
            type_id: 1
        };
        },
        computed:{
          ...mapState(
            {raw_resources: state => state.raw_resource_types}
          ),
        },
        methods: {
            async update(){
                const vm = this;
    
                await vm.$store.dispatch("update", {

                    id: vm.$route.params.id,
                    data:{
                        name: vm.name,
                        source : vm.source,
                        score: vm.score,
                        type_id: vm.type_id
                    }
                });
    
                vm.$router.push({
                    path: "/"
                });
            },

            async mounted(){

                const vm = this;
                const data = await vm.$store.dispatch('get', vm.$route.params.id)

                vm.name = data.name
                vm.source = data.source
                vm.score = data.score
                vm.type_id = data.type_id

            }
        }
    }
    </script>
    
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

        v-btn(color = "sucess" @click= "create" ) Create

</template>
  
<script>

import { mapState } from 'vuex';

export default {
    name: "create",
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
        async create(){
            const vm = this;

            await vm.$store.dispatch("create", {
                name: vm.name,
                source : vm.source,
                score: vm.score,
                type_id: vm.type_id

            });

            vm.$router.push({
                path: "/"
            });

        }
    }
}
</script>

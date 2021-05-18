<template>
    <div>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
            <v-tab v-for="tab in tabList" :key="tab">
                {{tab}}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="tab in tabList" :key="tab">
                <slot :name="tab"></slot>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    export default {
        props:{
            value: {
                default: null,
            },
             tabList:{
                 default: [],
             } 
        },
        data () {
            return {
                tab:null,
            }
        },
        components: {
        },
        watch:{
            value: function (val){
                this.tab = val;  
            },
            tab: function (val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style>
    
</style>
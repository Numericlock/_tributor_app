<template>
    <div>
        <v-text-field class="mt-7 ml-3" label="経度" v-model="longitude"></v-text-field>
        <v-text-field class="mt-7 ml-3" label="緯度" v-model="latitude"></v-text-field>
        <v-btn @click="getStations">最寄り駅取得</v-btn>
        <v-btn @click="setUser">setUser</v-btn>
        <v-btn @click="Auth">Auth</v-btn>
        <v-btn @click="login">login</v-btn>
        <v-slider
          max="200"
          min="50"
          :label="'徒歩（分速）: '+walkSpeed+'m' "
          v-model="walkSpeed"
        ></v-slider>
        <div v-for="(station, index) in stations" :key="index" v-if="stations">
            <p>{{index+1}}</p>
            <p><span>distance:</span><span>{{station.distance}}</span></p>
            <p><span>徒歩:</span><span>{{onFoot(station.distance)}}分</span></p>
            <p><span>line:</span><span>{{station.line}}</span></p>
            <p><span>name:</span><span>{{station.name}}</span></p>
            <p><span>next:</span><span>{{station.next}}</span></p>
            <p><span>prev:</span><span>{{station.prev}}</span></p>
            <p><span>prefecture:</span><span>{{station.prefecture}}</span></p>
            <p><span>postal:</span><span>{{station.postal}}</span></p>
            <p><span>longitude:</span><span>{{station.x}}</span></p>
            <p><span>latitude:</span><span>{{station.y}}</span></p>
        </div>
    </div>
</template>
<script>
    export default {
      layout: 'main2',
        data () {
            return {
                stations:'',
                longitude:139.701106,
                latitude:35.691213,
                walkSpeed:50,
            }
        },
        components: {
        },
        computed:{
            onFoot: function(){
                let that = this;
                return function(distance){
                    return Number(distance.slice(0,-1))/this.walkSpeed
                }
            }
        },
        methods: {
            async getStations(){
                const data = {
                    method: 'getStations',
                    x: this.longitude,
                    y: this.latitude
                };
                const response = await this.$axios.$get('http://express.heartrails.com/api/json?method=getStations&x='+this.longitude+'&y='+this.latitude)
                    .catch(err => {
                        console.log(err)
                    })
                this.stations = response.response.station;
                console.log(this.stations);
            },            
            async setUser(){
                const data = {
                    name:"hishida_passport",
                    email:"tatsuki2@live.jp",
                    password:"hishida1430",
                    c_password:"hishida1430",
                    user_id:"aa"
                }
                const response = await this.$axios.$post('http://localhost:8000/api/register',data)
                    .catch(err => {
                        console.log(err)
                    })
                console.log(response);
            },   
            async login(){
                const data = {
                    email:"tatsuki1@live.jp",
                    password:"hishida1430",
                }
                const response = await this.$axios.$post('http://localhost:8000/api/login',data)
                    .catch(err => {
                        console.log(err)
                    })
                console.log(response);
                const token = response.success.token;
                this.Auth(token);
            },   
            async Auth(token){
                console.log(token);
                //const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzAxOTdmNmZkNjRlODdiODM2ZWNkNDMwNzRkODdlMThjMzA4MzkwZjkxNDMzN2QzYjUxYjM1MDhkNDNhNGQ3NGRjNjY5MzcyYzRiYmNhMWIiLCJpYXQiOjE2MjA2MzE4MTguMTkwNDgsIm5iZiI6MTYyMDYzMTgxOC4xOTA0ODcsImV4cCI6MTY1MjE2NzgxOC4xNzI5ODgsInN1YiI6IjMyIiwic2NvcGVzIjpbXX0.14TeBa_w8apNIvMXmwVuT2eb0Ujt7pU2ph7idNLROxYk4Ak0tFJabKHTwG5ixaqP2Zivn7_59hvOO27ZyxtcGl7D8l59GL_SpLRRF-FVRdFihaZgdY4v4TdZxdVi6IpWswZgDQrkKdzlOyC_1si-_JviBeR2_PkRElawg9J3qNzJOcYyyyj-_hWsZT4UkAXdx9zJ3ERX1wEtbChZuw9tpFoa9_7E9h5lNwLVeCxaSQP_LHciN36JL1DT0qlMIClyhVGUNdF2riWtKsN6-XOZK32cCzkY0tTkwBPeqJ5pMoQs-177HeiYz9scs7K06PHZmCLRTvTNyxBO8dm-cCSLhi4pUyMFn0BF6uCgcamdP3P973hdmoEJycQdeT-s8nGG1oc2A3rlYVqtPjurGjA7g26Gv-FtBqoEUy-qSwihSdrPf728Ur1uwcbrOszQPvDdTFwhr8d4cn9N4vs6c9Y42Ww5FqMUqbJo4tYShRkmzu1a7Jt6KWS9dETWFw_mk90ZO_xUbLveg4V3j96j44cKhIrDKJvwaGkK9aC87ZzZquhgoGUIA3UtAgeQyjqM3XZ6ZAoJ7myrFyI9uk2yBf7PmYT1Phl96Dx_Nkzok_FSMfr5wywseuvahaNYTTAtHeqpAYb-ClRDKta6Mp8NnaWLZ1knn7ayBqYUdlFMw5Mg4Yk";
                this.$axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                const response = await 
                this.$axios.$post('http://localhost:8000/api/details',{
                  headers: {
                      "Content-Type": "application/json"
                  }
                })
                    .catch(err => {
                        console.log(err)
                    })
                console.log(response);
            },
        }
    }
</script>

<style>
    
</style>
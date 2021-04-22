<template>
    <div>
        <v-text-field class="mt-7 ml-3" label="経度" v-model="longitude"></v-text-field>
        <v-text-field class="mt-7 ml-3" label="緯度" v-model="latitude"></v-text-field>
        <v-btn @click="getStations">最寄り駅取得</v-btn>
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
        }
    }
</script>

<style>
    
</style>
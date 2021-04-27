<template>
    <div>
        <div class="image-modal-background" v-if="selectedImage" @click.stop="selectedImage = null" :style="'backgroundImage:url('+ selectedImage +');'">
        </div>
        <div class="image-modal" v-if="selectedImage">
            <img :src="selectedImage" alt="" height="980vh" width="auto" />
        </div>
        <v-btn class="d-block image-modal-close-button" fab color="white" v-if="selectedImage" @click.stop="selectedImage = null">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {}
    }
</script>

<style>

</style>
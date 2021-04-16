<template>
    <div class="wrapper">
        <transition name="first">
            <div class="attention-modal-background modal-background" v-if="isAttention && value" @click="isAttention = false">
            </div>
        </transition>
        <transition　name="first">
            <div class="attention-modal modal" v-if="isAttention && value">
                <div class="attention-modal-container modal-container">
                    <div class="attention-modal-text">{{attentionText}}</div>
                    <div class="attention-modal-buttons">
                        <v-btn color="red" @click="isAttention = false">NO</v-btn>
                        <v-btn @click="modalRemove">OK</v-btn>
                    </div>
                </div>
            </div>
        </transition>
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
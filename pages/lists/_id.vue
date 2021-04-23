<template>
    <div class="list px-8">
        <div class="list__basic">
            <v-avatar color="grey lighten-1 my-auto" size="55"></v-avatar>
            <div class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h6 text-caption font-weight-bold my-auto ml-4">name{{id}}</div>
            <v-btn class="d-block text-center my-auto ml-auto" fab small color="gray">
                <v-icon>
                    mdi-dots-horizontal
                </v-icon>
            </v-btn>
        </div>
        <v-divider class="my-2"></v-divider>
        <div class="list__navigation">
            <v-btn icon fab class="mx-auto my-auto">
                <v-icon>mdi-message</v-icon>
            </v-btn>
            <v-divider vertical class="my-2"></v-divider>
            <v-btn icon fab class="mx-auto my-auto">
                <v-icon>mdi-account-multiple</v-icon>
            </v-btn>
        </div>
        <v-divider class="my-2"></v-divider>
        <div class="list__posts"></div>
        <AttentionModal text="リストを削除しますか？" v-model="isAttention" />
    </div>
</template>
<script>
    import AttentionModal from '~/components/AttentionModal.vue'
    export default {
        layout: 'main2',
        props: {
            list: {
                default:-1,
            },
        },
        data() {
            return {
                //id: this.$route.params.id,
            }
        },
        computed:{
            id() {
                return this.$route.params.id;
            }
        },
        components: {
            AttentionModal,
        },
        data() {
            return {
                isAttention: false,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list {
        display: flex;
        flex-direction: column;

        &__basic {
            display: flex;
            flex-direction: row;

            div {
                vertical-align: middle;
            }
        }

        &__navigation {
            display: flex;
            flex-direction: row;
        }

        &__posts {
            display: flex;
            flex-direction: column;
        }
    }
</style>
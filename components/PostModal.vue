<template>
    <div class="wrapper">
        <transition name="first">
            <div class="modal-background" v-if="value" @click="modalAttention">
            </div>
        </transition>
        <!--<transition :name="firstModal">-->
        <transition name="first">
            <div class="modal" v-if="modal && value">
                <div class="modal-container">
                    <div class="modal-header">
                        <div>投稿</div>
                        <v-icon class="close-icon" @click="modalAttention">mdi-close</v-icon>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="modal-content">
                        <div class="user-icon-area">
                            <v-avatar class="d-block text-center mx-auto" color="grey lighten-1" size="55">

                            </v-avatar>
                        </div>
                        <v-textarea counter label="_tribute" no-resize :rules="rules" v-model="textValue" maxlength="400"></v-textarea>
                    </div>
                    <div class="modal-footer">
                        <v-icon class="image-icon">mdi-image-plus</v-icon>
                        <v-btn @click="nextModalValidate">次へ</v-btn>
                    </div>
                </div>
            </div>
        </transition>
        <!--<transition　:name="secondModal">-->
        <transition　name="first">
            <div class="modal next-modal" v-if="firstModalNext && value">
                <div class="modal-container next-modal-container">
                    <div class="modal-header next-modal-header">
                        <div>リストを選択</div>
                        <v-icon class="close-icon" @click="modalAttention">mdi-close</v-icon>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="modal-content next-modal-content overflow-y-auto" @scroll="getScrollParam">
                        <div class="list-container" v-for="list in lists">
                            <div class="list-basic-container">
                                <div>
                                    <v-avatar size="55">
                                        <img alt="Avatar" class="list-icon" :src="listIconUrl+list.id+'.png'" />
                                    </v-avatar>
                                    <div class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h6 text-caption font-weight-bold my-auto ml-4">
                                        {{ list.name }}
                                    </div>
                                </div>
                                <div class="checkbox my-auto">
                                    <div>
                                        <input class="post-modal-list-checkbox" type="checkbox" :id="list.id" :name="list.id"   :value = "list.id" v-model="selectedLists"/>
                                        <label class="checkbox-label" :for="list.id">
                                            <span class="checkbox-span">
                                                <!-- This span is needed to create the "checkbox" element -->
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <transition　name="first">
                            <div class="blind-mask" v-if="isPrivate" :style="'top:'+scroll+'px;'"></div>
                        </transition>
                        
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="modal-footer next-modal-footer">
                        <v-btn @click="modalBack">戻る</v-btn>
                        <v-checkbox label="非公開" color="red" v-model="isPrivate" hide-details @change="privateChangeAction" class="my-auto"></v-checkbox>
                        <v-btn @click="postValidate">投稿</v-btn>
                    </div>
                </div>
            </div>
        </transition>
        
        
        
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
        props: {
            value: {
                default: false,
            }
        },
        data() {
            return {
                // postModal: true,
                isPrivate: false,
                listIconUrl: 'http://localhost:8000/img/list_icon/',
                rules: [v => v.length <= 400 || 'Max 400 characters'],
                textValue: '',
                modal:true,
                firstModalNext:false,
                secondModalNext:false,
                isAttention:false,
                attentionText:"内容が削除されます",
                selectedLists: [],
                tmpSelectedLists: [],
                scroll:0,
               // firstModal:"first-next",
            }
        },
        components: {},
        computed: {
            firstModal(){
                let name = "first";
                if(this.firstModalNext)name = "first-next"; 
                return name;
            },            
            secondModal(){
                let name = "second";
                if(this.secondModalNext)name = "second-next"; 
                return name;
            },
            lists() {
                //console.log("e?:"+this.$store.getters['list/list']);
                return this.$store.getters['list/list']
            }
        },
        // data: vm => ({}),
        methods: {
            handle(bool) {
                this.$emit('input', bool)
            },
            attentionModalController(){
              
            },
            nextModalValidate(){
                console.log(this.textValue);
                if(this.textValue.trim()){
                    this.firstModalNext = true;
                    this.modal = false;  
                }
            },
            modalBack(){
                this.firstModalNext =  false;
                this.modal = true;
            },
            modalAttention(){
                if(this.textValue.trim()){
                    this.isAttention = true;
                }else{
                    this.modalRemove();
                }
            },
            modalRemove(){
                this.modal=true;
                this.firstModalNext=false;
                this.secondModalNext=false;
                this.isAttention=false;
                this.isPrivate=false;
                this.return_scroll();
                this.selectedLists = [];
                this.scroll = 0;
                this.handle(false);
                this.textValue = '';
            },
            postValidate(){
                console.log(this.selectedLists);
                
            },
            privateChangeAction(){
                if(this.isPrivate){
                    this.no_scroll();
                    this.tmpSelectedLists  = this.selectedLists;
                    this.selectedLists = [];
                }
                else{
                    this.return_scroll();
                    this.selectedLists = this.tmpSelectedLists;
                } 
            },
            no_scroll(){
                // PCでのスクロール禁止
                document.addEventListener("mousewheel", this.scroll_control, { passive: false });
                // スマホでのタッチ操作でのスクロール禁止
                document.addEventListener("touchmove", this.scroll_control, { passive: false }); 
            },
            return_scroll(){
                // PCでのスクロール禁止解除
                document.removeEventListener("mousewheel", this.scroll_control, { passive: false });
                // スマホでのタッチ操作でのスクロール禁止解除
                document.removeEventListener('touchmove', this.scroll_control, { passive: false });
            },
            scroll_control(event) {
                event.preventDefault();
            },
            getScrollParam:function(e){
                this.scroll = e.target.scrollTop;
            },
        },
    }
</script>

<style lang="scss" scoped>
    /* スクロールの幅の設定 */
    *::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* スクロールの背景の設定 */
    *::-webkit-scrollbar-track {
        border-radius: 5px;
        box-shadow: 0 0 4px #aaa inset;
    }

    /* スクロールのつまみ部分の設定 */
    *::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #666;
    }

    .first-leave-active,
    .first-enter-active {
        opacity: 1 !important;
      transition: all 200ms;
    }

    /* 表示アニメーション */
    .first-enter,
    .first-leave-to{
        opacity: 0 !important;
    }

    .first-next-leave-active,
    .first-next-enter-active {
      position: fixed;
      left:50% !important;
      transform: translate(-50%, -50%)!important;
      transition: all 1s;
    }

    /* 表示アニメーション */
    .first-next-enter,
    .first-next-leave-to{
        left:-50%;
        transform: translate(-100vw, -50%)!important;
    }
    
    .second-leave-active,
    .second-enter-active {
      position: fixed;
      left:50% !important;
      transform: translate(-50%, -50%)!important;
      transition: all 1s;
    }

    /* 表示アニメーション */
    .second-enter,
    .second-leave-to{
        left:-50%;
        transform: translate(100vw, -50%)!important;
    }

    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        background-blend-mode: lighten;
        z-index: 10000;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: .9;
    }
    .attention-modal-background{
        z-index: 10002;
    }
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;

    }
    .attention-modal{
         z-index: 10002;
    }
    .modal-container {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 600px;
        min-width: 200px;
        max-height: 95vh;
        min-height: 300px;


        background-color: #36393E;
        border-radius: 6px;
        border-color: none;


        color: #ddd;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        .modal-header {
            position: relative;

            .close-icon {
                position: absolute;
                right: 0;
                top: 0;
            }
        }

        .modal-content {
            display: flex;
            flex-direction: row;

            .user-icon-area {
                min-width: 80px;
                padding: 5px 10px;
            }
        }

        .modal-footer {
            display: flex;
            justify-content: space-between;
        }
    }

    .next-modal-container {
        .next-modal-content {
            flex-direction: column;
            position: relative;
            .blind-mask{
                position: absolute;
                width:100%;
                height:100%;
                background: repeating-linear-gradient(-35deg, rgba(177, 34, 26, 0.60), rgba(177, 34, 26, 0.60) 10px, rgba(62, 62, 62, 0.50) 0, rgba(62, 62, 62, 0.50) 20px);
            }
        }
    }
    
    .attention-modal-container{
        width: auto;
        min-width: 200px;
        min-height: 150px;
        justify-content: space-around
        
    }

    .list-container {
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        .list-basic-container {
            display: flex;
            justify-content: space-between;
            width: 100%;

            div {
                display: flex;
                flex-direction: row;
            }
        }

        .user-icon-container {
            justify-content: flex-end;
        }
    }

    .checkbox {
        display: table-cell;
        vertical-align: middle;
        text-align: center;

        div {
            label {
                display: inline-block;
                color: #212226;
                cursor: pointer;
                position: relative;

                span {
                    display: inline-block;
                    position: relative;
                    background-color: transparent;
                    width: 25px;
                    height: 25px;
                    transform-origin: center;
                    border: 2px solid #212226;
                    border-radius: 50%;
                    vertical-align: -6px;
                    margin-right: 10px;
                    transition: background-color 150ms 200ms, transform 350ms cubic-bezier(0.78, -1.22, 0.17, 1.89);

                    &:before {
                        content: "";
                        width: 0px;
                        height: 2px;
                        border-radius: 2px;
                        background: #212226;
                        position: absolute;
                        transform: rotate(45deg);
                        top: 11px;
                        left: 7px;
                        transition: width 50ms ease 50ms;
                        transform-origin: 0% 0%;
                    }

                    &:after {
                        content: "";
                        width: 0;
                        height: 2px;
                        border-radius: 2px;
                        background: #212226;
                        position: absolute;
                        transform: rotate(305deg);
                        top: 14px;
                        left: 8px;
                        transition: width 50ms ease;
                        transform-origin: 0% 0%;
                    }
                }


                &:hover {
                    span {
                        &:before {
                            width: 5px;
                            transition: width 100ms ease;
                        }

                        &:after {
                            width: 10px;
                            transition: width 150ms ease 100ms;
                        }
                    }
                }
            }

            input[type="checkbox"] {
                display: none; // hide the system checkbox

                // Let's add some effects after the checkbox is checked

                &:checked {
                    +label {
                        span {
                            background-color: #212226;
                            transform: scale(1.25); // enlarge the box

                            &:after {
                                width: 10px;
                                background: #1790b5;
                                transition: width 150ms ease 100ms; // enlarge the tick
                            }

                            &:before {
                                width: 5px;
                                background: #1790b5;
                                transition: width 150ms ease 100ms; // enlarge the tick
                            }
                        }

                        &:hover {

                            // copy the states for onMouseOver to avoid flickering
                            span {
                                background-color: #212226;
                                transform: scale(1.25); // enlarge the box

                                &:after {
                                    width: 10px;
                                    background: #1790b5;
                                    transition: width 150ms ease 100ms; // enlarge the tick
                                }

                                &:before {
                                    width: 5px;
                                    background: #1790b5;
                                    transition: width 150ms ease 100ms; // enlarge the tick
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
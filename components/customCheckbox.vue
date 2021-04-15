<template>
    <div class="checkbox my-auto">
        <div>
            <input class="post-modal-list-checkbox" type="checkbox" :id="id" :name="id" :value="id" @input="toggleCheck($event.target.value)"/>
            <label class="checkbox-label" :for="id">
                <span class="checkbox-span"></span>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        props:['id','name','value'],
        data () {
            return {
                isChecked:false,
            }
        },
        methods: {
            toggleCheck(value){
                const newValue = {
                    ...this.value,
                    name: { ...this.id, value }
                }
                this.$emit('input', this.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
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
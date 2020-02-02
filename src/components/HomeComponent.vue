<template>
    <div id="home">
        <counter-component v-bind:counter="counter"></counter-component>
        <list-component v-if="counter > 0" v-bind:counter="counter"></list-component>
    </div>
</template>

<script>
    import io from "socket.io-client";
    import CounterComponent from "./CounterComponent";
    import ListComponent from "./ListComponent";
    const socket = io.connect("http://localhost:4000", {
        transports: ["polling", "websocket"],
    });

    export default {
        components: {
            CounterComponent,
            ListComponent
        },
        data() {
            return {
                counter: this.getCounter()
            };
        },
        created() {
            window.addEventListener('beforeunload', this.disconnectWS);
            this.registerSocketListeners();
        },
        methods: {
            disconnectWS() {
                socket.disconnect();
            },
            getCounter() {
                this.checkConnection();
                socket.emit('counter:get', counter => {this.setCounter(counter)});
            },
            checkConnection() {
                if (socket.connected === false) {
                    socket.open();
                }
            },
            registerSocketListeners() {
                socket.on('counter:update', counter => {this.setCounter(counter)})
            },
            setCounter(counter) {
                this.counter = counter;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #home {
        display: flex;
        flex-direction: row;
        margin-top: 42px;

        @media screen and (max-width: 576px) {
            flex-direction: column;
            align-items: center;
        }
    }
</style>

<template>
    <div id="home">
        <div class="buttons-container">
            <button class="counter-get" v-on:click="getCounter">Get</button>
            <button class="counter-get" v-on:click="increaseCounter">Add</button>
            <button class="counter-stop" v-on:click="disconnectWS">Stop</button>
        </div>
        <div class="counter-container">
            {{ counter }}
        </div>
    </div>
</template>
<script>
    import io from "socket.io-client";
    const socket = io.connect("http://localhost:4000");

    export default {
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
                socket.emit('counter:actual', (counter) => {this.setCounter(counter)});
            },
            increaseCounter() {
                this.checkConnection();
                socket.emit('counter:add', (counter) => {this.setCounter(counter)});
            },
            checkConnection() {
                if (socket.connected === false) {
                    socket.open();
                }
            },
            registerSocketListeners() {
                socket.on('counter:res', counter => {this.setCounter(counter)})
            },
            setCounter(counter) {
                this.counter = counter;
            }
        }
    }
</script>

<style lang="scss" scoped></style>

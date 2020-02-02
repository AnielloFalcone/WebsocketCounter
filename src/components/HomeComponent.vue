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

    const socket = io.connect(window.location.href, {
        path: '/server/socket.io',
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
            this.registerSocketListeners();

            // Disconnect from WS when unloading the page to prevent multiple connection on the same page
            window.addEventListener('beforeunload', this.disconnectWS);
        },
        methods: {
            /**
             * Disconnect from websocket
             */
            disconnectWS() {
                socket.disconnect();
            },

            /**
             * Gets the counter from the websocket
             */
            getCounter() {
                this.maybeOpenWSConnection();
                socket.emit('counter:get', counter => {this.setCounter(counter)});
            },

            /**
             * Check if the websocket connection is closed and if true opens a new one
             */
            maybeOpenWSConnection() {
                if (socket.connected === false) {
                    socket.open();
                }
            },

            /**
             * Register for listeners on websocket polls
             */
            registerSocketListeners() {
                socket.on('counter:update', counter => {this.setCounter(counter)})
            },

            /**
             * Set the retrieved from WS counter to the component data
             * @param counter
             */
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

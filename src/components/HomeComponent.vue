<template>
    <div id="home">
        Hello HomeWorld! {{counter}}
    </div>
</template>
<script>
    import io from "socket.io-client";
    const socket = io.connect("http://localhost:4000");

    export default {
        data() {
            return {
                counter: 0
            };
        },
        created() {
            this.getRealtimeData()
        },
        methods: {
            getRealtimeData() {
                socket.on("newcounter", newCounter => {
                    this.counter = newCounter;
                    console.log('Class: methods, Function: counter, Line 23 newCounter() => ', newCounter);
                })
            }
        }
    }
</script>

<style lang="scss" scoped></style>

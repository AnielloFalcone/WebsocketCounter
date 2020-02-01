<template>
    <div id="counter">
        <div class="counter-container">
            {{counter}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "CounterComponent",
        props: ['counter']
    }
</script>

<style lang="scss" scoped>
    #counter {
        width: 20%;
        font-size: 5em;
        display: flex;
        justify-content: center;

        .counter-container {
            height: max-content;
            position: sticky;
            top: 60px;
        }
    }
</style>

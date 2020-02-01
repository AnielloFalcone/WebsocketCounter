<template>
    <div id="navbar">
        <div class="title">Orders</div>
    </div>
</template>
<script>
    export default {}
</script>

<style lang="scss" scoped>
    #navbar {
        display: flex;
        flex-direction: row;
        align-content: center;
        height: 60px;
        padding: 0 24px;
        font-size: 1.5em;
        box-shadow: 0 0 5px;
        position: sticky;
        top: 0;
        background: white;

        .title {
            align-items: center;
            display: flex;
        }
    }
</style>

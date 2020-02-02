<template>
    <div class="app-container">
        <navbar-component></navbar-component>
        <HomeComponent></HomeComponent>
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>

<script>
    import NavbarComponent from "./components/NavbarComponent";
    import HomeComponent from "./components/HomeComponent";

    export default {
        components: {
            HomeComponent,
            NavbarComponent
        }
    };
</script>

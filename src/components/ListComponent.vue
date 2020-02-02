<template>
    <div id="list" v-if="orders.length > 0">
        <list-item-component v-for="order in orders"
                             v-bind:key="order.id"
                             v-bind:order="order"
        ></list-item-component>
    </div>
</template>

<script>
    import ListItemComponent from "./ListItemComponent";

    export default {
        name: "ListComponent",
        components: {ListItemComponent},
        props: ['counter'],
        data() {
            return {
                orders: [
                    {
                        numberLabel: 'Num',
                        idLabel: 'Order id',
                        amountLabel: 'Amount'
                    }
                ]
            }
        },
        created() {
            this.createOrders();
        },
        watch: {
            counter: {
                handler(newCounter, oldCounter) {
                    if (newCounter - oldCounter === 1) {
                        this.setOrder(newCounter, this.scrollToLastOrder);
                    }
                    else {
                        const min = oldCounter + 1;
                        this.createOrders(min, newCounter, this.scrollToLastOrder);
                    }
                }
            }
        },
        methods: {
            createOrders(min = 1, max = this.counter, scrollCallback = undefined) {
                for (let i = min; i <= max; i++) {
                    this.setOrder(i);
                }

                if (scrollCallback) {
                    scrollCallback();
                }
            },
            getUuidv4() {
                return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            },
            setOrder(number, scrollCallback = undefined) {
                this.orders.push({
                    amount: Math.floor(Math.random() * 1000) + 1,
                    id: this.getUuidv4(),
                    number,
                });

                if (scrollCallback) {
                    scrollCallback();
                }
            },
            scrollToLastOrder() {
                setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
            }
        }
    }
</script>

<style scoped>
    #list {
        width: 60%;
    }
</style>

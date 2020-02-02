<template>
    <div class="list-item">
        <div class="labels" v-if="!order.number">
            <div class="order-number-container">{{order.numberLabel}}</div>
            <div class="order-id-container">{{order.idLabel}}</div>
            <div class="order-amount-container">{{order.amountLabel}}</div>
        </div>
        <div class="item-detail" v-if="!!order.number">
            <div class="order-number-container">{{order.number}}</div>
            <div class="order-id-container">{{order.id}}</div>
            <div class="order-amount-container">{{order.amount | currency}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListItemComponent",
        props: ['order']
    }
</script>

<style lang="scss" scoped>
    .list-item {
        .item-detail, .labels {
            display: grid;
            grid-template-columns: 10% 65% 20%;
            width: 100%;
            height: 40px;
            align-items: center;
        }

        .order {
            &-id-container {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &-amount-container {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>

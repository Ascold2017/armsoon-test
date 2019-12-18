<template>
  <b-card title="Orders">
    <b-table :fields="fields" :items="items" responsive v-if="orders.length" />
  </b-card>
</template>

<script>
import toFixed from '@/helpers/toFixed'
import dateFormatter from '@/helpers/dateFormatter'
export default {
  data () {
    return {
      fields: ['orderID', 'symbol', 'orderQty', 'timestamp', 'side', 'price', 'ordStatus']
    }
  },

  computed: {
    orders () {
      return this.$store.state.orders
    },
    items () {
      return this.orders.map(item => ({
        orderID: item.orderID,
        symbol: item.symbol,
        orderQty: item.orderQty,
        timestamp: dateFormatter(item.timestamp),
        side: item.side,
        price: toFixed(item.price),
        ordStatus: item.ordStatus
      }))
    }
  }
}
</script>

<style>

</style>

<template>
  <b-card :title="currentPair">
    <b-table :fields="fields" :items="items" responsive v-if="currentPair"/>
  </b-card>
</template>

<script>
import toFixed from '@/helpers/toFixed'
import dateFormatter from '@/helpers/dateFormatter'
export default {
  data () {
    return {
      fields: ['symbol', 'timestamp', 'open', 'high', 'low', 'close', 'trades']
    }
  },
  computed: {
    quoteHistory () {
      return this.$store.state.quoteHistory
    },
    currentPair () {
      return this.$store.state.currentPair
    },
    items () {
      return this.quoteHistory.map(item => ({
        symbol: item.symbol,
        timestamp: dateFormatter(item.timestamp),
        open: toFixed(item.open),
        high: toFixed(item.high),
        low: toFixed(item.low),
        close: toFixed(item.close),
        trades: item.trades
      }))
    }
  }
}
</script>

<style>

</style>

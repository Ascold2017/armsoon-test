<template>
  <b-card>
    <b-list-group>
      <b-list-group-item v-for="pair in valutePairs" :key="pair.symbol" @click="getQuoteHistory(pair.symbol)" button :active="currentPair === pair.symbol">{{pair.symbol}} - {{pair.lastPrice}}</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  computed: {
    valutePairs () {
      return this.$store.state.valutePairs
    },
    currentPair () {
      return this.$store.state.currentPair
    }
  },
  methods: {
    getQuoteHistory (symbol) {
      this.$store.dispatch('getQuoteHistory', symbol)
    }
  }
}
</script>

<style>

</style>

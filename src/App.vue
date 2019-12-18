<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row mb-3">
        <div class="col-sm-3">
          <ValutePairsList />
        </div>
        <div class="col-sm-6">
          <QuotesList />
        </div>
        <div class="col-sm-3">
          <OrderForm />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <OrdersList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValutePairsList from '@/components/ValutePairsList'
import QuotesList from '@/components/QuotesList'
import OrderForm from '@/components/OrderForm'
import OrdersList from '@/components/OrdersList'
export default {
  components: {
    ValutePairsList,
    QuotesList,
    OrderForm,
    OrdersList
  },
  created () {
    this.$store.dispatch('getPairs')
    this.$store.dispatch('getOrders')
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 15px 0;
}

.app-main {
  display: flex;
}

.valute-pairs {
  width: 30%
}

.quotes-list {
  width: 45%;
  overflow: auto
}

.order-form {
  width: 25%;
}
</style>

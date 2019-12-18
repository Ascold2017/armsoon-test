<template>
  <b-card>
    <b-form-group label="Count">
      <b-form-input type="number" v-model="count" />
    </b-form-group>
    <b-alert variant="danger" :show="!!errorMessage">{{ errorMessage }}</b-alert>
    <b-button-group>
      <b-button @click="submitForm('Buy')">Buy</b-button>
      <b-button @click="submitForm('Sell')">Sell</b-button>
    </b-button-group>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      count: 1,
      errorMessage: ''
    }
  },

  methods: {
    submitForm (side) {
      this.errorMessage = ''
      this.$store.dispatch('createOrder', { count: this.count, side })
        .catch(({ error }) => {
          this.errorMessage = error.message
        })
    }
  }
}
</script>

<style>

</style>

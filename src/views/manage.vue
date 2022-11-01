<template>
  <div class="login-page">
    <!-- <div class="mt-15">
      <v-btn x-large rounded @click="stakeNode">
        <v-icon class="mr-5">mdi-resistor-nodes</v-icon>
        Stake Node
      </v-btn>
    </div> -->
    <div class="mt-15">
      <stake-node-dialog @on-success="handleSuccess" />
    </div>
    <div class="mt-15">
      <set-node-price-dialog @on-success="handleSuccess" />
    </div>
    <!-- <div class="mt-15">
      <v-btn x-large rounded @click="stakeNode" >
        <v-icon class="mr-5">mdi-currency-usd</v-icon>
        Set Node Price
      </v-btn>
    </div> -->

  </div>
</template>
<script>

import StakeNodeDialog from './nodes/components/stake-node-dialog'
import SetNodePriceDialog from './nodes/components/set-node-price-dialog'

export default {
  components: { StakeNodeDialog, SetNodePriceDialog },
  data: () => ({

  }),
  methods: {
    handleSuccess() {
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  text-align: center;
}
</style>

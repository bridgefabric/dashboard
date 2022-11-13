<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn x-large rounded v-bind="attrs" v-on="on">
        <v-icon class="mr-3">mdi-currency-usd</v-icon>
        Set Node Price
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Set Node Price</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-text-field
                v-model="node"
                label="Node ID"
                :rules="rule.node"
                required
            ></v-text-field>
            <v-text-field v-model.number="amount" label="Amount" :rules="rule.amount" :min="1" type="number" required>
            </v-text-field>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        <v-btn
            color="primary"
            text
            @click="handleSubmit"
            :loading="submitting">Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import { setNodePrice, SetNodePriceSuccess } from '@/utils/ethers'

export default {
  data: () => ({
    dialog: false,
    valid: false,
    serverItems: [],
    loadingServer: false,
    submitting: false,
    node: '',
    amount: 0,
    rule: {
      node: [
        v => !!v || 'Node is required'
      ],
      amount: [
        v => !!v || 'Amount is required'
      ]
    }
  }),
  methods: {
    async handleSubmit() {
      this.submitting = true

      // const form = { ...this.form }
      const pay = await setNodePrice(this.node, this.amount)
      if (pay !== SetNodePriceSuccess) {
        // faild
        this.$message.warning('set node price failed' + pay)
      } else {
        this.$message.success('set node price success')
      }
      this.submitting = false
      this.dialog = false
    }
  }
}
</script>

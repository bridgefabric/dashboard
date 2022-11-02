<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn x-medium rounded v-bind="attrs" v-on="on">
        <v-icon class="mr-3">mdi-wallet</v-icon>
        Buy Count
      </v-btn>
      <!-- <v-btn fab v-bind="attrs" color="primary" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Buy acotor call amount form node</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-content
            >NodeID: {{node}}</v-content>
            <v-text-field
                v-model="form.actor"
                label="Actor CID"
                :rules="rule.actor"
                required
            ></v-text-field>
            <v-text-field
                v-model.number="form.amount"
                label="Amount"
                :rules="rule.amount"
                :min="1"
                type="number"
                required
            ></v-text-field>
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
            :loading="submitting">Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import { countBuy, PaySuccess } from '@/utils/store'

export default {
  props: ['node'],
  data: () => ({
    dialog: false,
    valid: false,
    serverItems: [],
    loadingServer: false,
    submitting: false,
    form: {
      name: '',
      host: '',
      port: null,
      out_port: null
    },
    rule: {
      actor: [
        v => !!v || 'Actor is required'
      ],
      amount: [
        v => !!v || 'Amount is required'
      ]
    }
  }),
  methods: {
    async handleSubmit() {
      this.submitting = true

      const form = { ...this.form }
      const pay = await countBuy(this.node, form.actor, form.amount)
      if (pay !== PaySuccess) {
        // faild
        this.$message.warning('buy failed')
      } else {
        this.$message.success('buy success')
      }
      this.submitting = false
      this.dialog = false
    }
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn x-large rounded v-bind="attrs" v-on="on">
        <v-icon class="mr-3">mdi-resistor-nodes</v-icon>
        Stake Node
      </v-btn>
      <!-- <v-btn fab v-bind="attrs" color="primary" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Stake Node</span>
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
            :loading="submitting">Stake
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import { stakeNode, PaySuccess } from '@/utils/store'

export default {
  data: () => ({
    dialog: false,
    valid: false,
    serverItems: [],
    loadingServer: false,
    submitting: false,
    node: '',
    rule: {
      node: [
        v => !!v || 'Node is required'
      ]
    }
  }),
  methods: {
    async handleSubmit() {
      this.submitting = true

      // const form = { ...this.form }
      const pay = await stakeNode(this.node)
      if (pay !== PaySuccess) {
        // faild
      }
      this.submitting = false
      this.dialog = false
    }
  }
}
</script>

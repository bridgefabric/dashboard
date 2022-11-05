<template>
  <v-dialog
      v-model="dialog"
      max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn x-medium rounded v-bind="attrs" v-on="on">
        <v-icon class="mr-3">mdi-search-web</v-icon>
        Query Count
      </v-btn>
      <!-- <v-btn fab v-bind="attrs" color="primary" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Query acotor call amount left</span>
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
            <v-content class="text-center" style="color: rgb(253 224 71);" >Count Left: {{left}}</v-content>
          </v-container>
        </v-form>
        <!-- <v-div margin-top="300"></v-div> -->
        <!-- <v-btn color="primary" text @click="getAmount" :loading="submitting">Query
        </v-btn> -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" text @click="getAmount" :loading="submitting">Query
        </v-btn>
        <!-- <v-btn
            color="primary"
            text
            @click="handleSubmit"
            :loading="submitting">Save
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import { countCurrent } from '@/utils/ethers'

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
    left: 'N/A',
    rule: {
      actor: [
        v => !!v || 'Actor is required'
      ]
    }
  }),
  methods: {
    async getAmount() {
      this.submitting = true

      const form = { ...this.form }
      this.left = await countCurrent(this.node, form.actor, form.amount)
      this.submitting = false
      // this.$message.success('success')
    }
  }
}
</script>

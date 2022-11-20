<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn fab v-bind="attrs" color="primary" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">New Actor</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-text-field v-model="form.cid" label="CID" :rules="rule.cid" required></v-text-field>
            <v-text-field
                v-model="form.name"
                label="Name"
                :rules="rule.name"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.desc"
                label="Description"
                :rules="rule.desc"
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
import { storeObj } from '@/utils/w3s'
import { addActor, Success } from '@/utils/actor'

export default {
  data: () => ({
    dialog: false,
    valid: false,
    serverItems: [],
    loadingServer: false,
    submitting: false,
    form: {
      cid: '',
      name: '',
      desc: ''
    },
    rule: {
      name: [
        v => !!v || 'Name is required'
      ],
      desc: [
        v => !!v || 'Description is required'
      ],
      cid: [
        v => !!v || 'CID is required'
      ],
      out_port: [
        v => !!v || 'Expose port is required'
      ]
    }
  }),
  methods: {
    async handleSubmit() {
      this.submitting = true

      const form = { ...this.form }
      const cid = await storeObj(form)
      console.log(cid)
      const res = await addActor(form.cid, cid)
      if (res !== Success) {
        // faild
        this.$message.warning('add failed' + res)
      } else {
        this.$message.success('add success')
      }

      this.submitting = false
      this.dialog = false
    }
  }
}
</script>

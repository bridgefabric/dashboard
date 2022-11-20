<template>
  <div>
    <h3 class="font-weight-thin text-h3 mt-10">{{ total }} Actors</h3>
    <v-data-table
        :headers="tableHeaders"
        :items="tableItems"
        :loading="loading"
        :page="query.page"
        :items-per-page="query.limit_num"
        sort-by="calories"
        class="elevation-2 mt-15"
        @update:items-per-page="handleCount"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
              v-model="query.name"
              append-icon="mdi-magnify"
              label="Search by name"
              class="pt-10"
              @keydown.enter="handleSearch"
          ></v-text-field>
          <v-spacer></v-spacer>
          <!-- <form-dialog @on-success="handleSearch"/> -->
          <!-- <confirm-dialog @on-success="handleSearch"/> -->
          <form-dialog @on-success="handleSearch"/>
        </v-toolbar>
      </template>
      <!-- <template v-slot:item.action="{ item }">
        <v-btn x-medium rounded @click="viewDetail(item)">
          <v-icon class="mr-3">mdi-wallet</v-icon>
          View detail
        </v-btn>
      </template> -->
      <template v-slot:item.action="{ item }">
        <v-btn x-medium rounded @click="viewDetail(item)">
          <v-icon class="mr-3">mdi-search-web</v-icon>
          View detail
        </v-btn>
      </template>
      <template v-slot:no-data>No data</template>
    </v-data-table>
  </div>
</template>
<script>
// import PemDialog from '@/components/pem-dialog'
// import ConfirmDialog from '@/components/confirm-dialog'
import FormDialog from './components/form-dialog'

import { get } from '@/utils/w3s'

export default {
  // components: { PemDialog, FormDialog, ConfirmDialog },
  components: { FormDialog },
  // components: { ConfirmDialog },
  data: () => ({
    loading: false,
    query: {
      name: '',
      page: 1,
      limit_num: 15
    },
    tableHeaders: [
      { text: 'Name', align: 'start', value: 'name' },
      { text: 'CID', value: 'cid' },
      { text: 'Description', value: 'desc' },
      { text: 'Action', value: 'action' }
    ],
    tableItems: [],
    total: 0
  }),
  created() {
    this.getTableItems()
  },
  methods: {
    handleSearch() {
      // this.query.page = 1
      // this.getTableItems()
    },
    async getTableItems() {
      this.tableItems = [
        { name: 'upperCase', cid: 'bafybeifufo3jngp674qr6nmq4hpnkfdleo43vsohvgotn2dglin3yihwau', desc: 'chenge input to uppercase' },
        { name: 'callActor', cid: 'bafybeiezlskhcuoenhuh4stumq4algnuuv2uvgwymwp7p6augpqno7sg7u', desc: 'chenge input to uppercase then call save to ipfs actor' },
        { name: 'saveToIPFS', cid: 'bafybeig3akf4jm5xerhyh5fm6skzsyhrhdug63fl6eyuov7ggpv7yzsjdq', desc: 'save input to ipfs' }
      ]
      this.total = this.tableItems.length
    },
    handleCount(v) {
      // this.query.limit_num = v
      // this.handleSearch()
    },
    async viewDetail(item) {
      this.$message.warning('under developing, please see description for detail for now')
      const cid = 'bafybeidu62bhmkp6me4itdiqw6qxasl3xrnlcmfvc4zph5xax4o3cxzr5q' // 'bafybeihemxxq2lolsq2oqgkchoyba3v4fdxw4gta2spy6ohggt3eyb3u2y'
      const content = await get(cid)
      console.log(content)
      // const item = ref.data

      // deleteZeroAccessRelay(item.ID).then(_ => {
      //   ref.$close()
      // }).finally(() => {
      //   this.handleSearch()
      // })
    }
  }
}
</script>

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
          <confirm-dialog @on-success="handleSearch"/>
          <pem-dialog @on-success="handleSearch" :data="item"/>
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
import PemDialog from '@/components/pem-dialog'
import ConfirmDialog from '@/components/confirm-dialog'
// import FormDialog from './components/form-dialog'
// import { deleteZeroAccessRelay, fetchZeroAccessRelays } from '@/api'

export default {
  // components: { PemDialog, FormDialog, ConfirmDialog },
  components: { PemDialog, ConfirmDialog },
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
    viewDetail(item) {
      this.$message.warning('under developing, please see description for detail for now')
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

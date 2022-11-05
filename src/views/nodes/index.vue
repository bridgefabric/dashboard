<template>
  <div>
    <h3 class="font-weight-thin text-h3 mt-10">{{ total }} Nodes</h3>
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
      <template v-slot:item.price="{ item }">
        <span>{{ item.price }} BFT</span>
      </template>
      <template v-slot:item.action="{ item }">
        <!-- <v-btn x-medium rounded @click="buy(item)" >
          <form-dialog v-if='visible' :visible.sync='visible' @on-success="buy(item)" />
          <v-icon class="mr-3">mdi-wallet</v-icon>
          Buy Count
        </v-btn> -->
        <form-dialog @on-success="handleSearch" :node="item.node" />
        <get-dialog :node="item.node" />
        <!-- <v-btn x-medium rounded @click="queryAmount(item)" >
          <v-icon class="mr-3">mdi-search-web</v-icon>
          Query Count
        </v-btn> -->
      </template>
      <template v-slot>
        <!-- <v-toolbar flat>
          <v-text-field
              v-model="query.name"
              append-icon="mdi-magnify"
              label="Search by name"
              class="pt-10"
              @keydown.enter="handleSearch"
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar> -->
      </template>
      <template v-slot:no-data>No data</template>
    </v-data-table>
  </div>
</template>
<script>
// import { fetchZeroAccessNodes } from '@/api'
import FormDialog from './components/form-dialog'
import GetDialog from './components/get-dialog'
import { getNodePrice } from '@/utils/ethers'

export default {
  components: { FormDialog, GetDialog },
  data: () => ({
    loading: false,
    query: {
      name: '',
      page: 1,
      limit_num: 15
    },
    tableHeaders: [
      { text: 'NodeID', value: 'node' },
      { text: 'Price per call', value: 'price' },
      { text: 'Action', value: 'action', width: '380px' }
    ],
    tableItems: [],
    total: 0
  }),
  created() {
    this.getTableItems()
  },
  methods: {
    handleSearch() {
      this.query.page = 1
      this.getTableItems()
    },
    async getTableItems() {
      this.loading = true
      this.tableItems = await getNodePrice()
      this.total = this.tableItems.length
      this.loading = false
      // fetchZeroAccessNodes(this.query).then(res => {
      //   this.tableItems = res.data.list || []
      //   this.total = res.data.paginate.total
      // }).finally(() => {
      //   this.loading = false
      // })
    },
    async buy(item) {
      console.log(item)
      // dialog = true
    },
    async queryAmount(item) {},
    handleCount(v) {
      // this.query.limit_num = v
      // this.handleSearch()
    }
  }
}
</script>

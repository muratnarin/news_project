<template>
  <div>
    <b-row class="align-items-center mb-3">
      <b-col lg="8">
        <h5>Top Headlines</h5>
      </b-col>
      <b-col lg="4">
        <b-input @input="onSearch" v-model="searchText" size="sm" placeholder="Search top headlines">
        </b-input>
      </b-col>

    </b-row>

    <b-row cols-xl="3" cols-lg="2" cols-md="1" cols-sm="2" cols="1">
      <b-col
          v-for="item in getNews"
          :key="item.id"
          class="mb-4"
      >
        <b-card no-body class="shadow border-0 rounded">

            <b-card-img :src="item.urlToImage" alt="Image" style="height: 200px"></b-card-img>

              <b-card-body>
                <div class="font-weight-bolder">
                  <a :title="item.title" :href="item.url" target="_blank">
                    <v-clamp autoresize :max-lines="1">
                      {{item.title}}
                    </v-clamp>
                  </a>

                </div>
                <div class="text-secondary small">{{item.source.name}} - {{formattedDate(item.publishedAt)}}</div>
                <v-clamp autoresize :max-lines="3" v-if="item.description" class="text-muted">
                  {{item.description}}
                </v-clamp>
              </b-card-body>

        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-pagination
            v-model="currentPage"
            :total-rows="getTotal"
            :per-page="perPage"
            aria-controls="my-table"
            @change="onChangePage"
        ></b-pagination>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {debounce} from 'lodash'
import VClamp from 'vue-clamp'

export default {
name: "NewsList",
  components: {VClamp},
  data:() => ({
    searchText: null,
    perPage: 8,
    currentPage: 1,
  }),
  computed:{
    ...mapGetters({
      getNews: 'getNews',
      getTotal: 'getTotal'
    }),
  },
  methods:{
    ...mapActions({
      fetchNews: 'fetchNews',
      fetchFilteredNews: 'fetchFilteredNews',
    }),

    formattedDate(date){
      let fDate = new Date(date)
      return [fDate.getDate(), fDate.getMonth()+1, fDate.getFullYear()].join('/')
    },
    onSearch(){
      this.currentPage = 1
        this.filterNews(this.searchText, 1, this)
    },
    onChangePage(page){
      this.filterNews(this.searchText, page, this)
    },
    filterNews: debounce((search, page, vm)=>{
      vm.fetchFilteredNews( {searchText:search, page:page})
    }, 500)

  },
  created() {
    this.fetchNews()
  }
}
</script>

<style scoped>
</style>

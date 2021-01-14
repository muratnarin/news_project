<template>
  <div>
    <b-row class="align-items-center mb-3">
      <b-col>
        <h4>Top Headlines</h4>
      </b-col>
      <b-col>
        <b-input @input="onSearch" v-model="searchText" size="sm" placeholder="Search top headlines">
        </b-input>
      </b-col>

    </b-row>

    <b-row cols="1">
      <b-col
          v-for="item in getNews"
          :key="item.id"
          class="mb-4"
      >
        <b-card no-body class="overflow-hidden" style="max-height: 200px">
          <b-row no-gutters>
            <b-col md="5">
              <b-card-img :src="item.urlToImage" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="7">
              <b-card-body>
                <h6>
                  <router-link :title="item.title" to="#">
                    {{ item.title.length > 200 ? item.title.substring(0,200) + '...' : item.title}}
                  </router-link>
                </h6>
                <div class="text-secondary small">{{item.source.name}} - {{formattedDate(item.publishedAt)}}</div>
                <b-card-text v-if="item.description" class="text-muted">
                  {{item.description.substring(0,500)}}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
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

export default {
name: "NewsList",
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
          +' '+ [fDate.getHours(), fDate.getMinutes()].join(':');
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

<template>
  <div>
    <b-row v-if="newspaper">
      <b-col  lg="3" md="5">
        <h5 class="mb-4">Info</h5>
        <b-card body-class="text-center shadow  rounded" class="border-0 mb-4">
          <div class="d-flex w-100 large justify-content-end align-items-center h5">
            <a class="d-flex" :href="newspaper.url" target="_blank">
              <b-icon
                  v-b-tooltip.hover="'To official website'"
                  icon="newspaper"
                  variant="warning"
                  class="mr-2"
              ></b-icon>
            </a>

            <b-icon
                v-b-tooltip.hover="isFav ? 'Remove from favourites' : 'Add to favourites'"
                :icon="isFav ? 'heart-fill' : 'heart'"
                :variant="isFav ? 'danger' : 'secondary'"
                class="cursor-pointer"
                @click="toFav(newspaper)"
            ></b-icon>
          </div>
          <h5>{{ newspaper.name }}</h5>
          <b-card-text v-if="newspaper.description" class="text-muted">
            {{newspaper.description}}
          </b-card-text>
        </b-card>
      </b-col>
      <b-col  lg="9" md="7">
        <b-row class="align-items-center mb-3">
          <b-col lg="8">
            <h5>News From {{ newspaper.name }}</h5>
          </b-col>
          <b-col lg="4">
            <b-input @input="onSearch" v-model="searchText" size="sm" placeholder="Search top headlines">
            </b-input>
          </b-col>

        </b-row>
        <b-row cols-xl="3" cols-lg="2" cols-md="1" cols-sm="2" cols="1">
          <b-col
              v-for="item in getCurrentNews"
              :key="item.id"
              class="mb-4"
          >
            <b-card no-body class="overflow-hidden shadow border-0 rounded" style="max-height: 500px">

              <b-card-img :src="item.urlToImage" alt="Image" class="rounded-top" block style="height: 150px; width: auto; overflow: hidden"></b-card-img>

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
      </b-col>
    </b-row>
    <b-row v-else align-v="center">
      <b-col class="d-flex justify-content-center">
        <b-card body-class="bg-warning text-center">
          <h2>We couldn't found a newspaper with id: "{{$route.params.id}}"</h2>
          <b-button to="/">Return to main page</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {debounce} from 'lodash'
import VClamp from 'vue-clamp'

export default {
  name: "Newspaper",
  components: {VClamp},
  data:() =>({
    searchText: null,
  }),
  computed: {
    ...mapGetters({
      getCurrentNews: 'getCurrentNews',
      getNewspapers: 'getNewspapers',
      getFavs: 'getFavs'
    }),
    newspaper() {
      return this.getNewspapers.find(v => v.id === this.$route.params.id)
    },
    isFav() {
      return this.getFavs.some(v=> v.id === this.newspaper.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentNews: 'fetchCurrentNews',
      fetchFilteredCurrentNews: 'fetchFilteredCurrentNews'
    }),
    ...mapMutations({
      setFav: 'SET_FAV',
      removeFav: 'REMOVE_FAV'
    }),
    toFav(item) {
      if (this.isFav) {
        this.removeFav(item)
      } else {
        this.setFav(item)
      }
    },
    formattedDate(date) {
      let fDate = new Date(date)
      return [fDate.getDate(), fDate.getMonth() + 1, fDate.getFullYear()].join('/')
          + ' ' + [fDate.getHours(), fDate.getMinutes()].join(':');
    },
    onSearch(){
      this.currentPage = 1
      this.filterNews(this.searchText, this.$route.params.id, this)
    },
    filterNews: debounce((search, source, vm)=>{
      vm.fetchFilteredCurrentNews( {searchText:search, source:source})
    }, 500)
  },
  created() {
    console.log(this.$route.params.id)
    this.fetchCurrentNews(this.$route.params.id)
  },
}

</script>

<style scoped>
.cursor-pointer{
  cursor:pointer;
}
</style>

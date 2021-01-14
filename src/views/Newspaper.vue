<template>
  <div>
    <b-row v-if="newspaper">
      <b-col md="3">
        <h4>Info</h4>
        <b-card body-class="text-center">
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
          <h6>{{ newspaper.name }}</h6>
          <b-card-text v-if="newspaper.description" class="text-muted">
            {{newspaper.description}}
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <h4>News From {{ newspaper.name }}</h4>
        <b-row cols="1">
          <b-col
              v-for="item in getCurrentNews"
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
                    <div class="text-secondary small">{{ item.source.name }} - {{ formattedDate(item.publishedAt) }}
                    </div>
                    <b-card-text v-if="item.description" class="text-muted">
                      {{ item.description.substring(0, 200) }}
                    </b-card-text>

                  </b-card-body>
                </b-col>
              </b-row>
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

export default {
  name: "Newspaper",
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
      fetchCurrentNews: 'fetchCurrentNews'
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

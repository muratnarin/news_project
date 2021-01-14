<template>
  <div>
        <h4 class="mb-3">All Newspapers</h4>
        <b-list-group>
          <b-list-group-item
              v-for="(item,index) in getNewspapers"
              :key="index"
              class="d-flex justify-content-between align-items-center"
              button
              @click="$router.push('/newspaper/' + item.id)"
          >
              {{ item.name }}
          </b-list-group-item>
        </b-list-group>
  </div>
</template>

<script>
import {mapActions , mapGetters, mapMutations} from 'vuex'
export default {
name: "NewsList",
  computed:{
    ...mapGetters({
      getNewspapers: 'getNewspapers'
    })
  },
  methods:{
    ...mapActions({
      fetchNewspapers: 'fetchNewsPapers',

    }),
    ...mapMutations({
      setFav: 'SET_FAV',
      removeFav: 'REMOVE_FAV'
    }),
    toFav(item) {
      item.isFav = !item.isFav
      if (item.isFav) {
        this.setFav(item)
      } else {
        this.removeFav(item)
      }
    },
  },
  created() {
    this.fetchNewspapers()
  }
}
</script>

<style scoped>
</style>

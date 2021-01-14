<template>
  <div v-if="getFavs.length > 0">
        <h4>Favourites</h4>
        <b-list-group>
          <b-list-group-item
              v-for="item in getFavs"
              :key="item.id"
              button
              @click="$router.push('/newspaper/' + item.id)"
          >{{ item.name }}
          </b-list-group-item>
        </b-list-group>
  </div>
</template>

<script>
import {mapActions , mapGetters} from 'vuex'
export default {
name: "NewsList",
  computed:{
    ...mapGetters({
      getFavs: 'getFavs'
    })
  },
  methods:{
    ...mapActions({
      fetchNewspapers: 'fetchNewsPapers'
    })
  },
}
</script>

<style scoped>

</style>

<template>
  <b-row>
    <b-col md="3">
      <fav-list class="mb-4"></fav-list>
      <newspaper-list></newspaper-list>
    </b-col>
    <b-col md="9">
      <news-list></news-list>
    </b-col>

  </b-row>
</template>

<script>
// @ is an alias to /src
import NewspaperList from "@/components/NewspaperList";
import NewsList from "@/components/NewsList";
import FavList from "@/components/FavList";

export default {
  name: 'Home',
  components: {NewsList, NewspaperList, FavList},
}
</script>

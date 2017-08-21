<template>
  <div id="app" class="container">
    <div class="alert alert-primary row" hidden>
      <div class="loader col-md-auto">
        <div class="loader-pin-1"></div>
        <div class="loader-pin-2"></div>
        <div class="loader-pin-3"></div>
        <div class="loader-pin-4"></div>
        <div class="loader-pin-5"></div>
        <div class="loader-pin-6"></div>
      </div>
      <div class="col">Loading articles</div>
    </div>
    <div class="container">
      <h3>Fresh articles:</h3>
      <div class="media article" v-for="article in articles"
          v-if="isOfGenre(article.tags, $route.params.id)">
        <img class="d-flex mr-3" v-bind:src="article.img" >
        <div class="media-body">
          {{ article.title }}
          <!--<div v-for="tag in article.tags" class="badge badge-secondary">
            {{ tag }}
          </div>-->
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <router-view v-bind:count="articles.filter((a) => isOfGenre(a.tags, $route.params.id)).length"
                     v-bind:state="tagsState"
                     v-on:open="resetTagsState"
                     v-on:compliment="addCompliment"
                     v-on:intersect="addIntersect"
                     v-on:union="addUnion" >
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { articlesRef } from '../firebase'

export default {
  data: function () {
    return{
      tagsState: {}
    };
  },
  methods: {
    isOfGenre: function (genres, genreId) {
      var matchesOr = false, //any
          matchesAnd = 0, //all
          matchesNot = false; //any
      if (genreId==undefined) return true;
      if (genres===undefined) return false;

      var genresId = Object.keys(genres);
      for (var i=0; i<genresId.length; i++)
      {
        matchesAnd += this.tagsState[genres[genresId[i]]]==1 ? 1 : 0;
        matchesOr = matchesOr ||
          genres[genresId[i]]==genreId ||
          this.tagsState[genres[genresId[i]]]==2;
        matchesNot = matchesNot ||
          this.tagsState[genres[genresId[i]]]==3;
      }
      
      matchesAnd = matchesAnd == Object.keys(this.tagsState).filter(
        (x) => this.tagsState[x]==1
      ).length;
      
      return !matchesNot && matchesAnd && matchesOr;
    },
    resetTagsState: function () {
      this.tagsState = {};
    },
    setTagsState: function (genre, state) {
      if (this.tagsState[genre]==state)
        Vue.delete(this.tagsState,genre);
      else
        Vue.set(this.tagsState,genre,state);
    },
    addCompliment: function (genre) {
      this.setTagsState(genre, 3);
    },
    addIntersect: function (genre) {
      this.setTagsState(genre, 1);
    },
    addUnion: function (genre) {
      this.setTagsState(genre, 2);
    },
  },
  firebase: {
    articles: articlesRef,
  },
}
</script>

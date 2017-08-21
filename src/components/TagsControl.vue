<template>
  <div>
    <router-link to="/" class="btn btn-link">
      &larr; back
    </router-link>
    <div>
      <div class="selected-tag">
      </div>
      <div class="selected-header" v-for="tag in tags"
           v-if="$route.params.id==tag['.key']">
        <h1> {{ tag.title }}</h1>
        <span class="badge badge-secondary"> {{ count }} articles</span>
      </div>
    </div>
    <div class="tag-list">
      <tag v-for="tag in tags"
           v-if="$route.params.id!=tag['.key']"
           v-bind:data="tag"
           v-bind:state="state[tag['.key']]"
           v-on:compliment="onCompliment"
           v-on:intersect="onIntersect" 
           v-on:union="onUnion" >
      </tag>
    </div>
    <router-link to="/" class="btn btn-link">
      &larr; back
    </router-link>
  </div>
</template>

<script>
import { firebase, tagsRef } from '../firebase'
import Tag from './Tag'

export default {
  created: function () {
    this.$emit('open');
  },
  components: {
    tag: Tag,
  },
  props: {
    state: {
      type: Object,
    },
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
    onCompliment: function (param) {
      this.$emit('compliment', param);
    },
    onIntersect: function (param) {
      this.$emit('intersect', param);
    },
    onUnion: function (param) {
      this.$emit('union', param);
    },
  },
  firebase: {
    tags: tagsRef,
  },
}
</script>
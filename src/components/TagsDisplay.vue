<template>
  <div>
    <span>Select a tag</span>
    <div class="tag-list">
      <div v-for="tag in tags" class="tag">
        <router-link :to="'/tag/' + tag['.key']">
          <div class="tag-image">
          </div>
          <span class="tag-title">{{ tag.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { tagsRef } from '../firebase'

export default {
  firebase: {
    tags: tagsRef,
  },
}
</script>
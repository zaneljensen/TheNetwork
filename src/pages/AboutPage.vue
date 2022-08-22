<template>
  <div class="about">
    <h1>This is the about page</h1>
    <h1>{{post.body}}</h1>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
export default {
  name: 'AboutPage',
  setup() {
    return {
      post: computed(() => AppState.posts)
    }
  }
}
</script>

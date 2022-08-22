<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10">
                  <form @submit.prevent="handleSubmit">
                  <h4>Create a post</h4>
                   <div class="mb-3">
                    <label for="imgUrl" class="form-label">Add Photo</label>
                     <input type="body" class="form-control" placeholder="Add Image URL..." v-model="editable.imgUrl" >
                   </div>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="editable.body"></textarea>
                </div>
    <button class="btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>


  </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
    setup() {

        const editable = ref({})

        watchEffect(() => { 
            if (!AppState.activePost) { return }
            editable.value = { ...AppState.activePost}
         })

         return {
            editable,
            async handleSubmit() {
                try {
                  if (editable.value.id) {
                    await postsService.editPost(editable.value)
                    Pop.success('Post Edited')
                  } else {
                    await postsService.createPost(editable.value)
                    Pop.success('You created a Post!')
                  }
                  editable.value = {}
                } catch (error) {
                  logger.error('[Create or Edit Post]', error)
                  Pop.error(error)
                    
                }
            }
         }
    }

}
</script>

<style>

</style>
<template>
  <div class="post-card card">
    <div class="card-body">
        <div class="card-title">
           <div class="post-creator" v-if="post.creator">
                <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
                    <img :src="post.creator.picture" alt="" :title="post.creator.name" class="selectable">
                </router-link>
           </div>
           <h5><b>{{post.creator.name}}</b> - {{ new Date(post.createdAt).toLocaleDateString('en-US')}}</h5>
           <p class="text-center">{{post.body}}</p>
           <img class="img-fluid" :src="post.imgUrl" alt="" :title="post.creator.name">
           <p>{{post.likeIds}}</p>
           <div class="div">
            </div>
           <div v-if="post.creator.id == account.id">
            <button @click="toggleEdit">Edit</button>
            <PostForm v-if="editing" />
           </div>

           
        </div>
    </div>
  </div>
</template>

<script>
import { Post } from '../models/Post.js'
import { AppState } from '../AppState.js';
import { computed, ref } from '@vue/runtime-core';

export default {
    props: {
        post: { type: Post, required: true }
    },
    
    setup(props) {

        const editing = ref(false)
        
        return {
            editing,
            account: computed(() => AppState.account),
            toggleEdit() {
                AppState.activePost = props.post
                this.editing = !this.editing
            },
            
            setActivePost() {
                AppState.activePost = props.post
            }

        }
    }



    }

    
    
    
        
</script>

<style lang="scss" scoped>
.post-creator {
  position:relative;
//   bottom: 1rem;
//   right: 1rem;

  img {
    transition: all .15s linear;
    border-radius: 50px;
    height: 55px;
    width: 55px;
    object-fit: cover;
    object-position: center;

    &:hover {
      transform: translateY(-3px);
    }
  }
}

</style>
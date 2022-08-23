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
           <p><b>Likes:</b>  {{post.likeIds.length}}</p> 
           
           <div>
            <button v-if="user.isAuthenticated" @click="likePost(post.id)" class="btn btn-primary">"Like"</button>
            </div>
             <button class="btn btn-primary" v-if="user.isAuthenticated" v-show="post.creator.id == account.id" @click="deletePosts()">Delete</button>

           
        </div>
    </div>
  </div>
</template>

<script>
import { Post } from '../models/Post.js'
import { AppState } from '../AppState.js';
import { computed} from '@vue/runtime-core';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

import { Profile } from '../models/Profile.js';

export default {
    props: {
        post: { type: Object, required: true }
    },
    
    setup(props) {
       
     
        
        
        return {
            
      async likePost(id) {    
        try {
          postsService.likePost(id)   
          } catch (error) {
          
        }
      },
          
        


            user: computed(() => AppState.user),
            account: computed(() => AppState.account),

            async deletePosts() {
              try {
                await postsService.deletePosts(props.post.id);
              } catch (error) {
                logger.error(error)
                Pop.toast(error)
              }
              postsService.deletePosts(props.post.id)
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
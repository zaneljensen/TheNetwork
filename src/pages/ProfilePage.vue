<template>
    <div v-if="profile">
      <div>
    <div class="text-center text-dark">
       <div class="cover-img">
         </div>
       <h1>Welcome: {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
   <p><b>Email:</b> {{ profile.email }}</p>
    <p><b>Github:</b>  {{profile.github}}</p>
    <p><b>Linkedin:</b> {{profile.linkedin}}</p>
    <p><b>Class:</b>  {{profile.class}}</p>
    <p><b>Graduated:</b>{{profile.graduated}}</p>
    <p><b>Bio:</b>  {{profile.bio}}</p>
  </div>
 </div>
       </div>
            
 <div v-for="a in ads" :key="a.id">
          <Adcard :ad="a"/>
       </div>
  
  

 
     <div class="container">
       <div class="row">
         <div class="mx-auto my-3 col-md-10" v-for="p in posts" :key="p.id">
          <PostCard :post="p" />
        </div>
<div class="d-flex justify-content-around">
      
           <button @click="changePage(previousPage)"  class="btn btn-primary" :disabled="!peviousPage">Newer Posts</button>
        
  
           <button @click="changePage(nextPage)" class="btn btn-primary text-end" >Older Posts</button>
        </div>
     </div>
    </div>
      <div class="profile-page" v-if="profile"></div>
    
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { router } from '../router.js';
import { profilesService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
export default {
  setup() {

    const route = useRoute()

    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.profileId)
      } catch (error) {
        logger.error('[GettingProfilePosts]', error)
        Pop.error(error)
      }
    }
    async function getAds() {
          try {
            await adsService.getAds()
          } catch (error) {
            
          }
        }
    
    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
      } catch (error) {
        logger.error('[GettingProfile]', error)
        Pop.error(error)
        router.push({ name: 'Home'})
      }
    }

    onMounted(() => {
      getProfileById()
      getPostsByCreatorId()

    })
   
   onMounted(() => {getAds()})

    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
      posts: computed(() => AppState.profilePosts),
      previousPage: computed(() => AppState.previousPage),
      nextPage: computed(() => AppState.nextPage),
      ads: computed(() => AppState.ads),

      async changePage(url) {
        await postsService.changePage(url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-img{
  height: 300px;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  color: aliceblue;
  background-image: v-bind(cover);

}
</style>
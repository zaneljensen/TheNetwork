<template>
  <div class="container">
    <div class="row">
        <div v-for="a in ads" :key="a.id">
          <Adcard :ad="a"/>
       </div>
     <div>
     <ProfileSearchResult />
     </div>
     <div class="col-md-10 m-auto my-3">
       <PostForm />
      </div>
      <div class="col-md-10">
       <div v-for="p in posts" :key="p.id">
        <PostCard :post="p" />
       </div>
      <div class="d-flex justify-content-around">
      
           <button @click="changePage(previousPage)" class="btn btn-primary" :disabled="!peviousPage">Newer Posts</button>
        
           <button @click="changePage(nextPage)" class="btn btn-primary text-end" :disabled="!nextPage">Older Posts</button>
        </div>
       </div>
      
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
import Adcard from '../components/Adcard.vue';
import { adsService } from '../services/AdsService.js';
// import PostCard from '../components/PostCard.vue';

export default {
    setup() {
        async function getPosts() {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                logger.error("Getting Posts", error);
                Pop.error(error);
            }
        }

        async function getAds() {
          try {
            await adsService.getAds()
          } catch (error) {
            
          }
        }

          

        onMounted(() => {getPosts()});
        onMounted(() => {getAds()});

        return {
            posts: computed(() => AppState.posts),
            activePost: computed(() => AppState.activePost),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),
            ads: computed(() => AppState.ads),

            async changePage(url) {
              try {
                 await postsService.changePage(url);
              } catch (error) {
            }
            }
        }; 
    },
    components: { PostCard, PostForm, Adcard }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

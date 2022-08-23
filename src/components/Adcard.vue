<template>
  <div>
    <div class="row">
        <div class="col-12 m-2">
            <img class="img-fluid" :src="ad.banner" alt="">
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {ad: {type: Object, required: true}},
    setup(){
        return {}
    }
}
</script>

<style>

</style>
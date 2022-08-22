<template>
  <div class="container">
    <div class="row my-3">
      <div class="col-md-4">
        <AccountForm />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import AccountForm from '../components/AccountForm.vue'
export default {
    name: "Account",
    setup() {
        return {
            account: computed(() => AppState.account)
        };
    },
    components: { AccountForm }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

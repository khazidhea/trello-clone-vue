<template>
    <v-card>
      <v-card-title v-if="localTask">
        <h1 class="display-1" data-test="title">{{ localTask.title }}</h1>
      </v-card-title>
    </v-card>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  props: {
    id: Number,
    task: Object
  },
  data: () => ({
    localTask: null
  }),
  async created () {
    if (!this.task) {
      this.localTask = await ApiService.get(`tasks/${this.id}`)
    } else {
      this.localTask = this.task
    }
  }
}
</script>

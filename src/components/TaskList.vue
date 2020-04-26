<template>
  <v-row>
    <Task
      v-for="task in tasks"
      :key="task.id"
      :task=task
      data-test="task">
    </Task>
  </v-row>
</template>

<script>
import ApiService from '@/services/api.service'
import Task from '@/components/Task'

export default {
  data: () => ({
    tasks: [],
  }),
  async created () {
    this.tasks = await ApiService.get('tasks')
  },
  components: { Task }
}
</script>

<template>
  <div class="flex gap-1" v-if="availabilities && availabilities.length > 0">
    <template v-for="day in days">
      <div class="flex flex-col items-center w-4">
        <div class="text-gray-400">
          {{ day.label }}
        </div>
        <template v-if="availabilities.includes(day.key)">
          <div class="bg-green-500 rounded-full h-3.5 w-3.5 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z"/>
            </svg>
          </div>
        </template>
        <template v-else>
          <div class="bg-red-500 rounded-full h-3.5 w-3.5 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 13v-2h12v2z"/>
            </svg>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "availability-list",
  props: {
    availabilities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      days: [
        {
          label: 'L',
          key: 'monday'
        },
        {
          label: 'M',
          key: 'tuesday'
        },
        {
          label: 'M',
          key: 'wednesday'
        },
        {
          label: 'J',
          key: 'thursday'
        },
        {
          label: 'V',
          key: 'friday'
        },
        {
          label: 'S',
          key: 'saturday'
        },
        {
          label: 'D',
          key: 'sunday'
        }
      ],
    }
  }
})
</script>

<style scoped>

</style>

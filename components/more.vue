<template>
  <div class="contents">
    <div v-if="isClosed" class="flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="isClosed = false">
      <span class="icon">
        <i class="far fa-ellipsis-v" />
      </span>
    </div>
    <div v-else class="flex flex-col border-2 border-gray-200 w-auto absolute bg-white items-center space-x-8 p-2 right-0 pl-8">
      <button type="button" class="w-auto border border-transparent py-2 text-sm px-4 leading-none rounded font-medium bg-white hover:bg-gray-100 border-2 border-gray-200" @click.prevent="isClosed = true">
        <span>Détails</span>
      </button>
      <button type="button" class="w-auto border border-transparent py-2 text-sm px-4 leading-none rounded font-medium text-white bg-red-500 hover:bg-red-700" @click.prevent="deleteCommand">
        <span>Publier</span>
      </button>
      <div class="flex flex-col px-2 mx-2 cursor-pointer text-gray-300" @click.prevent="isClosed = true">
        <span class="icon">
          <i class="far fa-times fa-lg" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deletePlaceholder: {
      type: Function,
      default: null,
      required: true
    }
  },

  data () {
    return {
      isClosed: true
    }
  },

  methods: {
    deleteCommand () {
      if (this.deletePlaceholder) {
        this.deletePlaceholder()
          .then(() => {
            this.isClosed = true
          })
      }
    }
  }
}
</script>

<style scoped></style>

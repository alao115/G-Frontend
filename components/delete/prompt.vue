<template>
  <div class="contents">
    <div v-if="isClosed" class="flex flex-col px-2 mx-2 cursor-pointer action-link" @click.prevent="isClosed = false">
      <span class="icon">
        <i class="far fa-trash" />
      </span>
    </div>
    <div v-else class="flex border-2 border-gray-200 w-auto absolute bg-white items-center space-x-8 p-2 right-0 pl-8">
      <p class="text-lg">
        Êtes-vous sûr(e) ?
      </p>
      <button type="button" class="w-auto border border-transparent py-2 text-sm px-4 leading-none rounded font-medium bg-white hover:bg-gray-100 border-2 border-gray-200" @click.prevent="isClosed = true">
        <span>Finalement, non</span>
      </button>
      <button type="button" class="w-auto border border-transparent py-2 text-sm px-4 leading-none rounded font-medium text-white bg-red-500 hover:bg-red-700" @click.prevent="isClosed = true">
        <span>Oui, supprimer</span>
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
  data () {
    return {
      isClosed: true
    }
  }
}
</script>

<style scoped></style>

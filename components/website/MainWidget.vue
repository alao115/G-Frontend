<template>
  <div class="container bg-white rounded-xl h-auto p-10 font-body shadow-btn-shadow">
    <div class="flex w-min mb-8 rounded-md bg-blue-50">
      <button v-for="type in types" :key="type.id" class="flex items-center justify-center py-4 px-8 rounded-md text-sm font-medium hover:bg-blue-990 hover:text-sky-450 focus:outline-none w-min" :value="type">
        {{ type.label }}
      </button>
    </div>
    <form action="#" class="form text-blue-990 border-2 border-gray-200 py-6 rounded-md">
      <div class="flex divide-x divide-gray-320 justify-evenly">
        <div class="px-10 flex items-center">
          <span class="icon mr-4">
            <i class="fas fa-map-marker-alt" />
          </span>
          <label for="#">Localisation</label>
        </div>
        <div class="px-10 flex items-center">
          <span class="icon mr-4">
            <i class="fas fa-home" />
          </span>
          <label class="mr-4" for="#">Nombre de pièces</label>
          <a class="border-2 border-blue-990 px-4 py-2 mr-4 text-blue-990 rounded-md" :class="roomsQty > 1 ? 'hover:bg-blue-990 hover:text-sky-450' : 'opacity-20 bg-gray-400'" @click.prevent=" roomsQty > 1 ? roomsQty-- : '' ">
            <span class="icon">
              <i class="far fa-minus fa-sm" />
            </span>
          </a>
          <label class="mr-4" for="#">{{ roomsQty }}</label>
          <a class="border-2 border-blue-990 px-4 py-2 mr-4 text-blue-990 rounded-md hover:bg-blue-990 hover:text-sky-450" @click.prevent="roomsQty++">
            <span class="icon">
              <i class="far fa-plus fa-sm" />
            </span>
          </a>
        </div>
        <div class="px-10 flex items-center">
          <span class="icon mr-4">
            <i class="fas fa-money-bill-wave-alt" />
          </span>
          <label for="#">Votre budget</label>
        </div>
        <NuxtLink to="#" class="shadow-btn-shadow px-4 mr-10 h-14 border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-sky-550 md:py-4 md:text-lg md:px-10">
          <span class="icon"><i class="fas fa-search" /></span>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roomsQty: 1,
      types: [
        { id: 1, label: 'Chambres', descr: '' },
        { id: 2, label: 'Maison', descr: '' },
        { id: 3, label: 'Appartements meublés', descr: '' }
      ],
      seelctedType: ''
    }
  }
}
</script>

<template>
  <div class="container bg-white rounded-xl h-auto p-10 font-body shadow-btn-shadow -mb-12 bg-opacity-90">
    <div class="flex w-min mb-8 rounded-md bg-blue-50">
      <button
        v-for="type in types"
        :key="type.id"
        class="flex whitespace-nowrap items-center justify-center py-4 px-8 rounded-md text-sm font-medium hover:bg-blue-990 hover:text-white focus:outline-none"
        :class="type.id === selectedType ? 'bg-sky-550 text-white' : ''"
        @click.prevent="selectType(type)"
      >
        {{ type.label }}
      </button>
    </div>
    <form action="#" class="form text-blue-990 border-2 border-gray-200 py-6 rounded-md p-8">
      <div class="flex justify-evenly flex-col divide-y divide-gray-200 ">
        <div class="p-4 pt-0 flex items-center">
          <span class="icon mr-4">
            <i class="fas fa-map-marker-alt" />
          </span>
          <label for="#">Localisation</label>
        </div>
        <!-- <hr class="divider-v bg-gray-200 w-0.5 h-14"> -->
        <div class="p-4 flex items-center">
          <span class="icon mr-4">
            <i class="fas fa-home" />
          </span>
          <label class="mr-4" for="#">Nombre de chambres</label>
          <a class="border-2 border-blue-990 px-4 py-2 mr-4 text-blue-990 rounded-md" :class="roomsQty > 1 ? 'hover:bg-blue-990 hover:text-white' : 'opacity-20 bg-gray-400'" @click.prevent=" roomsQty > 1 ? roomsQty-- : '' ">
            <span class="icon">
              <i class="far fa-minus fa-sm" />
            </span>
          </a>
          <label class="mr-4" for="#">{{ roomsQty }}</label>
          <a class="border-2 border-blue-990 px-4 py-2 mr-4 text-blue-990 rounded-md hover:bg-blue-990 hover:text-white" @click.prevent="roomsQty++">
            <span class="icon">
              <i class="far fa-plus fa-sm" />
            </span>
          </a>
        </div>
        <!-- <hr class="divider-v bg-gray-200 w-0.5 h-14"> -->
        <div class="p-4 pb-0 flex items-center">
          <span class="icon mr-4">
            <i class="fas fa-money-bill-wave-alt" />
          </span>
          <label for="#">Votre budget</label>
        </div>
        <NuxtLink to="#" class="w-max mt-12 shadow-btn-shadow border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-white py-4 text-lg px-10">
          <span>Rechercher</span>
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
      selectedType: 1
    }
  },
  methods: {
    selectType (type) {
      this.selectedType = type.id
    }
  }
}
</script>

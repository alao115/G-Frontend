<template>
  <div class="flex-grow px-6 pt-2 main__content">
    <div class="relative flex pt-3 pb-0 border-t border-b border-gray-300">
      <div class="w-full relative">
        <input id="" type="text" class="h-12 px-10 mt-1 mb-4 block w-full border-gray-200 focus:border-blue-75 bg-gray-100 focus:bg-blue-75 focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" :class="isFilterTrayOpened === true ? 'rounded-t-md' : 'rounded-md'" placeholder="Recherche" />
        <a class="flex items-center h-12 px-3 mt-1 bg-white border border-gray-200 absolute top-0 right-0" :class="isFilterTrayOpened === true ? 'rounded-tr-md' : 'rounded-r-md'" href="#" @click.prevent="isFilterTrayOpened = !isFilterTrayOpened">
          <span class="ml-3 text-sm font-medium">Filtres</span>
          <span class="icon ml-3">
            <i class="far fa-chevron-down fa-sm" />
          </span>
        </a>
        <span class="icon w-8 block absolute left-2 top-5 h-9">
          <i class="far fa-search mx-auto block" />
        </span>
      </div>
      <div class="grid grid-cols-2 divide-x-2 divide-gray-300">
        <a class="flex items-center h-12 px-3 mt-1 ml-2 hover:bg-blue-75" :class="isListLayout ? 'text-blue-730' : 'text-gray-400'" href="#" @click.prevent="isListLayout = true">
          <span class="icon w-6 block">
            <i class="far fa-th-list mx-auto block fa-lg" />
          </span>
        </a>
        <a class="flex items-center h-12 px-3 mt-1 hover:bg-blue-75" :class="isListLayout ? 'text-gray-400' : 'text-blue-730'" href="#" @click.prevent="isListLayout = false">
          <span class="icon w-6 block">
            <i class="far fa-th-large mx-auto block fa-lg" />
          </span>
        </a>
      </div>
    </div>
    <div class="flex flex-col w-full table__container">
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400"/>
        </div>
        <div class="flex items-center w-12 h-10 px-2 text-xs"><span>ID</span></div>
        <div class="flex items-center w-24 h-10 px-2 text-xs"><span>TYPE</span></div>
        <div class="flex items-center w-40 h-10 px-2 text-xs"><span>LOCALISATION</span></div>
        <div class="flex items-center w-20 h-10 px-2 text-xs"><span>LOYER</span></div>
        <div class="flex items-center w-24 h-10 px-2 text-xs"><span>ETAT</span></div>
        <div class="flex items-center w-36 h-10 px-2 text-xs"><span>STATUS</span></div>
        <div class="flex items-center w-48 h-10 px-2 text-xs"><span>NIVEAU</span></div>
      </div>
      <div class="overflow-auto custom__scroll">
        <div v-for="member in customMembers" :key="member.id" class="flex flex-shrink-0 py-1 text-sm">
          <div class="flex items-center w-min h-10 px-2">
            <input v-model="selectedMembers" type="checkbox" :value="member" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400"/>
          </div>
          <div class="flex items-center w-12 h-10 px-2"><span></span></div>
          <div class="flex items-center w-24 h-10 px-2"><span></span></div>
          <div class="flex items-center w-40 h-10 px-2"><span></span></div>
          <div class="flex items-center w-20 h-10 px-2"><span></span></div>
          <div class="flex items-center w-24 h-10 px-2"><span></span></div>
          <div class="flex items-center w-36 h-10 px-2"><span></span></div>
          <div class="flex items-center w-48 h-10 px-2"><span></span></div>
        </div>
      </div>
      <div class="flex flex-shrink-0 bg-blue-75 py-1 font-medium">
        <div class="flex items-center w-min h-10 px-2">
          <input type="checkbox" name="email" class="appearance-none w-6 h-6 border border-gray-300 rounded-sm outline-none cursor-pointer checked:bg-blue-400"/>
        </div>
        <div class="flex items-center w-12 h-10 px-2 text-xs"><span>ID</span></div>
        <div class="flex items-center w-24 h-10 px-2 text-xs"><span>TYPE</span></div>
        <div class="flex items-center w-40 h-10 px-2 text-xs"><span>LOCALISATION</span></div>
        <div class="flex items-center w-20 h-10 px-2 text-xs"><span>LOYER</span></div>
        <div class="flex items-center w-24 h-10 px-2 text-xs"><span>ETAT</span></div>
        <div class="flex items-center w-36 h-10 px-2 text-xs"><span>STATUS</span></div>
        <div class="flex items-center w-48 h-10 px-2 text-xs"><span>NIVEAU</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      title: 'Publications',
      isListLayout: true,
      isFilterTrayOpened: false
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>

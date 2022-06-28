<template>
  <div class="contents">
    <a v-if="isDropdown" class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200 text-blue-730 bg-blue-75" @click.prevent="isDismissed = false">
      <span class="icon w-6 block">
        <i class="far fa-house mx-auto block" />
      </span>
      <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Appartements</span>
    </a>
    <a v-else-if="isMobile && connectedUser && (connectedUser.user.userType === userRole.ADMIN || connectedUser.user.userType === userRole.PUBLISHER)" class="flex lg:hidden items-center border border-transparent font-medium rounded-full text-white bg-sky-550 hover:bg-blue-920 text-lg h-16 w-16 justify-center absolute right-8 bottom-20" href="#" @click.prevent="isDismissed = false">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </a>
    <a v-else :class="isMinified ? 'px-2' : 'px-10'" class="hidden lg:flex items-center w-full border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 py-4 text-lg" href="#" @click.prevent="isDismissed = false">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span class="ml-3 text-sm font-medium" :class="isMinified === true ? 'hidden' : ''">Nv. appartment</span>
    </a>
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen fixed top-0 right-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class=" flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md h-full lg:h-5/6 justify-between relative" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full h-full lg:p-8 z-20 relative lg:h-9/12">
          <div class="p-4">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              Nouvelle location
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <p v-if="currentStep !== 'congrats' && currentStep !=='photos'" class="text-lg mt-4 text-gray-600">
              Veuillez remplir ce formulaire pour enregistrer un nouveau local
            </p>
            <p v-if="currentStep === 'photos'" class="text-lg mt-4 text-gray-600">
              Veuillez rajouter les photos du nouveau local
            </p>
          </div>
          <div v-if="currentStep === 'first'" class="first overflow-scroll h-4/5 pb-16 p-4">
            <div class="relative">
              <label for="toggleA" class="flex items-center cursor-pointer mt-8">
                <!-- toggle -->
                <div class="relative">
                  <!-- input -->
                  <input
                    id="toggleA"
                    v-model="newAppartment.forShortStay"
                    type="checkbox"
                    class="sr-only checkbox"
                    value="true"
                  >
                  <!-- line -->
                  <div class="block line w-10 h-6 rounded-full" />
                  <!-- dot -->
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" />
                </div>
                <!-- label -->
                <div class="ml-3 text-gray-700 font-medium">
                  Court séjour ? <span class="text-sky-550">{{ newAppartment.forShortStay === true ? 'Oui' : 'Non' }}</span>
                </div>
              </label>
              <label for="toggleB" class="flex items-center cursor-pointer mt-8">
                <!-- toggle -->
                <div class="relative">
                  <!-- input -->
                  <input
                    id="toggleB"
                    v-model="newAppartment.isFurnished"
                    type="checkbox"
                    class="sr-only checkbox"
                    value="true"
                  >
                  <!-- line -->
                  <div class="block line w-10 h-6 rounded-full" />
                  <!-- dot -->
                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" />
                </div>
                <!-- label -->
                <div class="ml-3 text-gray-700 font-medium">
                  Meublé ?  <span class="text-sky-550">{{ newAppartment.isFurnished === true ? 'Oui' : 'Non meublé' }}</span>
                </div>
              </label>
            </div>
            <div class="relative">
              <p class="text-base mt-8 text-gray-400">
                Type
              </p>
              <button class="flex items-center justify-between w-full m-h-12 md:h-16 mt-2 mb-4 p-4 text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="typeSelectIsOpen = !typeSelectIsOpen">
                <span v-if="!newAppartment.appartmentType" class="leading-none">
                  Choisissez un type
                </span>
                <p v-else class="leading-none text-left flex flex-col">
                  {{ newAppartment.appartmentType && appartmentType(newAppartment.appartmentType).label }}
                  <span class="text-sm mt-1 text-gray-400">{{ newAppartment.appartmentType && appartmentType(newAppartment.appartmentType).description }}</span>
                </p>
                <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="typeSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                <!-- <input class="flex items-center h-8 px-3 text-sm border-b border-black hover:bg-gray-200 focus:outline-none" type="search" name="" id="" placeholder="Search…"> -->
                <a v-for="type in appartmentTypes" :key="type.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="newAppartment.appartmentType = type.id, typeSelectIsOpen = false">
                  {{ type.label }}
                  <span class="text-gray-400">{{ type.description }}</span>
                </a>
              </div>
            </div>
            <p class="text-base mt-8 text-gray-400">
              Détails
            </p>
            <!-- <textarea v-model="newAppartment.details" type="text" class="w-full h-48 md:h-16 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 focus:placeholder-blue-380 relative" placeholder="Détails sur la maison, l'adresse, etc.. " /> -->
            <textarea v-model="newAppartment.details" type="text" class="w-full h-16 md:h-24 pr-4 pl-4 my-1 relative placeholder-gray-320 border-gray-320 rounded-md focus:placeholder-sky-550 focus:border-sky-550" placeholder="Détails sur la maison, l'adresse, etc.. " />
            <p class="text-base mt-4 text-gray-400">
              Loyer
            </p>
            <div class="flex space-x-8">
              <input v-model.number="newAppartment.rent" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <div class="relative w-2/3">
                <button class="flex items-center w-full m-h-12 md:h-16 mb-4 p-4 text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="paymentFrequenciesIsOpen = !paymentFrequenciesIsOpen">
                  <span v-if="selectedPaymentFrequency === ''" class="leading-none">
                    <span class="hidden lg:block">Choisissez une fréquence</span>
                    <span class="block lg:hidden">Fréquence</span>
                  </span>
                  <p v-else class="leading-none text-left flex flex-col py-8">
                    {{ paymentFrequencies.find(frequency => frequency.id === selectedPaymentFrequency).label }}
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="paymentFrequenciesIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <!-- <input class="flex items-center h-8 px-3 text-sm border-b border-black hover:bg-gray-200 focus:outline-none" type="search" name="" id="" placeholder="Search…"> -->
                  <a v-for="frequency in paymentFrequencies" :key="frequency.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedPaymentFrequency = frequency.id, paymentFrequenciesIsOpen = false">
                    {{ frequency.label }}
                    <span class="text-gray-400">{{ frequency.description }}</span>
                  </a>
                </div>
              </div>
            </div>
            <p v-if="newAppartment.forShortStay === false" class="text-base mt-4 text-gray-400">
              Caution Loyer
            </p>

            <div v-if="newAppartment.forShortStay === false" class="flex space-x-8">
              <input v-model.number="newAppartment.conditions.prepaidRentMonths" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <input :value="newAppartment.conditions.prepaidRentMonths * newAppartment.rent" type="number" class="w-2/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
            </div>
            <p class="text-base mt-4 text-gray-400">
              Caution eau / electricité
            </p>

            <div class="flex space-x-8">
              <input v-model.number="newAppartment.conditions.energyCommission" type="number" class="w-2/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
            </div>
            <div class="relative col-span-2 mb-16 lg:mb-8">
              <p class="text-base mt-4 text-gray-400">
                Localisation
              </p>
              <input ref="searchTextField" type="text" placeholder="Ex: Cotonou" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative">
            </div>
          </div>
          <div v-if="currentStep === 'second'" class="second overflow-scroll h-4/5 pb-16 p-4">
            <p class="text-2xl mb-4 text-gray-400 font-normal">
              Caratéristiques
            </p>
            <div class="grid grid-cols-2 mb-8 lg:mb-0 gap-4">
              <div class="w-full relative mb-4">
                <p class="text-base mt-1 text-gray-400">
                  Chambre(s)
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.bedrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-bed-alt fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative mb-4">
                <p class="text-base mt-1 text-gray-400">
                  Salon(s)
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.livingrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-couch fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Cuisine(s)
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.kitchen" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-oven fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Salle(s) d'eau
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.bathrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-shower text-xl" /> / <i class="far fa-toilet text-xl" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Débarras
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.storageroom" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-cabinet-filing fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Garage
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.garage" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-garage-open fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Balcon / Terrasse
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.terrace" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-garage-open fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Gardien
                </p>
                <div class="relative">
                  <select v-model="newAppartment.keeper" class="w-full mt-1 h-12 md:h-16 pl-16 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                    <option v-for="(choice, count) in keeperSelect" :key="count" :value="choice.value">
                      <span class="">{{ choice.label }}</span>
                    </option>
                  </select>
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-user-shield fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Jardin
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.garden" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-flower-daffodil fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Piscine
                </p>
                <div class="relative">
                  <select v-model="newAppartment.pool" class="w-full mt-1 h-12 md:h-16 pl-16 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                    <option v-for="(choice, count) in poolSelect" :key="count" :value="choice.value">
                      <span class="">{{ choice.label }}</span>
                    </option>
                  </select>
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-swimming-pool fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Niveau
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.groundLevel" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-list-ol fa-lg" />
                  </span>
                </div>
              </div>
              <div class="w-full relative">
                <p class="text-base mt-1 text-gray-400">
                  Voisinage
                </p>
                <div class="relative">
                  <input v-model.number="newAppartment.householdsTotal" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                  <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                    <i class="far fa-users fa-lg" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'third'" class="third overflow-scroll h-4/5 pb-16 p-4">
            <p class="text-2xl mt-12 text-gray-400 font-normal">
              Infos sur le propriétaire
            </p>
            <div class="grid grid-cols-2 mb-4">
              <div class="relative pr-4">
                <p class="text-base mt-8 text-gray-400">
                  Civilité
                </p>
                <button class="flex items-center w-full m-h-12 md:h-16 mt-2 p-4 text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="civilitySelectIsOpen = !civilitySelectIsOpen">
                  <span v-if="selectedCivility === ''" class="leading-none">
                    <span class="hidden lg:block">Choisissez un type</span>
                    <span class="block lg:hidden">Civilité</span>
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ civilities.find(civility => civility.id === selectedCivility).value }}
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="civilitySelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <a v-for="civility in civilities" :key="civility.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedCivility = civility.id, civilitySelectIsOpen = false">
                    {{ civility.value }}
                  </a>
                </div>
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-8 text-gray-400">
                  Est vivant(e)
                </p>
                <button class="flex items-center w-full m-h-12 md:h-16 mt-2 p-4 text-base border appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="livingStatusSelectIsOpen = !livingStatusSelectIsOpen">
                  <span v-if="ownerInfos && ownerInfos.isAlive === ''" class="leading-none">
                    -
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ ownerInfos && ownerInfos.isAlive && ownerInfos.isAlive === true ? "Vivant(e)" : 'Décédé(e)' }}
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="livingStatusSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <a class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="ownerInfos.isAlive = true, livingStatusSelectIsOpen = false">
                    Vivant(e)
                  </a>
                  <a class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="ownerInfos.isAlive = false, livingStatusSelectIsOpen = false">
                    Décédée(e)
                  </a>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 mb-4">
              <div class="relative pr-4">
                <p class="text-base mt-1 text-gray-400">
                  Prénom
                </p>
                <input v-model="ownerInfos.firstname" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Prénom">
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-1 text-gray-400">
                  Nom
                </p>
                <input v-model="ownerInfos.lastname" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Nom">
              </div>
            </div>
            <div class="grid grid-cols-2 mb-4">
              <div class="relative pr-4">
                <p class="text-base mt-1 text-gray-400">
                  Téléphone
                </p>
                <input v-model="ownerInfos.phone" type="number" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Téléphone">
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-1 text-gray-400">
                  Email
                </p>
                <input v-model="ownerInfos.email" type="email" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Email">
              </div>
            </div>
            <div class="w-full relative">
              <p class="text-base mt-1 text-gray-400">
                Adresse
              </p>
              <textarea v-model="ownerInfos.address" type="text" class="w-full h-16 md:h-24 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Détails sur la maison, l'adresse, etc.. " />
            </div>
            <div class="retative text-center mt-4 my-8">
              <a href="#" class="py-4 px-8 w-full text-gray-400 border border-gray-300 rounded-md hover:bg-blue-920 hover:text-white" @click.prevent="currentStep='photos'">Rajouter les photos maintenant</a>
            </div>
          </div>
          <div v-if="currentStep === 'photos'" class="photos overflow-scroll h-4/5 pb-16 p-4">
            {{ appartImg }}
            <p class="text-lg my-2 text-gray-400">
              Photo principale <span class="text-base">(Veuillez choisir une photo en mode paysage)</span>
            </p>
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col w-full py-8 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div class="flex flex-col items-center justify-center pt-7">
                  <template v-if="!mainImg">
                    <span class="icon text-gray-400">
                      <i class="fal fa-image fa-5x" />
                    </span>
                    <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                      Choisissez la photo principale
                    </p>
                  </template>
                  <template v-else>
                    <img :src="mainImg" alt="">
                  </template>
                </div>
                <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'main')">
              </label>
            </div>
            <p class="text-lg mt-4 mb-2 text-gray-400">
              Autres photos
            </p>
            <div class="grid grid-cols-4 justify-items-stretch gap-4">
              <div class="flex items-center justify-center">
                <label class="flex flex-col w-full py-1 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <template v-if="!firstImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 1
                      </p>
                    </template>
                    <template v-else>
                      <img :src="firstImg" alt="" class="w-full h-full">
                    </template>
                  </div>
                  <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'first')">
                </label>
              </div>
              <div class="flex items-center justify-center">
                <label class="flex flex-col w-full py-1 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <template v-if="!secondImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 2
                      </p>
                    </template>
                    <template v-else>
                      <img :src="secondImg" alt="">
                    </template>
                  </div>
                  <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'second')">
                </label>
              </div>
              <div class="flex items-center justify-center">
                <label class="flex flex-col w-full py-1 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <template v-if="!thirdImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 3
                      </p>
                    </template>
                    <template v-else>
                      <img :src="thirdImg" alt="">
                    </template>
                  </div>
                  <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'third')">
                </label>
              </div>
              <div class="flex items-center justify-center">
                <label class="flex flex-col w-full py-1 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <template v-if="!fourthImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 4
                      </p>
                    </template>
                    <template v-else>
                      <img :src="fourthImg" alt="">
                    </template>
                  </div>
                  <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'fourth')">
                </label>
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'congrats'" class="congrats h-4/5 flex justify-center items-center">
            <div class="w-full px-16">
              <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
              <p class="text-lg lg:text-3xl -mt-8 lg:mt-12 text-blue-920 text-center">
                Nouvel appartement
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                ajouté avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep === 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0 border border-t-2">
          <button type="button" class="w-full py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true, currentStep = 'first'">
            <span>Retour</span>
          </button>
        </div>
        <div v-else class="footer p-4 lg:p-8 lg:py-4 flex justify-between absolute w-full bg-white z-20 bottom-0 border border-t-2">
          <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="currentStep === 'first' ? isDismissed = true : currentStep === 'second' ? currentStep = 'first' : currentStep === 'third' ? currentStep = 'second' : currentStep = 'third'">
            <span v-if="currentStep === 'first'">Annuler</span>
            <span v-else>Retour</span>
          </button>
          <button type="button" class="flex relative space-x-2 justify-center w-1/2 shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" @click.prevent="(currentStep === 'third' || currentStep === 'photos') ? createAppartment() : currentStep === 'second' ? currentStep = 'third' : currentStep = 'second'">
            <span v-if="currentStep === 'photos' || currentStep === 'third'">Enregistrer</span>
            <span v-else>Suivant</span>
            <loader v-if="loading" class=" absolute right-4 top-1/2 transform -translate-y-1/2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userRole } from '~/helpers/constants'

export default {
  props: {
    isMinified: {
      type: Boolean,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    isDropdown: {
      type: Boolean,
      default: false
    },
    loadAppartmentsFunc: {
      type: Function,
      required: true
    },
    appartmentTypes: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      keeperSelect: [
        { value: true, label: 'Oui' },
        { value: false, label: 'Non' }
      ],
      poolSelect: [
        { value: true, label: 'Oui' },
        { value: false, label: 'Non' }
      ],
      acSelect: [
        { value: true, label: 'Oui' },
        { value: false, label: 'Non' }
      ],
      currentStep: 'first',
      isDismissed: true,
      typeSelectIsOpen: false,
      civilitySelectIsOpen: false,
      livingStatusSelectIsOpen: false,
      paymentFrequenciesIsOpen: false,
      selectedType: '',
      errorToShow: '',
      details: '',
      civilities: [
        { id: 1, value: 'M.' },
        { id: 2, value: 'Mme' },
        { id: 3, value: 'Autre' }
      ],
      newLocation: {},
      selectedCivility: '',
      isFurnished: false,
      advancePayment: 0,
      paymentFrequencies: [
        { id: 1, value: 'Month', label: 'Paimements par mois' },
        { id: 2, value: 'Week', label: 'Paiements par semaine' },
        { id: 3, value: 'Day', label: 'Paiements par jour' },
        { id: 4, value: 'Night', label: 'Paiements à la nuité' }
      ],
      selectedPaymentFrequency: '',
      newAppartment: {
        keeper: false,
        pool: false,
        ac: false,
        conditions: {
          prepaidRentMonths: 3,
          paymentFrequency: ''
        },
        forShortStay: false,
        ownerInfos: {},
        location: '',
        geometry: {}
        // files: null
      },
      ownerInfos: {},
      contracts: [],
      mainImg: '',
      firstImg: '',
      secondImg: '',
      thirdImg: '',
      fourthImg: '',
      appartImg: null,
      loading: false
    }
  },

  computed: {
    ...mapGetters({
      connectedUser: 'account/authUserAccount'
    }),

    userRole: () => userRole,

    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
    reservation () {
      return id => this.reservations.find(reservation => reservation.id === id)
    },
    visit () {
      return id => this.visits.find(visit => visit.id === id)
    },
    appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    paymentFrequency () {
      return id => this.paymentFrequencies.find(payment => payment.id === id)
    },
    user () {
      return id => this.users.find(user => user.id === id)
    },
    contract () {
      return id => this.contracts.find(contract => contract.id === id)
    }
  },
  watch: {
    conditions (value) {
      if (value.rent !== 0) {
        this.advancePayment = value.rent * value.prepaidRentMonths
      }
    }
  },
  mounted () {
    const input = this.$refs.searchTextField

    const autocomplete = this.$googleAutoComplete(input)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      const geometry = {
        coordinates: [
          place.geometry.location.lng(),
          place.geometry.location.lat()
        ]
      }
      this.newAppartment.geometry = geometry
      this.newAppartment.location = `${(place.formatted_address.split(','))[1]}, ${place.name}`
    })
  },
  methods: {
    uploadPicture (event, source) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        switch (source) {
          case 'main':
            this.mainImg = fileReader.result
            break
          case 'first':
            this.firstImg = fileReader.result
            break
          case 'second':
            this.secondImg = fileReader.result
            break
          case 'third':
            this.thirdImg = fileReader.result
            break
          case 'fourth':
            this.fourthImg = fileReader.result
            break
        }
      })
      fileReader.readAsDataURL(files[0])

      if (!this.appartImg) { this.appartImg = {} }
      this.appartImg[source] = files[0]
    },

    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },

    async createAppartment () {
      try {
        this.loading = true
        this.newAppartment.ownerInfos = { ...this.ownerInfos, civility: this.selectedCivility }
        this.newAppartment.conditions.paymentFrequency = this.selectedPaymentFrequency
        this.newAppartment.rooms = this.newAppartment.livingrooms + this.newAppartment.bathrooms + this.newAppartment.bedrooms + this.newAppartment.storageroom + this.newAppartment.kitchen
        // console.log(this.newAppartment)
        const { data, errors } = await this.$api.appartmentService.create({ variables: { data: this.newAppartment } })

        if (errors) { this.errorToshow = errors[1]?.message }

        if (this.appartImg) {
          for (const key of Object.keys(this.appartImg)) {
            const ImgData = new FormData()
            ImgData.append('file', this.appartImg[key])
            ImgData.append('filePath', `appartments/${data.createAppartment.id}/${key}_${this.appartImg[key].name}`)
            const firestoreResponse = await this.$api.firebaseStorageService.upload(ImgData)
            await this.$api.appartmentService.update({ variables: { appartmentId: data.createAppartment.id, data: { [`${key}Img`]: firestoreResponse.data.data.fileInfo } } })
            // console.log(updateResponse)
          }
        }
        await this.loadAppartmentsFunc()
        this.newAppartment = {
          keeper: false,
          pool: false,
          ac: false,
          conditions: {
            prepaidRentMonths: 3,
            paymentFrequency: ''
          },
          forShortStay: false,
          ownerInfos: {},
          location: '',
          geometry: {}
        }
        this.ownerInfos = {}
        this.currentStep = 'congrats'
        this.loading = false
      } catch (error) {
        this.errorToshow = error
        this.loading = false
      }
    }
  }
}
</script>

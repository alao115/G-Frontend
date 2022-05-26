<template>
  <div class="contents">
    <div class="flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen absolute top-0 left-0 z-50" :class="isDismissed === true ? 'hidden' : ''">
      <div class=" flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-btn-shadow h-full lg:h-5/6 justify-between relative" style="width: 584px" :class="isDismissed === true ? 'hidden' : ''">
        <div class="text-start w-full h-full p-4 lg:p-8 z-20 relative lg:h-9/12">
          <div class="p-4">
            <h4 class="text-2xl font-medium mb-8 text-sky-550">
              <span v-if="currentStep !== 'congrats'">Éditer l'appartement</span>
            </h4>
            <button class="ml-auto hover:text-blue-730 p-4 absolute top-2 right-2" @click.prevent="isDismissed = true, currentStep = 'first'">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <p v-if="currentStep !== 'congrats'" class="text-lg mt-4 text-gray-600">
              Modifier les informations de cet appartement
              <!-- {{ appartment }} -->
            </p>
          </div>
          <div v-if="currentStep === 'first'" class="first overflow-scroll h-4/5 pb-16 p-4">
            <div class="relative">
              <label for="toggleC" class="flex items-center cursor-pointer mt-8">
                <!-- toggle -->
                <div class="relative">
                  <!-- input -->
                  <input
                    id="toggleC"
                    slot=""
                    v-model="appartToEdit.forShortStay"
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
                  Court séjour ? <span class="text-sky-550">{{ appartToEdit.forShortStay === true ? 'Oui' : 'Non' }}</span>
                </div>
              </label>
              <label for="toggleD" class="flex items-center cursor-pointer mt-8">
                <!-- toggle -->
                <div class="relative">
                  <!-- input -->
                  <input
                    id="toggleD"
                    v-model="appartToEdit.isFurnished"
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
                  Meublé ?  <span class="text-sky-550">{{ appartToEdit.isFurnished === true ? 'Oui' : 'Non meublé' }}</span>
                </div>
              </label>
            </div>
            <div class="relative">
              <p class="text-base mt-8 text-gray-400">
                Type
              </p>
              <button class="flex items-center justify-between w-full m-h-12 md:h-16 mt-2 mb-4 p-4 text-base border -lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="typeSelectIsOpen = !typeSelectIsOpen">
                <span v-if="!appartToEdit.appartmentType" class="leading-none">
                  Choisissez un type
                </span>
                <p v-else class="leading-none text-left flex flex-col">
                  {{ appartToEdit.appartmentType && appartmentType(appartToEdit.appartmentType).label }}
                  <span class="text-sm mt-1 text-gray-400">{{ appartToEdit.appartmentType && appartmentType(appartToEdit.appartmentType).description }}</span>
                </p>
                <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="typeSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                <a v-for="type in appartmentTypes" :key="type.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="appartToEdit.appartmentType = type.id, typeSelectIsOpen = false">
                  {{ type.label }}
                  <span class="text-gray-400">{{ type.description }}</span>
                </a>
              </div>
            </div>
            <p class="text-base mt-8 text-gray-400">
              Détails
            </p>
            <textarea v-model="appartToEdit.details" type="text" class="w-full h-20 md:h-24 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Détails sur la maison, l'adresse, etc.. " />
            <p class="text-base mt-4 text-gray-400">
              Loyer
            </p>
            <div class="flex space-x-8">
              <input v-model.number="appartToEdit.rent" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <div class="relative w-2/3">
                <button class="flex items-center w-full m-h-12 md:h-16 mb-4 p-4 text-base border -lg appearance-none border-gray-320 focus:border-sky-450 rounded-md focus:bg-white focus:ring-0" @click.prevent="paymentFrequenciesIsOpen = !paymentFrequenciesIsOpen">
                  <p v-if="selectedPaymentFrequency" class="leading-none text-left flex flex-col">
                    {{ foundPaymentFrequency && foundPaymentFrequency.label }}
                    <span class="text-sm mt-1 text-gray-400">{{ paymentFrequency(selectedPaymentFrequency).description }}</span>
                  </p>
                  <span v-else class="leading-none">
                    <span class="hidden lg:block">Choisissez une fréquence</span>
                    <span class="block lg:hidden">Fréquence</span>
                  </span>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="paymentFrequenciesIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <a v-for="frequency in paymentFrequencies" :key="frequency.id" class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedPaymentFrequency = frequency.id, paymentFrequenciesIsOpen = false">
                    {{ frequency.label }}
                    <span class="text-gray-400">{{ frequency.description }}</span>
                  </a>
                </div>
              </div>
            </div>
            <p class="text-base mt-4 text-gray-400">
              Caution Loyer
            </p>
            <div v-if="appartToEdit.conditions && appartToEdit.conditions.prepaidRentMonths" class="flex space-x-8">
              <input v-model.number="appartToEdit.conditions.prepaidRentMonths" type="number" class="w-1/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
              <input :value="appartToEdit.conditions.prepaidRentMonths * appartToEdit.rent" type="number" class="w-2/3 h-12 md:h-16 pr-4 pl-4 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
            </div>
            <div class="relative col-span-2 mb-16 lg:mb-8">
              <p class="text-base mt-1 text-gray-400">
                Localisation
              </p>
              <!-- <input v-model="appartToEdit.location" ref="searchTextField" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Long, Lat."> -->
              <input ref="searchTextField" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Ex: Cotonou" :value="appartToEdit.location">
            </div>
          </div>
          <div v-if="currentStep === 'second'" class="second overflow-scroll h-4/5 pb-16 p-4">
            <p class="text-2xl mt-12 mb-4 text-gray-400 font-normal">
              Caratéristiques
            </p>
            <div class="grid grid-cols-2">
              <div class="w-full pr-4 relative">
                <input v-model.number="appartToEdit.bedrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                  <i class="far fa-bed-alt fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Chambre(s)
                </p>
              </div>
              <div class="w-full pl-4 relative">
                <input v-model.number="appartToEdit.livingrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16block">
                  <i class="far fa-couch fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Salon(s)
                </p>
              </div>
              <div class="w-full pr-4 relative">
                <input v-model.number="appartToEdit.kitchen" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                  <i class="far fa-oven fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Cuisine(s)
                </p>
              </div>
              <div class="w-full pl-4 relative">
                <input v-model.number="appartToEdit.bathrooms" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                  <i class="far fa-shower text-xl" /> / <i class="far fa-toilet text-xl" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Salle(s) d'eau
                </p>
              </div>
              <div class="w-full pr-4 relative">
                <input v-model.number="appartToEdit.storageroom" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                  <i class="far fa-cabinet-filing fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Débarras
                </p>
              </div><div class="w-full pl-4 relative">
                <input v-model.number="appartToEdit.garage" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                  <i class="far fa-garage-open fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Garage
                </p>
              </div><div class="w-full pr-4 relative">
                <input v-model.number="appartToEdit.groundLevel" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                  <i class="far fa-list-ol fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Niveau
                </p>
              </div><div class="w-full pl-4 relative">
                <input v-model.number="appartToEdit.householdsTotal" type="number" class="w-full h-12 md:h-16 pr-4 pl-16 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="0">
                <span class="flex justify-center items-center absolute icon top-0 mt-1 lg:mt-3 h-12 w-16">
                  <i class="far fa-users fa-lg" />
                </span>
                <p class="text-base mt-1 mb-4 text-gray-400">
                  Voisinage
                </p>
              </div>
            </div>
          </div>
          <div v-if="currentStep === 'third'" class="third overflow-scroll h-4/5 pb-16 pr-4">
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
                    Choisissez un type
                  </span>
                  <p v-else class="leading-none text-left flex flex-col">
                    {{ foundCivility && foundCivility.value }}
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
                  <!-- <span v-if="selectedIsAlive" class="leading-none">
                    -
                  </span> -->
                  <p class="leading-none text-left flex flex-col">
                    {{ selectedIsAlive ? "Vivant(e)" : 'Décédé(e)' }}
                  </p>
                  <svg class="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="livingStatusSelectIsOpen === true" class="absolute flex flex-col w-full mt-1 border border-black shadow-lg z-50 bg-white divide-y divide-gray-300">
                  <a class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedIsAlive = true, livingStatusSelectIsOpen = false">
                    Vivant(e)
                  </a>
                  <a class="flex flex-col py-1 px-4 hover:bg-gray-200" href="#" @click.prevent="selectedIsAlive = false, livingStatusSelectIsOpen = false">
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
                <input v-model="appartToEdit.ownerInfos.firstname" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Prénom">
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-1 text-gray-400">
                  Nom
                </p>
                <input v-model="appartToEdit.ownerInfos.lastname" type="text" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Nom">
              </div>
            </div>
            <div class="grid grid-cols-2 mb-4">
              <div class="relative pr-4">
                <p class="text-base mt-1 text-gray-400">
                  Téléphone
                </p>
                <input v-model="appartToEdit.ownerInfos.phone" type="number" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Téléphone">
              </div>
              <div class="relative pl-4">
                <p class="text-base mt-1 text-gray-400">
                  Email
                </p>
                <input v-model="appartToEdit.ownerInfos.email" type="email" class="w-full h-12 md:h-16 px-4 mt-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Email">
              </div>
            </div>
            <div class="w-full relative">
              <p class="text-base mt-1 text-gray-400">
                Adresse
              </p>
              <textarea v-model="appartToEdit.ownerInfos.address" type="text" class="w-full h-48 md:h-16 pr-4 pl-4 my-1 border-gray-320 focus:border-sky-450 rounded-md bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380 relative" placeholder="Détails sur la maison, l'adresse, etc.. " />
            </div>
            <div class="retative">
              <a href="#" class="text-gray-400 hover:" @click.prevent="currentStep='photos'">Rajouter les photos maintenant</a>
            </div>
          </div>
          <div v-if="currentStep === 'photos'" class="photos overflow-scroll h-4/5 pb-16 p-4">
            <p class="text-lg my-2 text-gray-400">
              Photo principale <span class="text-base">(Veuillez choisir une photo en mode paysage)</span>
            </p>
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col w-full py-8 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div class="flex flex-col items-center justify-center pt-7">
                  <template v-if="!computedMainImg">
                    <span class="icon text-gray-400">
                      <i class="fal fa-image fa-5x" />
                    </span>
                    <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                      Choisissez la photo principale
                    </p>
                  </template>
                  <template v-else>
                    <img :src="computedMainImg" alt="">
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
                    <template v-if="!computedFirstImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 1
                      </p>
                    </template>
                    <template v-else>
                      <img :src="computedFirstImg" alt="">
                    </template>
                  </div>
                  <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'first')">
                </label>
              </div>
              <div class="flex items-center justify-center">
                <label class="flex flex-col w-full py-1 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <template v-if="!computedSecondImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 2
                      </p>
                    </template>
                    <template v-else>
                      <img :src="computedSecondImg" alt="">
                    </template>
                  </div>
                  <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'second')">
                </label>
              </div>
              <div class="flex items-center justify-center">
                <label class="flex flex-col w-full py-1 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <template v-if="!computedThirdImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 3
                      </p>
                    </template>
                    <template v-else>
                      <img :src="computedThirdImg" alt="">
                    </template>
                  </div>
                  <input type="file" class="opacity-0" @change="(e) => uploadPicture(e, 'third')">
                </label>
              </div>
              <div class="flex items-center justify-center">
                <label class="flex flex-col w-full py-1 border-4 border-gray-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <template v-if="!computedFourthImg">
                      <span class="icon text-gray-400">
                        <i class="fal fa-image fa-lg" />
                      </span>
                      <p class="pt-1 text-base tracking-wider text-gray-400 group-hover:text-gray-600">
                        Photo 4
                      </p>
                    </template>
                    <template v-else>
                      <img :src="computedFourthImg" alt="">
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
                Appartement
              </p>
              <p class="lg:text-xl mt-2 lg:mt-4 text-blue-920 text-center">
                mis à jour avec succès
              </p>
            </div>
          </div>
        </div>
        <div v-if="currentStep === 'congrats'" class="footer p-8 flex justify-between absolute w-full bg-white z-20 bottom-0">
          <button type="button" class="w-full py-4 text-lg px-8 leading-none hover:border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="isDismissed = true, currentStep = 'first'">
            <span>Retour</span>
          </button>
        </div>
        <div v-else class="footer p-4 lg:p-8 flex justify-between absolute w-full bg-white z-20 bottom-0 border border-t-2">
          <button type="button" class="w-1/2 py-4 text-sm px-8 leading-none border border-blue-990 font-medium rounded-md text-blue-990 hover:bg-gray-100 mr-4" @click.prevent="currentStep === 'first' ? isDismissed = true : currentStep === 'second' ? currentStep = 'first' : currentStep === 'third' ? currentStep = 'second' : currentStep = 'third'">
            <span v-if="currentStep === 'first'">Annuler</span>
            <span v-else>Retour</span>
          </button>
          <button type="button" class="w-1/2 flex justify-center relative shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium text-white bg-sky-550 hover:bg-blue-920" @click.prevent="(currentStep === 'third' || currentStep === 'photos') ? editAppartment() : currentStep === 'second' ? currentStep = 'third' : currentStep = 'second'">
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
// eslint-disable-next-line no-unused-vars
import path from 'path'

export default {
  props: {
    appartment: {
      type: Object,
      default: () => ({})
    },
    isMinified: {
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
      appartToEdit: { ...this.appartment },
      currentStep: 'first',
      isDismissed: true,
      typeSelectIsOpen: false,
      civilitySelectIsOpen: false,
      livingStatusSelectIsOpen: false,
      civilities: [
        { id: 1, value: 'M.' },
        { id: 2, value: 'Mme' },
        { id: 3, value: 'Autre' }
      ],
      paymentFrequenciesIsOpen: false,
      selectedType: '',
      details: '',
      selectedPaymentFrequency: this.appartment.conditions && this.appartment.conditions.paymentFrequency,
      selectedCivility: this.appartment.ownerInfos && this.appartment.ownerInfos.civility,
      selectedIsAlive: this.appartment.ownerInfos && this.appartment.ownerInfos.isAlive,
      isFurnished: false,
      advancePayment: 0,
      paymentFrequencies: [
        { id: 1, value: 'Month', label: 'Par mois', description: 'Paimements par mois' },
        { id: 2, value: 'Week', label: 'Par semaine', description: 'Paiements par semaine' },
        { id: 3, value: 'Day', label: 'Par jour', description: 'Paiements par jour' },
        { id: 4, value: 'Night', label: 'Par nuit', description: 'Paiements à la nuité' }
      ],
      features: {
        bedrooms: 0,
        livingrooms: 0,
        kitchen: 0,
        bathrooms: 0,
        storageroom: 0,
        garage: 0,
        garden: 0,
        groundLevel: 0,
        householdsTotal: 0,
        ac: 'Non',
        pool: 'Non',
        keeper: 'Non'
      },
      conditions: {
        rent: 0,
        paymentFrequency: 1,
        energyCommission: 0,
        prepaidRentMonths: 3
      },
      ownerInfos: {
        name: '',
        address: '',
        status: '',
        phone: '',
        email: ''
      },
      contracts: [],
      locations: [],
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
    foundCivility () {
      return this.civilities.find(civility => civility.id === this.selectedCivility)
    },
    foundPaymentFrequency () {
      return this.paymentFrequency(this.selectedPaymentFrequency)
    },
    computedMainImg () {
      return this.mainImg ? this.mainImg : this.appartToEdit.mainImg
    },
    computedFirstImg () {
      return this.firstImg ? this.firstImg : this.appartToEdit.firstImg
    },
    computedSecondImg () {
      return this.secondImg ? this.secondImg : this.appartToEdit.secondImg
    },
    computedThirdImg () {
      return this.thirdImg ? this.thirdImg : this.appartToEdit.thirdImg
    },
    computedFourthImg () {
      return this.fourthImg ? this.fourthImg : this.appartToEdit.fourthImg
    },
    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
    reservation () {
      return id => this.reservations.find(reservation => reservation.id === id)
    },
    visit () {
      return id => this.visits.find(visit => visit.id === id)
    },
    /* appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    }, */
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
    },
    appartment (value) {
      if (value !== null) {
        this.appartToEdit = { ...value }
        this.selectedCivility = value.ownerInfos.civility
        this.selectedIsAlive = value.ownerInfos.isAlive
        this.selectedPaymentFrequency = value.conditions.paymentFrequency
        this.isDismissed = false
      }
    }
  },

  mounted () {
    const input = this.$refs.searchTextField

    const autocomplete = this.$googleAutoComplete(input)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      const geometry = {
        type: 'Point',
        coordinates: [
          place.geometry.location.lng(),
          place.geometry.location.lat()
        ]
      }
      this.appartToEdit.geometry = geometry
      this.appartToEdit.location = `${place.formatted_address}, ${place.name}`
    })
  },
  created () {
    this.appartToEdit = { ...this.appartment }
  },
  methods: {
    toDetails (appartment) {
      this.$router.push({ path: '/dashboard/appartements/' + appartment.id })
    },

    async editAppartment () {
      try {
        this.loading = true
        delete this.appartToEdit.createdBy
        await this.$api.appartmentService.update({ variables: { appartmentId: this.appartToEdit.id, data: { ...this.appartToEdit, conditions: { ...this.appartToEdit.conditions, paymentFrequency: this.selectedPaymentFrequency }, ownerInfos: { ...this.appartToEdit.ownerInfos, civility: this.selectedCivility, isAlive: this.selectedIsAlive } } } })

        if (this.appartImg) {
          for (const key of Object.keys(this.appartImg)) {
            const ImgData = new FormData()
            const filePath = `appartments/${this.appartToEdit.id}/${key}_${this.appartImg[key].name}`
            // const filePathToBeDeleted = `appartments/${this.appartToEdit.id}/${path.basename(this.appartToEdit[key].split('?')[0])}`
            ImgData.append('file', this.appartImg[key])
            ImgData.append('filePath', filePath)
            // await this.$api.firebaseStorageService.delete({ filePath: filePathToBeDeleted })
            const firestoreResponse = await this.$api.firebaseStorageService.upload(ImgData)
            await this.$api.appartmentService.update({ variables: { appartmentId: this.appartToEdit.id, data: { [`${key}Img`]: firestoreResponse.data.data.fileInfo } } })
          }
        }

        await this.loadAppartmentsFunc()
        this.loading = false
        this.currentStep = 'congrats'
      } catch (error) {
        this.errorToshow = error
        this.loading = false
      }
    },

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
    }
  }
}
</script>

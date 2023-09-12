<template>
  <div class="overflow-x-hidden font-body px-8 py-16">
    <div class="flex space-x-8">
      <div>
        <img :src="appartment.mainImg" alt="" class="w-full mb-16">
        <div class="flex space-x-8 lg:w-5/12">
          <img :src="appartment.mainImg" alt="">
          <img :src="appartment.mainImg" alt="">
        </div>
      </div>
      <div class="container flex flex-col items-start lg:w-6/12">
        <div class="content font-body">
          <h4 class="text-2xl font-medium mb-2">
            {{ appartmentType(appartment.appartmentType).label }} <br>
            <span class="text-gray-400 text-sm">{{ appartment.bedrooms }} Chambre<span v-if="appartment.bedrooms > 1">s</span> - {{ appartment.livingrooms }} Salon<span v-if="appartment.livingrooms > 1">s</span></span>
          </h4>
          <div class="flex items-center">
            <span class="icon mr-4 text-sky-450">
              <i class="fas fa-map-marker-alt" />
            </span>
            <label for="#" class="text-md">{{ appartment.location }}</label>
          </div>
          <h3 class="block text-3xl font-medium mt-4 text-sky-450">
            <span>{{ appartment.rent }} F CFA <sup class="text-sm relative -top-6">TTC</sup></span>
          </h3>
          <div class="grid grid-cols-2 w-min space-x-16 my-4">
            <span class="icon">
              <i class="fab fa-whatsapp text-3xl" />
            </span>
            <span class="icon">
              <i class="far fa-envelope-open-text text-2xl" />
            </span>
          </div>
          <div class="details">
            <h4 class="text-sky-450 text-xl mt-8 mb-4">
              Details
            </h4>
            <p class="font-body text-base mb-8">
              {{ appartment.details }}
            </p>
          </div>
          <div class="rooms w-full">
            <h4 class="text-sky-450 text-xl mb-4">
              Caractéristiques
            </h4>
            <div class="grid grid-cols-4 my-4  -ml-12">
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-bed-alt text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.bedrooms }}</label>
                </div>
                <p class="mb-8">
                  Chambre(s)
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-couch text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.livingrooms }}</label>
                </div>
                <p class="mb-8">
                  Salon (s)
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-oven text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.kitchen }}</label>
                </div>
                <p class="mb-8">
                  Cuisine (s)
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-shower text-xl" /> / <i class="far fa-toilet text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.bathrooms }}</label>
                </div>
                <p class="mb-8">
                  Salle(s) d'eau
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-cabinet-filing text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.storageroom }}</label>
                </div>
                <p class="mb-8">
                  Débarras
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-garage-open text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.garage }}</label>
                </div>
                <p class="mb-8">
                  Garage
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-flower-tulip text-sm" /><i class="far fa-flower-daffodil text-sm" /><i class="far fa-flower text-sm" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.garden }}</label>
                </div>
                <p class="mb-8">
                  Jardin
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-list-ol text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.floor }}</label>
                </div>
                <p class="mb-8">
                  Niveau
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-users text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.householdsTotal }}</label>
                </div>
                <p class="mb-8">
                  Voisins
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-air-conditioner text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.ac }}</label>
                </div>
                <p class="mb-8">
                  Climatiseur
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-swimming-pool text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.pool }}</label>
                </div>
                <p class="mb-8">
                  Piscine
                </p>
              </div>
              <div class="w-full ml-8 px-4">
                <div class="flex items-center">
                  <span class="icon mr-4">
                    <i class="far fa-user-shield text-xl" />
                  </span>
                  <label for="#" class="text-xl">{{ appartment.keeper }}</label>
                </div>
                <p class="mb-8">
                  Gardien
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="rooms w-full">
          <h4 class="text-sky-450 text-xl mt-8 mb-4">
            Conditions
          </h4>
          <div class="grid grid-cols-3 my-4 divide-x divide-gray-200 -ml-12">
            <div class="w-full ml-8 px-4">
              <div class="flex items-center font">
                <label for="#" class="text-xl font-semibold">{{ appartment.rent }}</label>
              </div>
              <p class="mt-2">
                Loyer
              </p>
            </div>
            <div class="w-full ml-8 px-4">
              <div class="flex items-center font">
                <label for="#" class="text-xl font-semibold">{{ appartment.conditions.advancePayment }}</label>
              </div>
              <p class="mt-2">
                {{ appartment.conditions.prepaidRentMonths }} mois d'avance
              </p>
            </div>
            <div class="w-full ml-8 px-4">
              <div class="flex items-center font">
                <label for="#" class="text-xl font-semibold">{{ appartment.conditions.energyCommission }}</label>
              </div>
              <p class="mt-2">
                Commission Eau / Elec
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex space-x-8">
      <div class="flex space-x-8 pr-8">
        <div class="details w-1/2">
          <h4 class="text-sky-450 text-xl mt-8 mb-4">
            Informations sur le propriétaire
          </h4>
          <p class="font-body text-base">
            Maison appartenant à {{ appartment.ownerInfos.name }} vivant au {{ appartment.ownerInfos.address }}
          </p>
          <p class="font-body text-base">
            Contact: {{ appartment.ownerInfos.phone }}
          </p>
          <p class="font-body text-base">
            Email: {{ appartment.ownerInfos.email }}
          </p>
        </div>
        <div class="others bg-sky-50 p-8 mt-8 w-1/2 rounded-md">
          <p>
            Les frais de visites s’élève à 2000 f cfa.
            Vous avez la possibilité de 3 visites. Une équipe ets mise à votre disposition pour un service de qualité.
          </p>
        </div>
      </div>
      <div class="space-x-4 mt-12 lg:w-5/12 flex">
        <button class="btn shadow-btn-shadow border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-4 text-lg px-10 mr-8">
          Réserver
        </button>
        <NewVisit :appartment="appartment" />
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  layout: 'dashboard',
  data () {
    return {
      id: this.$route.params.id,
      appartments: [
        {
          id: '1',
          mainImg: '/assets/images/rentables/example1.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 8,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 1,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          floor: 0,
          conditions: {
            advancePayment: 150000,
            energyCommission: 50000,
            prepaidRentMonths: 3
          },
          ownerInfos: {
            name: 'M. Edoe',
            address: 'c/1500',
            status: 'Alive',
            phone: '+229 60 000000',
            email: 'm.edoae@gmail.com'
          }
        },
        {
          id: '2',
          mainImg: '/assets/images/rentables/example2.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingRooms: 2,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          floor: 0,
          conditions: [
            {
              advancePayment: 150000,
              energyCommission: 50000,
              prepaidRentMonths: 3
            }
          ],
          ownerInfos: [
            {
              name: 'M. Edoe',
              address: 'c/1500',
              status: 'Alive',
              phone: '',
              email: 'm.edoae@gmail.com'
            }
          ]
        },
        {
          id: '3',
          mainImg: '/assets/images/rentables/example3.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingRooms: 2,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          floor: 0,
          conditions: [
            {
              advancePayment: 150000,
              energyCommission: 50000,
              prepaidRentMonths: 3
            }
          ],
          ownerInfos: [
            {
              name: 'M. Edoe',
              address: 'c/1500',
              status: 'Alive',
              phone: '',
              email: 'm.edoae@gmail.com'
            }
          ]
        },
        {
          id: '4',
          appartmentType: 4,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example4.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingRooms: 2,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          floor: 0,
          conditions: [
            {
              advancePayment: 150000,
              energyCommission: 50000,
              prepaidRentMonths: 3
            }
          ],
          ownerInfos: [
            {
              name: 'M. Edoe',
              address: 'c/1500',
              status: 'Alive',
              phone: '',
              email: 'm.edoae@gmail.com'
            }
          ]
        },
        {
          id: '5',
          appartmentType: 2,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example5.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingRooms: 2,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          floor: 0,
          conditions: [
            {
              advancePayment: 150000,
              energyCommission: 50000,
              prepaidRentMonths: 3
            }
          ],
          ownerInfos: [
            {
              name: 'M. Edoe',
              address: 'c/1500',
              status: 'Alive',
              phone: '',
              email: 'm.edoae@gmail.com'
            }
          ]
        },
        {
          id: '6',
          appartmentType: 3,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example6.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingRooms: 2,
          storageroom: 1,
          kitchen: 1,
          garage: 1,
          keeper: 'Oui',
          terrace: 1,
          garden: 1,
          ac: 'Oui',
          pool: 'Oui',
          householdsTotal: 6,
          floor: 0,
          conditions: [
            {
              advancePayment: 150000,
              energyCommission: 50000,
              prepaidRentMonths: 3
            }
          ],
          ownerInfos: [
            {
              name: 'M. Edoe',
              address: 'c/1500',
              status: 'Alive',
              phone: '',
              email: 'm.edoae@gmail.com'
            }
          ]
        }
      ],
      appartmentTypes: [
        { id: 1, label: 'Studio (Entrée - coucher' },
        { id: 2, label: 'Appartement' },
        { id: 3, label: 'Villa' },
        { id: 4, label: 'Duplex' }
      ]
    }
  },
  computed: {
    appartment () {
      return this.appartments.find(appartment => appartment.id === this.id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    }
  }
})
</script>

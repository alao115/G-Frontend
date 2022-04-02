<template>
  <div class="container w-full p-16 xl:p-24 pb-8 xl:pb-12 flex flex-col justify-center mx-auto h-1/2 font-body" style="min-height: 516px">
    <div class="text-blue-990 w-5/12 mb-4">
      <h1 class="text-3xl font-semibold leading-snug">
        Trouvez votre prochain lieu de résidence
      </h1>
    </div>
    <div class="flex justify-between">
      <p>Récentes publications</p>
      <NuxtLink to="/home" class="text-blue-990 border-b-2 border-transparent hover:border-blue-990">
        Voir plus
      </NuxtLink>
    </div>
    <div class="grid md:grid-cols-3 mt-8">
      <WebsiteRentable
        v-for="appartment in appartments"
        :key="appartment.id"
        :appartment="appartment"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appartments: {
      type: Array,
      required: true,
      default: () => ([])
    },
    appartmentTypes: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },
  data () {
    return {
      /* publications: [
        { id: 1, date: '', appartment: 1, isNew: true, publisher: 1, status: '', views: 0 },
        { id: 2, date: '', appartment: 2, isNew: true, publisher: 2, status: '', views: 0 },
        { id: 3, date: '', appartment: 3, isNew: true, publisher: 3, status: '', views: 0 },
        { id: 4, date: '', appartment: 4, isNew: true, publisher: 4, status: '', views: 0 },
        { id: 5, date: '', appartment: 5, isNew: true, publisher: 5, status: '', views: 0 },
        { id: 6, date: '', appartment: 6, isNew: true, publisher: 6, status: '', views: 0 }
      ],
      reservations: [
        { id: 1, date: '', user: 1, appartment: 1, reservationStatus: '' }
      ],
      visits: [
        { id: 1, date: '', user: 1, appartment: 2, visitStatus: '' }
      ],
      users: [
        { id: 1, name: 'RONY', firstname: 'Monsieur', phone: '+22991234567', email: 'monsieur.rony@gmail.com', user: '1', userType: 'admin', favorites: [], likes: [] },
        { id: 2, name: 'CHEGUN', firstname: 'Mouss', phone: '+22998765432', email: 'mouss15@gmail.com', user: '2', userType: 'publisher', favorites: [], likes: [] },
        { id: 2, name: 'ThG', firstname: 'Micrette', phone: '+22965432123', email: 'micress16@gmail.com', user: '3', userType: 'visitor', favorites: [], likes: [] }
      ],
      contracts: [],
      appartments: [
        {
          id: 1,
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
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 2,
          mainImg: '/assets/images/rentables/example2.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 2,
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
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 3,
          mainImg: '/assets/images/rentables/example3.jpg',
          appartmentType: 2,
          isFurnished: false,
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 2,
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
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 4,
          appartmentType: 4,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example4.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 2,
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
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 5,
          appartmentType: 2,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example5.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 2,
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
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        },
        {
          id: 6,
          appartmentType: 3,
          isFurnished: false,
          mainImg: '/assets/images/rentables/example6.jpg',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          bedrooms: 2,
          livingrooms: 2,
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
            phone: '',
            email: 'm.edoae@gmail.com'
          },
          likes: 0,
          favorite: 0
        }
      ],
      appartmentTypes: [
        { id: 1, label: 'Studio (Entrée - coucher' },
        { id: 2, label: 'Appartement' },
        { id: 3, label: 'Villa' },
        { id: 4, label: 'Duplex' }
      ],
      locations: [] */
    }
  },
  computed: {
    routeName () {
      return this.$nuxt.$route.name
    },
    publication () {
      return id => this.publications.find(publication => publication.id === id)
    },
    appartment () {
      return id => this.appartments.find(appartment => appartment.id === id)
    },
    appartmentType () {
      return id => this.appartmentTypes.find(appartmentType => appartmentType.id === id)
    },
    typeAppartments () {
      return id => this.appartments.filter(appartment => appartment.appartmentType === id)
    },
    listOfTypes () {
      const returnedListOfTypes = []
      this.appartmentTypes.forEach((type) => {
        // console.log(this.typeAppartments(type.id))
        if (this.typeAppartments(type.id).length > 0) {
          returnedListOfTypes.push(type)
        }
      })
      return returnedListOfTypes
    }
  }
}
</script>

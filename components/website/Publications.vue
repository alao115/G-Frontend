<template>
  <div class="container w-full p-16 xl:p-24 pb-8 xl:pb-12 flex flex-col justify-center mx-auto h-1/2 font-body xl:pt-32" style="min-height: 516px">
    <form v-if="inHomePage" action="#" class="form text-blue-990 bg-sky-10 p-4 rounded-md">
      <div class="flex divide-x divide-gray-320 justify-between">
        <input type="text" class="px-8 mr-4 block w-full bg-transparent border-transparent focus:border-white focus:ring-0 placeholder-gray-600 focus:placeholder-blue-380" placeholder="Affinez vos recherches de logement">
        <NuxtLink to="#" class="shadow-btn-shadow border border-transparent font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 hover:text-white py-4 text-lg px-10">
          Rechercher
        </NuxtLink>
      </div>
    </form>
    <div v-if="inIndex" class="text-blue-990 w-5/12 mb-4">
      <h1 class="text-3xl font-semibold leading-snug">
        Trouvez votre prochain lieu de résidence
      </h1>
    </div>
    <div v-if="inIndex" class="flex justify-between">
      <p>Récentes publications</p>
      <NuxtLink to="/home" class="text-blue-990 border-b-2 border-transparent hover:border-blue-990">
        Voir plus
      </NuxtLink>
    </div>
    <div v-if="inDetails" class="text-blue-990 w-7/12 mb-4">
      <h1 class="text-3xl font-semibold leading-snug">
        Autres appartements du même type
      </h1>
    </div>
    <div class="grid lg:grid-cols-3 mt-8">
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
    inIndex: {
      type: Boolean,
      default: false
    },
    inHomePage: {
      type: Boolean,
      default: false
    },
    inDetails: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      appartments: [
        {
          id: 1,
          mainImg: '/assets/images/rentables/example1.jpg',
          type: 'Chambre salon',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          householdsTotal: 6,
          floor: 'Ground',
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
          id: 2,
          mainImg: '/assets/images/rentables/example2.jpg',
          type: 'Chambre salon',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          householdsTotal: 6,
          floor: 'Ground',
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
          id: 3,
          mainImg: '/assets/images/rentables/example3.jpg',
          type: 'Chambre salon',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          householdsTotal: 6,
          floor: 'Ground',
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
          id: 4,
          mainImg: '/assets/images/rentables/example4.jpg',
          type: 'Chambre salon',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          householdsTotal: 6,
          floor: 'Ground',
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
          id: 5,
          mainImg: '/assets/images/rentables/example5.jpg',
          type: 'Chambre salon',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          householdsTotal: 6,
          floor: 'Ground',
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
          id: 6,
          mainImg: '/assets/images/rentables/example6.jpg',
          type: 'Chambre salon',
          location: 'Abomey-Calavi',
          rent: 50000,
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor fames mattis at nibh. Ultricies eu vel ipsum aliquet nullam vulputate aliquet purus. Habitant pulvinar adipiscing semper leo, nam orci. ',
          rooms: 4,
          bathrooms: 2,
          householdsTotal: 6,
          floor: 'Ground',
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
      ]
    }
  }
}
</script>

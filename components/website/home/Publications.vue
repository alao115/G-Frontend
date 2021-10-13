<template>
  <div class="container w-full p-16 xl:p-24 flex flex-col justify-center mx-auto h-1/2 font-body" style="min-height: 516px">
    <div class="text-blue-990 w-5/12 mb-2">
      <h1 class="text-3xl font-semibold leading-snug">
        Trouvez votre prochain lieu de résidence
      </h1>
    </div>
    <div class="flex justify-between">
      <p>Récentes publications</p>
      <a href="#">Voir plus</a>
    </div>
    <div class="grid md:grid-cols-3">
      <WebsiteRentable
        v-for="appartment in appartments"
        :key="appartment.id"
        :appartment="appartment" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      appartments: [
        {
          id: 1,
          mainImg: '/assets/rentables/example1.jpg',
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
          mainImg: '/assets/rentables/example2.jpg',
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
          mainImg: '/assets/rentables/example3.jpg',
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
          mainImg: '/assets/rentables/example4.jpg',
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
          mainImg: '/assets/rentables/example5.jpg',
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
          mainImg: '/assets/rentables/example6.jpg',
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

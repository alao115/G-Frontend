<template>
  <div>
    ok
    <!-- <span v-if="appartment">{{ appartment }}</span> -->
    <span>{{ id }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
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
  },
  computed: {
    appartment () {
      return this.appartments.find(appartment => appartment.id === this.id)
    }
  }
}
</script>

<template>
  <div class="contents">
    <div v-if="isClosed" class="lg:flex flex-col cursor-pointer" @click.prevent="isClosed = false">
      <!-- <label v-if="inTable" :class="isSmall ? 'small' : ''" class="switch" @click.prevent="isDismissed = false">
        <input v-model="checkedValue" type="checkbox">
        <span :class="isSmall ? 'small' : ''" class="slider round" />
      </label> -->
      <button v-if="inTable" class="btn shadow-btn-shadow border border-transparent w-36 font-medium rounded-md text-white bg-red-500 hover:bg-blue-920 py-0 text-xs h-6" @click.prevent="isDismissed = false">
        Annuler
      </button>
    </div>
    <div v-else class="flex border-2 border-gray-200 w-auto absolute bg-white items-center space-x-8 p-2 right-0 pl-8">
      <p class="text-lg">
        Êtes-vous sûr(e) ?
      </p>
      <button type="button" class="w-auto border border-transparent py-2 text-sm px-4 leading-none rounded font-medium bg-white hover:bg-gray-100 border-gray-200" @click.prevent="isClosed = true">
        <span>Finalement, non</span>
      </button>
      <button type="button" class="relative w-40 border border-transparent py-2 text-sm px-4 leading-none rounded font-medium text-white bg-red-500 hover:bg-red-700 disabled:bg-red-200" :disabled="!deletePlaceholder" @click.prevent="deleteCommand">
        <span class="relative w-8">
          Oui, annuler la réservation
        </span>
        <loader v-if="onDelete" class="absolute top-1/2 right-1 transform -translate-y-1/2" />
      </button>
      <div class="flex flex-col px-2 mx-2 cursor-pointer text-gray-300" @click.prevent="isClosed = true">
        <span class="icon">
          <i class="far fa-times fa-lg" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    defaultState: {
      type: Boolean,
      default: false
    },
    inTable: {
      type: Boolean,
      default: false
    },
    deletePlaceholder: {
      type: Function,
      default: null,
      required: true
    }
  },

  data () {
    return {
      isClosed: true,
      onDelete: false,
      isSmall: true
    }
  },

  computed: {
    checkedValue: {
      get () {
        return this.defaultState
      },
      set (newValue) {
        this.currentState = newValue
      }
    }
  },
  methods: {
    deleteCommand () {
      if (this.deletePlaceholder) {
        this.onDelete = true
        this.deletePlaceholder()
          .then(() => {
            this.isClosed = true
          }).finally(() => {
            this.onDelete = false
          })
      }
    }
  }
})
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
}

.switch.small {
  width: 32px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider.small:before {
  height: 12px;
  width: 12px;
}

input:checked + .slider {
  background-color: #03a8df;
}

input:focus + .slider {
  box-shadow: 0 0 1px #03a8df;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

input:checked + .slider.small:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(12px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 28px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

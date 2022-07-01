<template>
  <label :class="isSmall ? 'small' : ''" class="switch" @click.prevent="checkStatus">
    <input v-model="checkedValue" type="checkbox">
    <span :class="isSmall ? 'small' : ''" class="slider round" />
  </label>
</template>

<script>
export default {
  props: {
    defaultState: {
      type: Boolean,
      default: false
    },
    appartment: {
      type: Object,
      required: false,
      default: () => ({})
    },
    publications: {
      type: Array,
      required: false,
      default: () => ([])
    }
  },
  data () {
    return {
      currentState: this.defaultState,
      isSmall: true
    }
  },
  computed: {
    isActive () {
      return this.currentState
    },
    isPublished () {
      return id => this.publications.find(publication => publication.appartment.id === id)
    },
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

    checkStatus () {
      /* if (this.isPublished(this.appartment.id)) {
        alert('published')
      } else {
        alert('not yet published')
      } */
    }
  }
}
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

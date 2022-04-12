<template>
  <!-- <label for="toggle_button">
    <span v-if="isActive" class="toggle__label">On</span>
    <span v-else class="toggle__label">Off</span>

    <input type="checkbox" id="toggle_button" v-model="checkedValue">
    <span class="toggle__switch"></span>
  </label> -->

  <label :class="isSmall ? 'small' : ''" class="switch">
    <input type="checkbox" v-model="checkedValue">
    <span :class="isSmall ? 'small' : ''" class="slider round"></span>
  </label>
</template>

<script>
export default {
  props: {
    defaultState: {
      type: Boolean,
      default: false
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
    checkedValue: {
      get () {
        return this.defaultState
      },
      set (newValue) {
        this.currentState = newValue
      }
    }
  }
}
</script>

<style scoped>
/* .toggle__button {
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
}
.toggle__button input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
}
.toggle__button .toggle__switch {
  display:inline-block;
  height:12px;
  border-radius:6px;
  width:40px;
  background: #BFCBD9;
  box-shadow: inset 0 0 1px #BFCBD9;
  position:relative;
  margin-left: 10px;
  transition: all .25s;
}

.toggle__button .toggle__switch::after,
.toggle__button .toggle__switch::before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  left: 0;
  top: -3px;
  transform: translateX(0);
  transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
}

.toggle__button .toggle__switch::after {
  background: #4D4D4D;
  box-shadow: 0 0 1px #666;
}
.toggle__button .toggle__switch::before {
  background: #4D4D4D;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
  opacity:0;
} */
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

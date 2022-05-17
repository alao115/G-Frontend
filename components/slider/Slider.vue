<template>
  <div @mousemove="doDrag" class="outercontainer relative">
    <div class="slider-container">
      <input type="text" v-model="min" @keyup="setMin" />
      <input type="text" v-model="max" @keyup="setMax" />
      <p>{{ numberLeft }}</p>
      <p>{{ numberRight }}</p>
      <div class="slider-content-container">
        <div
          @mousedown="startDrag"
          class="drag-1"
          :style="{ left: drag1.left + 'px' }"
        ></div>
        <div class="slider-value-background" id="slider-background"></div>
        <div
          class="slider-value"
          :style="{ width: width + 'px', left: drag1.left + 'px' }"
        ></div>
        <div
          @mousedown="startDrag2"
          class="drag-2"
          :style="{ left: drag2.left + 'px' }"
        ></div>
      </div>
    </div>
  </div>
</template>


<script src="./Slider.js"/>
<style src="./Slider.scss" lang="scss"/>

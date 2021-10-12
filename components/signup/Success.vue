<template>
  <div class="relative container flex-col bg-white border-t-8 border-blue-730 flex justify-center item-center pb-12 px-20" style="min-height: 516px">
    <div class="absolute h-1 border-t-8 border-sky-450 w-2/3 -mt-2 -ml-20 top-0" />
    <div class="w-full">
      <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
      <p class="text-sm my-12 text-blue-920">
        Veuillez consulter votre boite mail et activer le lien qui vous a été transmis pour valider votre compte.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toFirst: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.success-img {
  height: 354px;
}
</style>

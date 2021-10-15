<template>
  <div class="container flex-col bg-white lg:w-10/12 xl:w-9/12 flex justify-center item-center pb-12 px-16 mx-auto" style="min-height: 516px">
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

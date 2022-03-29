<template>
  <div class="container flex-col bg-white lg:w-10/12 xl:w-9/12 flex justify-center item-center pb-12 px-16 mx-auto" style="min-height: 516px">
    <div class="w-full">
      <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
      <p class="text-sm my-12 text-blue-920">
        Votre compte a été bien activé. Merci !
      </p>
      <button type="button" class="shadow-btn-shadow border border-transparent py-4 text-sm px-8 leading-none rounded font-medium mt-8 text-white bg-sky-550 hover:bg-blue-920">
        Connexion
      </button>
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

<template>
  <div class="container flex-col bg-white w-full lg:w-5/12 xl:w-4/12 flex justify-center item-center p-12 mx-auto" style="min-height: 516px">
    <div class="w-full">
      <img src="/assets/images/success.svg" alt="Logo Long Gontché" class="success-img mx-auto">
      <p class="text-sm my-12 text-blue-920 p-12">
        Veuillez consulter votre boite mail et cliquer le lien qui vous a été transmis pour valider votre compte.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'signup',
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

<template>
  <div>
    <SignupSuccess />
  </div>
</template>

<script>
export default defineComponent({

  layout: 'signup',

  middleware ({ store, redirect }) {
    const successSignup = store.getters['customAuth/successSignup']
    if (!successSignup) { redirect({ name: 'auth-signup' }) }
  }
})
</script>

<style scoped>
  .cover{
    position: absolute;
    width: 100%; height: 100%;
    opacity: .1; z-index: 0;
    background-image: url('/assets/images/bg-motif.svg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .container {
    z-index: 1;
  }
</style>

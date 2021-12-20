<template>
  <div class="flex items-center h-screen bg-sky-10 font-body">
    <div class="cover" />
    <div class="container w-7/12 md:w-5/12 mx-auto text-center">
      <div class="flex space-x-8 justify-center">
        <div class="container flex flex-col justify-between" style="min-height: 516px">
          <SignupGontcheLogo />
          <Nuxt />
          <div class="copyright mt-12">
            <div class="flex space-x-3 text-gray-300 align-center justify-center">
              <span class="mr-12">© 2021 Gontché</span>
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-facebook-f text-xl" />
                </span>
              </NuxtLink>
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-twitter text-2xl" />
                </span>
              </NuxtLink>
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-instagram text-2xl" />
                </span>
              </NuxtLink>
              <NuxtLink to="#">
                <span class="icon">
                  <i class="la la-linkedin-square text-2xl" />
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'isloggedIn'
}
</script>

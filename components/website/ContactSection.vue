<template>
  <div id="contact" class="bg-sky-450 px-8 xl:px-24 py-8 items-center text-white font-body">
    <div class="container text-center md:text-left xl:p-24 w-full lg:mx-auto">
      <div class="text-white lg:flex md:space-x-24">
        <div class="text w-full md:w-1/3">
          <h1 class="text-3xl xl:text-4xl font-semibold">
            N'hésitez pas à nous contacter !
          </h1>
          <p class="text-xl my-6">
            Une équipe dynamique et prête à vous accompagner dans la bonne gestion de vos biens immobiliers.
          </p>
        </div>
        <form action="#" class="form text-blue-990 bg-sky-10 p-4 rounded-md w-full md:w-2/3">
          <div class="flex flex-col justify-between space-y-8 divide-y pt-4">
            <input type="fullname" class="h-16 px-8 mr-4 block w-full border-transparent focus:border-sky-550 placeholder-gray-400 focus:placeholder-blue-380" placeholder="Entrez votre nom !">
            <input type="email" class="h-16 px-8 mr-4 block w-full border-transparent focus:border-sky-550 placeholder-gray-400 focus:placeholder-blue-380" placeholder="Entrez votre email !">
            <textarea type="text" class="px-8 mr-4 block w-full border-transparent focus:border-sky-550 placeholder-gray-400 focus:placeholder-blue-380" placeholder="Entrez votre message !"></textarea>
            <NuxtLink to="#" class="shadow-btn-shadow border border-transparent text-base font-medium rounded-md text-white bg-sky-550 hover:bg-blue-920 nuxt-link-active py-3 text-lg px-6 lg:px-10">
              <span class="hidden lg:block">Envoyer</span>
              <span class="icon block lg:hidden">
                <i class="fas fa-paper-plane" />
              </span>
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

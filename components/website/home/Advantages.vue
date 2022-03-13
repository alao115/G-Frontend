<template>
  <div id="advantages" class="flex space-x-8 justify-center pb-16 font-body">
    <div class="container flex p-32 justify-between">
      <div class="flex flex-col xl:w-6/12 justify-center pt-40" style="">
        <div class="text-blue-990">
          <h1 class="text-2xl xl:text-5xl font-semibold">
            Une plateforme idéale pour tous !
          </h1>
          <p class="text-sm lg:text-base xl:text-xl mt-6">
            Un logement pour tous.
          </p>
        </div>
        <div class="flex flex-col mt-12 space-y-4 align-center">
          <div class="text-center flex space-x-8 align-center p-8 bg-white w-4/5 border-l-4 advantage border-sky-100">
            <span class="icon">
              <i class="las la-chart-line text-3xl mb-5 text-sky-450" />
            </span>
            <p class="text-2xl text-left">Valorisation et suivi des bien simmobiliers</p>
          </div>
          <div class="text-center flex space-x-8 align-center p-8 bg-white w-4/5 border-l-4 advantage border-sky-100">
            <span class="icon">
              <i class="las la-shield-alt text-3xl mb-5 text-sky-450" />
            </span>
            <p class="text-2xl text-left">Sécurité des biens immobiliers</p>
          </div>
          <div class="text-center flex space-x-8 align-center p-8 bg-white w-4/5 border-l-4 advantage border-sky-100">
            <span class="icon">
              <i class="las la-shield-alt text-3xl mb-5 text-sky-450" />
            </span>
            <p class="text-2xl text-left">Frais de visite de plusieurs logements à <span class="text-sky-450">2000 F CFA</span></p>
          </div>
        </div>
      </div>
      <div class="flex-col bg-white xl:w-4/12 flex justify-center item-center" style="min-height: 516px">
        <div class="w-full to-shadow">
          <img src="/assets/images/advantages.jpg" alt="" class="w-full">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #advantages .container{
    background-image: url('/assets/images/advantages-bg.png');
    background-repeat: no-repeat;
    background-size: cover;;
  }

  .to-shadow:after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
  }
  .advantage:before {
    display: block;
    content: '';
    width: 3px;
    height: 24px;
    background-color: #00bfff;
  }
</style>

<template>
  <div id="advantages" class="flex space-x-8 justify-center pb-16 font-body">
    <div class="container flex p-8 lg:p-24 xl:p-32 justify-between">
      <div class="xl:w-6/12 justify-center" style="">
        <div class="flex flex-col mt-12 space-y-4 align-center">
          <div class="text-blue-920">
            <h1 class="text-2xl xl:text-5xl font-semibold mb-8">
              Une plateforme idéale pour tous !
            </h1>
          </div>
          <div class="text-center flex space-x-8 align-center p-8 bg-white w-full md:w-4/5 border-l-4 advantage border-sky-100">
            <span class="icon">
              <i class="las la-chart-line text-3xl mb-5 text-sky-450" />
            </span>
            <p class="xl:text-2xl text-left">Valorisation et suivi des bien simmobiliers</p>
          </div>
          <div class="text-center flex space-x-8 align-center p-8 bg-white w-full md:w-4/5 border-l-4 advantage border-sky-100">
            <span class="icon">
              <i class="las la-shield-alt text-3xl mb-5 text-sky-450" />
            </span>
            <p class="xl:text-2xl text-left">Sécurité des biens immobiliers</p>
          </div>
          <div class="text-center flex space-x-8 align-center p-8 bg-white w-full md:w-4/5 border-l-4 advantage border-sky-100">
            <span class="icon">
              <i class="las la-shield-alt text-3xl mb-5 text-sky-450" />
            </span>
            <p class="xl:text-2xl text-left">Frais de visite de plusieurs logements à <span class="text-sky-450">2000 F CFA</span></p>
          </div>
        </div>
      </div>
      <div class="hidden md:flex img-container xl:w-5/12 justify-center item-center pr-16 pt-16">
        <div class="w-full to-shadow">
          <img src="/assets/images/advantages.jpg" alt="" class="w-full -ml-16 border-tr-lg">
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
    width: 7px;
    height: 64px;
    transform: translateX(-36px);
    background-color: #00bfff;
  }
  .img-container {
    background: linear-gradient(180deg, rgba(0, 191, 255, 0.5) 0%, rgba(163, 223, 243, 0.5) 100%);
    border-radius: 108px 0px 0px 0px;
  }
</style>

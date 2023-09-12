<template>
  <div class="flex">
    <div class="lds-ripple" />
  </div>
</template>

<style scoped lang="scss">
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;

    &::before, &::after {
      position: absolute;
      border: 2px solid #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      border-radius: 50%;
    }

    &::after {
      animation-delay: -0.5s;
    }
  }

  @keyframes lds-ripple {
    0% {
      width: 0%;
      height: 0%;
      opacity: 1;
    }
    100% {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
</style>

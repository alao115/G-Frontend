<template>
  <div class="container w-full p-8 xl:p-24 xl:pb-12 flex flex-col justify-center mx-auto h-1/2 font-body xl:pt-32" style="min-height: 516px">
    <div class="text-blue-920 w-full max-w-5xl mb-4 p-2 lg:p-16 pt-16">
      <div class="content">
        <h1 class="text-xl lg:text-3xl font-semibold leading-snug mt-8 mb-4">
          Préambule
        </h1>
        <p class="text-xl pl-4">
          <ol class="list-decimal">
            <li>Considérant que les parties désirent collaborer pour poursuivre des objectifs d’affaires communs.</li>
            <li>Considérant que les parties envisagent immobilier le présent contrat de collaboration comme étant le meilleur moyen de réaliser leurs objectifs communs.</li>
            <li>Le démarcheur, l’agent immobilier ou le propriétaire s’engagent à mettre à la disposition de l’entreprise Gontché des biens immobiliers</li>
          </ol>
          Considérant les engagements mutuels contenus dans le présent contrat, les parties conviennent de ce qui suit :
        </p>
      </div>
      <div class="content">
        <h1 class="text-xl lg:text-3xl font-semibold leading-snug mt-8 mb-4">
          1. Objectif social
        </h1>
        <p class="text-xl pl-4">
          Dans les limites fixées par le présent contrat, la société est spécialisée dans l’immobilier.
        </p>
      </div>
      <div class="content">
        <h1 class="text-xl lg:text-3xl font-semibold leading-snug mt-8 mb-4">
          2. Conditions
        </h1>
        <p class="text-xl pl-4">
          Cet accord prend effet à compter de la date de signature et se poursuivra jusqu’à la résiliation par l’une ou l’autre des parties conformément aux dispositions du présent accord. L’entreprise ne ne collabore pas avec plusieurs démarcheurs à la fois sur un même bien inscrit. S’ils sont plusieurs à avoir un contrat avec le propriétaire, l’entreprise Gontché par contre, reconnaîtra que le démarcheur qui nous a apporté le bien en premier, il reviendra à lui de prendre en charge les autres démarcheurs s’il en reconnaît. L’entreprise ne reconnaîtra qu’un seul démarcheur sur le bien immobilier. De plus, si le bien a été posté par nos propres soins ou par le propriétaire lui-même, nous avons aucun engagement envers aucun démarcheur lorsque ce dernier est loué depuis notre site internet.
        </p>
      </div>
      <div class="content">
        <h1 class="text-xl lg:text-3xl font-semibold leading-snug mt-8 mb-4">
          3. Statut du démarcheur et de l'agent immobilier
        </h1>
        <p class="text-xl pl-4">
          Cet accord ne constitue en aucun cas un accord d’embauche entre les parties. Cet accord ne doit pas être considéré comme un partenariat ou un joint-venture. En outre, l’Entreprise ne sera pas tenue responsable des engagements pris par le démarcheur ou l’agent immobilier ou propriétaire ; sauf accord mutuel écrit. De même, le démarcheur ou l’agent immobilier ou le propriétaire ne devra en aucun cas agir au nom de l’Entreprise ou engager d’une manière ou d’une autre la responsabilité de l’Entreprise, à moins qu’il n’en reçoive l’autorisation écrite.
        </p>
      </div>
      <div class="content">
        <h1 class="text-xl lg:text-3xl font-semibold leading-snug mt-8 mb-4">
          4. Tâches et obligations
        </h1>
        <p class="text-xl pl-4">
          <ul class="list-disc">
            <li>Le démarcheur ou l’agent immobilier accepte de consacrer le temps, le soin et l’énergie nécessaires pour mettre à la disponibilité de la société des biens immobiliers.</li>
            <li>Le démarcheur ou l’agent immobilier ne sera pas autorisé à exécuter les travaux qui ne sont pas prévus par cet accord.</li>
            <li>Le démarcheur ou l’agent immobilier ou le propriétaire ne doit pas mettre à la disposition de l’entreprise des biens indisponibles.</li>
            <li>Signaler le plus vite possible si un bien n’est plus disponible.</li>
            <li>Les biens misent à la disposition de l’entreprise doivent être accompagné de visuel (images et/ou vidéos)</li>
            <li>Se rendre disponible pour faire visiter les biens aux clients sans autres formes de rémunération que ce qui aurait été convenu en commun accord avec l’entreprise</li>
            <li>La location des biens est soumise aux textes en vigueur en République du Bénin. (Il s’agit de 3 mois de cautions). Toutes questions liées au paiement de pré payé de loyer ou de cautions d’électricité et eau, dépendent des conditions du propriétaire.</li>
          </ul>
        </p>
      </div>
      <div class="content">
        <h1 class="text-xl lg:text-3xl font-semibold leading-snug mt-8 mb-4">
          Bonus
        </h1>
        <p class="text-xl pl-4">
          <ul class="list-disc">
            <li>Gontché met à disposition des propriétaires ou agent immobilier, une équipe pour la prise des contenus visuels des divers appartements à un prix forfaitaire.</li>
            <li>Les services de Gontché sont extensibles.</li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

export default {
  layout: 'simple',
  async asyncData ({ $api, store, $auth }) {
    // console.log('Auth: ', $auth.loggedIn)
    if ($auth.loggedIn) { await store.dispatch('account/getAuthUserAccount') }

    const appartments = (await $api.appartmentService.getAllAppartmentFromREST()).data.appartments
    const appartmentTypes = (await $api.appartmentService.getAllAppartmentTypeFromREST()).data.appartmentTypes

    return {
      appartments,
      appartmentTypes
    }
  },
  created () {}
}
</script>

<style scoped>
  #landing-section {
    background-image: url('/assets/images/landing.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag'
import accountService from './account.service'
import appartmentService from './appartment.service'
import appartmentDetailService from './appartmentDetail.service'
import appartmentTypeService from './appartmentType.service'
import publicationService from './publication.service'
import reservationService from './reservation.service'
import visitService from './visit.service'
import firebaseStorageService from './firebase.storage.service'

export default ({ apollo }, $axios) => ({
  accountService: new (accountService({ apollo, gql }, $axios))(),
  appartmentService: new (appartmentService({ apollo, gql, $axios }))(),
  appartmentDetailService: new (appartmentDetailService({ apollo, gql }))(),
  appartmentTypeService: new (appartmentTypeService({ apollo, gql }))(),
  publicationService: new (publicationService({ apollo, gql }))(),
  reservationService: new (reservationService({ apollo, gql }))(),
  visitService: new (visitService({ apollo, gql }))(),
  firebaseStorageService: new (firebaseStorageService({ http: $axios, serviceName: 'storage' }))()
})

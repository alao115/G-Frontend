// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag'
import accountService from './account.service'
import appartmentService from './appartment.service'
import appartmentDetailService from './appartmentDetail.service'
import appartmentTypeService from './appartmentType.service'
import publicationService from './publication.service'
import reservationService from './reservation.service'
import visitService from './visit.service'

// const servicesName = [
//   'districts',
//   'countries',
//   'regions',
//   'zones',
//   'clubs',
//   // 'members',
//   'users'
// ]

// const servicesFunc = ({ http }) => {
//   const services = {}

//   servicesName.forEach((serviceName) => {
//     const tempName = serviceName.replace(/s$/, '')
//     services[tempName + 'Service'] = new (genericService({ http, serviceName }))()
//   })
//   return services
// }

export default ({ apollo }) => ({
  accountService: new (accountService({ apollo, gql }))(),
  appartmentService: new (appartmentService({ apollo, gql }))(),
  appartmentDetailService: new (appartmentDetailService({ apollo, gql }))(),
  appartmentTypeService: new (appartmentTypeService({ apollo, gql }))(),
  publicationService: new (publicationService({ apollo, gql }))(),
  reservationService: new (reservationService({ apollo, gql }))(),
  visitService: new (visitService({ apollo, gql }))()
  // memberService: new (memberService({ http, serviceName: 'members' }))()
})

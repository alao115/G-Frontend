import auth from './auth'
import memberService from './member.service'
import genericService from './serviceGenerator'

const servicesName = [
  'districts',
  'countries',
  'regions',
  'zones',
  'clubs',
  // 'members',
  'users'
]

const servicesFunc = ({ http }) => {
  const services = {}

  servicesName.forEach(serviceName => {
    const tempName = serviceName.replace(/s$/, '')
    services[tempName + 'Service'] = new (genericService({ http, serviceName }))
  })
  return services
}

export default ({ http }) => ({
  authService: auth({ http }),
  ...servicesFunc({ http }),
  memberService: new (memberService({ http, serviceName: 'members' }))
})

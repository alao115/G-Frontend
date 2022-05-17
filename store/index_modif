import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const search = (parsed.search && JSON.parse(parsed.search)) || null
      commit('search/setSearch', search)
    }
  },
}
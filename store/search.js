import Cookies from 'js-cookie'
    
    export const state = () => ({
      search: {},
    })
    
    export const mutations = {
      setSearch(state, search) {
        state.search = search
      },
      createSearch(state, search) {},
      add(state, search) {
        const record = state.search.find((i) => i.id === search.id)
    
        if (!record) {
          state.search.push({
            quantity: 1,
            ...search,
          })
        } else {
          record.quantity++
        }
    
        Cookies.set('search', JSON.stringify(state.search))
      },
      remove(state, search) {
        const record = state.search.find((i) => i.id === search.id)
    
        if (record.quantity > 1) {
          record.quantity--
        } else {
          const index = state.search.findIndex((i) => i.id === search.id)
          state.search.splice(index, 1)
        }
    
        Cookies.set('search', JSON.stringify(state.search))
      },
      emptyList(state) {
        state.search = []
        Cookies.set('search', JSON.stringify(state.search))
      },
    }
    
    export const getters = {
      search: (state) => {
        return state.search
      },
      price: (state) => {
        return state.search.reduce(
          (accumulator, search) =>
            accumulator + search.attributes.price * search.quantity,
          0
        )
      },
      numberOfSearchs: (state) => {
        return state.search.reduce(
          (accumulator, search) => accumulator + search.quantity,
          0
        )
      },
    }
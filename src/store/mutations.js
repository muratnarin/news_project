const mutations = {
    syncStore(state) {
        if (localStorage.getItem('newspapers')) {
            state.newspapers = JSON.parse(localStorage.getItem('newspapers'));
        }
        if (localStorage.getItem('favList')) {
            state.favList = JSON.parse(localStorage.getItem('favList'));
        }
    },
    SET_NEWSPAPERS(state, payload) {
        state.newspapers = payload.map(v => ({...v, isFav: false}))
        localStorage.setItem('newspapers',JSON.stringify(state.newspapers))
    },
    SET_FAV(state, payload) {
        state.favList.push(payload)
        localStorage.setItem('favList',JSON.stringify(state.favList))
    },
    REMOVE_FAV(state, payload) {
        state.favList = state.favList.filter(v => v.id !== payload.id)
        localStorage.setItem('favList',JSON.stringify(state.favList))
    },
    SET_NEWS(state, payload) {
        state.news = payload
    },
    SET_TOTAL(state, payload) {
        state.total = payload
    },
    SET_CURRENT_NEWS(state, payload) {
        state.currentNews = payload
    },
}

export default mutations


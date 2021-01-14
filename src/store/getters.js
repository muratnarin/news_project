const getters = {
    getNewspapers(state) {
        return state.newspapers
    },
    getFavs(state) {
        return state.favList
    },
    getNews(state) {
        return state.news
    },
    getTotal(state) {
        return state.total
    },
    getCurrentNews(state) {
        return state.currentNews
    }
}

export default getters

import axios from '@/plugins/axios';

const actions = {
    fetchNewsPapers({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/sources',{
                params: {
                    country: 'us'
                }
            })
                .then((response) => {
                    commit('SET_NEWSPAPERS', response.data.sources)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchNews({commit}, page) {
        return new Promise((resolve, reject) => {
            axios.get('/top-headlines', {
                params: {
                    country:'us',
                    page: page || 1,
                    pageSize: 12
                }
            })
                .then((response) => {
                    commit('SET_NEWS', response.data.articles)
                    commit('SET_TOTAL', response.data.totalResults)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchFilteredNews({commit}, {searchText, page}) {
        console.log(searchText)
        return new Promise((resolve, reject) => {
            axios.get('/top-headlines', {
                params: {
                    country:'us',
                    q: searchText || null,
                    page: page || 1,
                    pageSize: 12
                }
            })
                .then((response) => {
                    commit('SET_NEWS', response.data.articles)
                    commit('SET_TOTAL', response.data.totalResults)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchCurrentNews({commit}, source) {
        return new Promise((resolve, reject) => {
            axios.get('/everything', {
                params: {
                    sources: source || null,
                }
            })
                .then((response) => {
                    console.log(response.data)
                    commit('SET_CURRENT_NEWS', response.data.articles)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchFilteredCurrentNews({commit}, {source, searchText}) {
        return new Promise((resolve, reject) => {
            axios.get('/everything', {
                params: {
                    sources: source || null,
                    q: searchText || null
                }
            })
                .then((response) => {
                    console.log(response.data)
                    commit('SET_CURRENT_NEWS', response.data.articles)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
}

export default actions


import axios from 'axios'

const baseURL = 'https://newsapi.org/v2'

export default axios.create({
    baseURL: baseURL,
    headers:{
        'Authorization': 'Bearer cc3c6f7585244c5e8953c0f5e4801357'
    }
})

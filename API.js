import axios from 'axios'
import { API_KEY } from 'react-native-dotenv'


const YELP_API_KEY = API_KEY

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
})

const getCourts = userLocation => {
  return api
    .get('/businesses/search', {
      params: {
        limit: 10,
        categories: 'basketballcourt',
        ...userLocation,
      },
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates,
        }
      })
    )
    .catch(error => console.error(error))
}

export default {
  getCourts,
}
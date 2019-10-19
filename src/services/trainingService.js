import axios from 'axios'
const baseUrl = 'https://customerrest.herokuapp.com/api/trainings'

  const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const getSpecific = url => {
    return axios.get(url)
    //return axios.get(`https://customerrest.herokuapp.com/api/customers/${uid}/trainings`)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

  const remove = link => {
    const request = axios.delete(link)
    return request.then(response => response.data)
}

  export default { 
    getAll, 
    create,
    getSpecific,
    remove
  }
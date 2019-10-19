import axios from 'axios'
const baseUrl = 'https://customerrest.herokuapp.com/api/customers'

  const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }

  const remove = url => {
    const request = axios.delete(url)
    return request.then(response => response.data)
}


  export default { 
    getAll, 
    create, 
    update,
    remove
  }
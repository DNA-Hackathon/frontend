import axios from 'axios'

const URL = 'URL'

export async function send_image_and_bbox (image, bbox) {
  const endpoint = URL + '/compute_bbox'
  const json = {
    image,
    bbox
  }
  return axios.post(endpoint, json)
}

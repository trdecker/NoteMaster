/**
 * @file usersApi.js
 * @description The api calls to the backend to sign up and login
 * @author Tad Decker
 * 
 * 11/20/2023
 */

import axios from 'axios'
import config from '../config/config.js'

const url = config.url
const corsProxyUrl = config.corsProxyUrl
const dev = config.dev

export async function signup(username, password) {
  try {
    const body = { username, password }
    const path =  `${dev ? corsProxyUrl : ''}${url}/users/signup`

    console.log(body, path)

    const response = await axios.post(path, body)

    if (response.status === 200) {
      return response.data
    }
    else return null

  } catch (e) {
    console.error(e)
  }
}

export async function login(username, password) {
  try {
    const path =  `${dev ? corsProxyUrl : ''}${url}/users/login`
    const body = { username, password }

    const response = await axios.post(path, body)

    if (response.status === 200) {
      return response.data
    }
    else return null

  } catch (e) {
    console.error(e)
  }
}

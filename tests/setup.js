import axios from 'axios'
import { init } from '@/init'

init()
// Fixes "Cross origin http://localhost forbidden"
// Maybe it's better to use moxios instead of nock
// to avoid using require
axios.defaults.adapter = require('axios/lib/adapters/http')

import axios from 'axios'
import Vue from 'vue'
import Vuetify from 'vuetify'
import { init } from '@/init'

Vue.use(Vuetify)
init()
// Fixes "Cross origin http://localhost forbidden"
// Maybe it's better to use moxios instead of nock
// to avoid using require
axios.defaults.adapter = require('axios/lib/adapters/http')

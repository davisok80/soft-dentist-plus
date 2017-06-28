import Vue from 'vue'
import Router from 'vue-router'

import formLogin from '@/components/master/formLogin'
import formMenu from '@/components/master/formMenu'
import formPatients from '@/components/modules/formPatients'
import formSpecialist from '@/components/modules/formSpecialist'
import formQuotes from '@/components/modules/formQuotes'
import formOdontogram from '@/components/modules/formOdontogram'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'formLogin',
      component: formLogin
    },
    {
      path: '/master/menu',
      name: 'formMenu',
      component: formMenu
    },
    {
      path: '/module/patients',
      name: 'formPatients',
      component: formPatients
    },
    {
      path: '/module/specialist',
      name: 'formSpecialist',
      component: formSpecialist
    },
    {
      path: '/module/quotes',
      name: 'formQuotes',
      component: formQuotes
    },
    {
      path: '/module/odontogram',
      name: 'formOdontogram',
      component: formOdontogram
    }
  ]
})

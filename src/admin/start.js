import routes from './routes'
import { createWebHashHistory, createRouter } from 'vue-router'
import productio from './Bits/AppMixins'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const framework = new productio()

console.log('Hello from admin/start.js')

framework.app.config.globalProperties.appVars = window.productioAdmin

window.productioApp = framework.app.use(router).mount('#productio_app')

router.afterEach((to, from) => {
  jQuery('.productio_menu_item').removeClass('active')
  let active = to.meta.active
  if (active) {
    jQuery('.productio_main-menu-items')
      .find('li[data-key=' + active + ']')
      .addClass('active')
  }
})

//update nag remove from admin, You can remove if you want to show notice on admin
jQuery('.update-nag,.notice, #wpbody-content > .updated, #wpbody-content > .error').remove()

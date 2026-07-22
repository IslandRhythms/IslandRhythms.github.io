import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import { site } from '../content/site'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingView,
    meta: { title: `${site.name}, ${site.role}` },
  },
  {
    path: '/resume',
    name: 'resume',
    // Code-split: the résumé is a secondary page, no reason to ship it up front.
    component: () => import('../views/ResumeView.vue'),
    meta: { title: `Résumé | ${site.name}` },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: `Page not found | ${site.name}` },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return {
        el: to.hash,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        // Clear the fixed header.
        top: 96,
      }
    }

    // Same-page navigation to a hashless route shouldn't jump the scroll.
    if (to.path === from.path) return false

    return { top: 0 }
  },
})

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router

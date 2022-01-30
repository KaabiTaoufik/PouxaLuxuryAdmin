import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Pouxa Luxury'

// ** Default Route
const DefaultRoute = '/acceuil'

// ** Merge Routes
const Routes = [
  {
    path: '/acceuil',
    component: lazy(() => import('../../views/Home/'))
  },
  {
    path: '/commandes',
    component: lazy(() => import('../../views/e-commerce/Orders/'))
  },
  {
    path: '/produits',
    component: lazy(() => import('../../views/e-commerce/Products/'))
  },
  {
    path: '/categories',
    component: lazy(() => import('../../views/e-commerce/Categories/'))
  },
  {
    path: '/stats/audience',
    component: lazy(() => import('../../views/stats/Audience/'))
  },
  {
    path: '/stats/shop',
    component: lazy(() => import('../../views/stats/Shop/'))
  },
  {
    path: '/utilisateurs',
    component: lazy(() => import('../../views/access-control/Users/'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }

import { Home, Globe, ShoppingCart, PieChart, Shield } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTshirt, faTh, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    header: ""
  },
  {
    id: 'home',
    title: 'Page d\'acceuil',
    icon: <Home size={20} />,
    navLink: '/acceuil'
  },
  {
    id: 'website',
    title: 'Site web',
    icon: <Globe size={20} />,
    externalLink: true,
    newTab: true,
    navLink: 'https://google.com/'
  },
  {
    header: "E-commerce"
  },
  {
    id: 'Commandes',
    title: 'Commandes',
    icon: <ShoppingCart size={20} />,
    navLink: '/commandes'
  },
  {
    id: 'Produits',
    title: 'Produits',
    icon: <FontAwesomeIcon icon={faTshirt}/>,
    navLink: '/produits'
  },
  {
    id: 'Categories',
    title: 'Catégories',
    icon: <FontAwesomeIcon icon={faTh}/>,
    navLink: '/categories'
    
  },
  {
    header: "Statistiques"
  },
  {
    id: 'UsersStats',
    title: 'Audience',
    icon: <FontAwesomeIcon icon={faChartLine}/>,
    navLink: '/stats/audience'
  },
  {
    id: 'ProductsStats',
    title: 'Produits & Achats',
    icon: <PieChart size={20} />,
    navLink: '/stats/shop'
  },
  {
    header: "Contrôle d\'accs"
  },
  {
    id: 'Users',
    title: 'Rôles & Autorisation',
    icon: <Shield size={20} />,
    navLink: '/utilisateurs'
  }
]

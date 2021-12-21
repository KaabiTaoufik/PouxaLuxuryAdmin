import { Mail, Home, Globe, ShoppingCart, Circle } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTshirt, faTh } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    header: ""
  },
  {
    id: 'home',
    title: 'Page d\'acceuil',
    icon: <Home size={20} />,
    navLink: '/home'
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
    icon: <ShoppingCart size={20} />
  },
  {
    id: 'Produits',
    title: 'Produits',
    icon: <FontAwesomeIcon icon={faTshirt}/>,
    children: [
      {
        id: 'ProductList',
        title: 'Liste des produits',
        icon: <Circle size={12} />
      },
      {
        id: 'ProductGrid',
        title: 'Grille des produits',
        icon: <Circle size={12} />
      },
      {
        id: 'CommandesList',
        title: 'Liste des commandes',
        icon: <Circle size={12} />
      }
    ]
  },
  {
    id: 'Categories',
    title: 'Catégories',
    icon: <FontAwesomeIcon icon={faTh}/>
    
  },
  {
    header: "Statistiques"
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    header: "Utilisateurs et roles"
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  }
]

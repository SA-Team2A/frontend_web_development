// Components
import Home from '../components/home/Home'
import SignUp from '../components/auth/SignUp'
import SignIn from '../components/auth/SignIn'
import Landing from '../components/landing/Landing'
import Profile from '../components/profile/Profile'
import Recipe from '../components/recipes/Recipe'
import RecipeForm from '../components/recipes/RecipeForm'

// User status
const AUTHED = true
const UNAUTHED = false

// TODO Not found route

// Routes
export const Routes = [
  { component: Landing,
    path: '/',
    redirect: { to: '/home', when: AUTHED }
  },
  { component: SignIn,
    path: '/signin',
    redirect: { to: '/home', when: AUTHED }
  },
  { component: SignUp,
    path: '/signup',
    redirect: { to: '/home', when: AUTHED }
  },
  { component: Home,
    path: '/home',
    redirect: { when: UNAUTHED, to: '/' }
  },
  { component: Profile,
    path: '/profile/:param?',
    redirect: { when: UNAUTHED, to: '/signin' }
  },
  { component: RecipeForm,
    path: '/new_recipe',
    redirect: { when: UNAUTHED, to: '/' } //UNAUTHED
  },
  { component: Recipe,
    path: '/recipe/:param',
    redirect: { when: UNAUTHED, to: '/'} //UNAUTHED
  }
]

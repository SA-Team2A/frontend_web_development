// Components
import Home from '../components/home/Home'
import SignUp from '../components/auth/SignUp'
import SignIn from '../components/auth/SignIn'
import Landing from '../components/landing/Landing'
import Profile from '../components/profile/Profile'
import Recipe from '../components/recipes/Recipe'
import RecipeForm from '../components/recipes/RecipeForm'
import UpdateProfile from '../components/profile/UpdateProfile'

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
    redirect: { to: '/', when: UNAUTHED }
  },
  { component: Profile,
    path: '/profile/:param?',
    redirect: { to: '/signin', when: UNAUTHED  }
  },
  { component: RecipeForm,
    path: '/new_recipe',
    redirect: { to: '/', when: UNAUTHED }
  },
  { component: Recipe,
    path: '/recipe/:param',
    redirect: { to: '/', when: UNAUTHED }
  },
  { component: UpdateProfile,
    path: '/update_profile',
    redirect: { to: '/signup', when: UNAUTHED }
  }
]

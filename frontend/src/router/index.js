// eslint-disable-next-line vue/no-unused-components
import Vue from 'vue';
import Router from 'vue-router';
import Header from '@/sharedComponents/Header';

import Auth from '@/components/auth/Auth';
import Login from '@/components/auth/components/Login';
import Signup from '@/components/auth/components/Signup';
import Home from '@/components/home/Home';
import Profile from '@/components/profile/Profile';
import ProfileDisplay from '@/components/profile/components/ProfileDisplay';
import ProfileEdit from '@/components/profile/components/ProfileEdit';
import ProfileDelete from '@/components/profile/components/ProfileDelete';
import UsersList from '@/components/usersList/UsersList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth',
      components: {
        default: Auth,
      },
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
        },
        {
          path: 'signup',
          name: 'signup',
          component: Signup,
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: Home,
        header: Header,
      },
    },
    {
      path: '/usersList',
      name: 'usersList',
      components: {
        default: UsersList,
        header: Header,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: Profile,
        header: Header,
      },
      children: [
        {
          path: '',
          name: 'profileDisplay',
          component: ProfileDisplay,
        },
        {
          path: '/profileEdit',
          name: 'profileEdit',
          component: ProfileEdit,
        },
        {
          path: '/profileDelete',
          name: 'profileDelete',
          component: ProfileDelete,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

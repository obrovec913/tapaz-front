import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import GeneralInformation from '../views/GeneralInformation.vue';
import Contacts from '../views/Contacts.vue';
import Login from '../views/Login.vue';
import Articles from '../views/Articles.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'About',
    component: GeneralInformation,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const tabTitle: string = 'TAPAZ-2';
  document.title = tabTitle;
  next();
});

export default router;

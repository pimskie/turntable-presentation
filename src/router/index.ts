import { createRouter, createWebHistory } from 'vue-router';
import LoadingView from '../views/LoadingView.vue';
import SpeedView from '../views/SpeedView.vue';
import ReverseView from '../views/ReverseView.vue';
import SwitchView from '../views/SwitchView.vue';
import TrackView from '../views/TrackView.vue';
import OffsetView from '../views/OffsetView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoadingView
    },
    {
      path: '/speed',
      name: 'speed',
      component: SpeedView
    },
    {
      path: '/reverse',
      name: 'reverse',
      component: ReverseView
    },
    {
      path: '/switch',
      name: 'switch',
      component: SwitchView
    },
    {
      path: '/track',
      name: 'track',
      component: TrackView
    },
    {
      path: '/offset',
      name: 'offset',
      component: OffsetView
    }
  ]
});

export default router;

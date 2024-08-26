import { createRouter, createWebHashHistory } from 'vue-router';
import BufferView from '../views/BufferView.vue';
import SpeedView from '../views/SpeedView.vue';
import ReverseView from '../views/ReverseView.vue';
import SwitchView from '../views/SwitchView.vue';
import TrackView from '../views/TrackView.vue';
import OffsetView from '../views/OffsetView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'buffer-it',
      component: BufferView
    },
    {
      path: '/speed',
      name: 'setting-speed',
      component: SpeedView
    },
    {
      path: '/reverse',
      name: 'reverse-it',
      component: ReverseView
    },
    {
      path: '/switch',
      name: 'switch-it',
      component: SwitchView
    },
    {
      path: '/track',
      name: 'track-it',
      component: TrackView
    },
    {
      path: '/offset',
      name: 'offset-it',
      component: OffsetView
    }
  ]
});

export default router;

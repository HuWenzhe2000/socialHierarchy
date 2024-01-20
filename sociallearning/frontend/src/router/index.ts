import { createRouter,createWebHashHistory} from "vue-router";

const choose = () => import('../Choose.vue')
const login = () => import('../Login.vue')
const network = () => import('../Network.vue')
const room = () => import('../Room.vue')
const neighbor = () => import('../Neighbor.vue')
const waiting = () => import('../Waiting.vue')
const reward = () => import('../Reward.vue')
const feedback = () => import('../Feedback.vue')
const end = () => import('../End.vue')
const routes = [
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/choose",
    name: "choose",
    component: choose,
    props: true  
  },
  {
    path: "/room",
    name: "room",
    component: room,
    props: true  
  },
  {
    path: "/network",
    name: "network",
    component: network,
    props: true  
  },
  {
    path: "/neighbor",
    name: "neighbor",
    component: neighbor,
    props: true  
  },
  {
    path: "/waiting",
    name: "waiting",
    component: waiting,
    props: true  
  },
  {
    path: "/showReward",
    name: "showReward",
    component: reward,
    props: true  
  },
  {
    path: "/feedback",
    name: "feedback",
    component: feedback,
    props: true  
  },
  {
    path: "/end",
    name: "end",
    component: end,
    props: true  
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})


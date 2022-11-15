const routes = [
    { path: '/movies', component:Movies }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({})

app.use(router)

app.mount('#app')
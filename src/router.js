import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

let router = new VueRouter({
    mode: "history",
    base:process.env.BASE_URL,
    routes: [{
            path: "/GuidePage",
            name: "GuidePage",
            component: () => import("./components/GuidePage.vue")
        },
        {
            path: "/CommentsPage",
            component: () => import("./components/CommentsPage.vue"),
            name: "CommentsPage"
        },
        {
            path: "/SellerPage",
            component: () => import("./components/SellerPage.vue"),
            name: "SellerPage"
        }
    ]
})
export default router
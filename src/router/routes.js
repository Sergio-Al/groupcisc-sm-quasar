const routes = [
  {
    path: "/",
    redirect: "/system",
  },

  {
    path: "/system",
    name: "System",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "SystemMain",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "users",
        name: "SystemUsers",
        component: () => import("pages/Users.vue"),
      },
      {
        path: "clients",
        name: "SystemClients",
        component: () => import("pages/Clients.vue"),
      },
      {
        path: "clients/:id",
        name: "SystemClientsDetails",
        props: true,
        component: () => import("pages/ClientDetails.vue"),
      },
      {
        path: "options",
        name: "SystemOptions",
        component: () => import("pages/Options.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("layouts/SignUpPage.vue"),
    meta: {
      requiresUnauth: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("layouts/LoginLayout.vue"),
    meta: {
      requiresUnauth: true,
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;

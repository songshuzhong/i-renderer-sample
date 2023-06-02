export default {
  renderer: 'page',
  body: {
    renderer: 'layout',
    direction: 'vertical',
    body: [
      {
        renderer: 'header',
        body: [
          {
            renderer: 'menu',
            router: true,
            body: [
              {
                name: '/',
                title: 'Home',
                renderer: 'menuitem',
                icon: 'HomeFilled'
              },
              {
                name: 'index',
                title: 'Index',
                renderer: 'menuitem',
                icon: 'LocationInformation'
              },
              {
                name: 'about',
                title: 'About',
                renderer: 'menuitem',
                icon: 'Tickets'
              }
            ]
          }
        ]
      },
      {
        renderer: 'main',
        routerView: true
      },
      {
        renderer: 'footer',
        classname: 'i-renderer-sample__footer',
        body: 'from i-renderer-sample'
      }
    ]
  }
};
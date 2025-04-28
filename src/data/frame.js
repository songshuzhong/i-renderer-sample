export default {
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
              name: '',
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
            },
            {
              name: 'url',
              title: 'Url',
              renderer: 'menuitem',
              icon: 'Download'
            },
          ]
        },
        {
          renderer: 'action',
          icon: 'Edit',
          category: 'icon',
          size: 18,
          name: '',
          actionType: 'drawer',
          body: {
            width: 100,
            appendToBody: true,
            withHeader: false,
            classname: 'i-renderer-sample__editor',
            body: [
              {
                renderer: 'editor',
                editable: true,
                nimble: true,
                isJson: false,
              },
              {
                renderer: 'action',
                icon: 'Close',
                category: 'icon',
                size: 18,
                classname: 'i-renderer-sample__editor__close'
              }
            ]
          }
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
};

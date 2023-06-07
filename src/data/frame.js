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
            },
            {
              name: 'url',
              title: 'Url',
              renderer: 'menuitem',
              icon: 'Download'
            }
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
            classname: 'i-renderer-sample__editor',
            header: {
              renderer: 'html',
              html: '编辑页面'
            },
            body: [
              {
                renderer: 'editor',
                editable: true,
                isJson: false,
                theme: 'vs'
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

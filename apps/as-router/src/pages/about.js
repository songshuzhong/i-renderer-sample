export default {
  renderer: 'page',
  style: {
    padding: '20px'
  },
  body: [
    {
      renderer: 'action',
      text: 'home',
      isText: true,
      actionType: 'url',
      url: '/home'
    },
    {
      renderer: 'action',
      text: 'dialog',
      actionType: 'dialog',
      body: {
        body: {
          renderer: 'html'
        },
        footer: [
          {
            renderer: 'action',
            text: 'close',
          }
        ]
      }
    }
  ]
}
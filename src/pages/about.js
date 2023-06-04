export default {
  renderer: 'page',
  initData: {
    message: 'how are you doing.'
  },
  body: [
    {
      renderer: 'html',
      html: '<h2>About.</h2>'
    },
    {
      renderer: 'action',
      text: 'dialog',
      actionType: 'dialog',
      body: {
        title: 'details',
        appendToBody: true,
        body: [
          {
            renderer: 'data'
          }
        ],
        fullscreen: false,
        center: false,
        closeOnClickModal: true,
        closeOnPressEscape: true
      }
    }
  ]
}

export default {
  renderer: 'page',
  body: [
    {
      renderer: 'html',
      html: '<h2>About.</h2>'
    },
    {
      renderer: 'action',
      text: '点击弹窗',
      actionType: 'dialog',
      body: {
        title: '卡片详情',
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

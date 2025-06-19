export default {
  name: 'i-website__container',
  classname: 'i-website__container',
  title: '百搭云平台',
  logo: 'https://songshuzhong.github.io/i-assets/public/img/shuttle.png',
  header: {
    classname: 'i-website__header',
    tags: true,
    body: [
      {
        renderer: 'input',
        name: 'search',
        placeholder: '请输入搜索内容',
        style: {
          width: '200px',
          marginRight: '10px',
          fontSize: '12px',
          height: '27px',
          '--el-border-color': 'transparent',
          '--el-text-color-regular': 'white',
          '--el-input-bg-color': '#415576',
          '--el-fill-color-light': '#415576'
        },
        footer: [
          {
            renderer: 'action',
            icon: 'Search',
            category: 'icon',
            size: 14
          }
        ]
      },
      {
        renderer: 'action',
        icon: 'Refresh',
        category: 'icon',
        size: 18,
        name: '',
        actionType: 'reload',
        reload: 'AdminRouterView'
      },
      {
        renderer: 'action',
        icon: 'Setting',
        category: 'icon',
        size: 18,
        name: '',
        actionType: 'drawer',
        body: {
          width: 25,
          appendToBody: true,
          body: [
            {
              renderer: 'setting'
            }
          ]
        }
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
          closable: true,
          classname: 'i-renderer-sample__editor',
          modal: false,
          body: [
            {
              renderer: 'editor',
              editable: true,
              isJson: false,
              nimble: true,
              classname: 'i-website__json-editor'
            },
            {
              renderer: 'action',
              icon: 'Close',
              category: 'icon',
              size: 18,
              name: '',
              actionType: 'inhert',
              classname: 'i-website__editor__close'
            }
          ]
        }
      },
      {
        "renderer": "service",
        "style": {
          "display": "inline-block",
          marginLeft: '20px',
          transform: 'translateY(12px)'
        },
        "initApi": {
          "url": "/antd-user.json",
          "method": "get",
          "cached": false,
          "debounce": 0,
          "params": {}
        },
        "body": [
          {
            "renderer": "avatar",
            "src": "${avatar}",
            "shape": "circle",
            size: 36,
            "isComputedSrc": true,
            "borderRadius": 0
          },
          {
            "renderer": "dropdown",
            "text": "<%=$.name%>",
            "type": "primary",
            "plain": false,
            "size": "medium",
            "circle": false,
            "trigger": "click",
            style: {
              paddingTop: '3px',
              color: 'var(--el-fill-color-blank)'
            },
            "body": [
              {
                "renderer": "avatar",
                "src": "${avatar}",
                "shape": "circle",
                "isComputedSrc": true,
                "borderRadius": 0,
                "subTitle": "<%=$.name%>",
                "description": "<%=$.email%>"
              },
              {
                "renderer": "action",
                "divided": true,
                "text": "文档",
                "isText": true,
                "tag": "a",
                "icon": "AddLocation"
              },
              {
                "renderer": "action",
                "text": "个人中心",
                "isText": true,
                "tag": "a",
                "icon": "HomeFilled"
              },
              {
                "renderer": "action",
                "text": "源码",
                "isText": true,
                "tag": "a",
                "icon": "Document"
              },
              {
                "renderer": "action",
                "divided": true,
                "text": "退出登录",
                "isText": true,
                "tag": "a",
                "icon": "SwitchButton",
                "popupType": "dialog",
                "actionType": "ajax",
                "popoverTitle": "确定退出吗？",
                "actionApi": {
                  "url": "/logout",
                  "method": "post",
                  "params": {}
                }
              }
            ]
          }
        ]
      }
    ]
  },
  menu: {
    name: 'i-website-nav',
    router: true,
    mode: 'vertical',
    discolor: true,
    defaultActive: '',
    target: 'i-website__container',
    initApi: {
      url: '/menu.json'
    }
  },
  aside: {
    classname: 'i-website__aside',
    body: [
      {
        renderer: 'wrapper',
        classname: 'i-website__ads',
        body: [
          {
            renderer: 'carousel',
            classname: 'i-home__carousel',
            autoplay: true,
            loop: true,
            body: [
              {
                renderer: 'render',
                body: [
                  {
                    innerHTML: '招租广告位1',
                    tag: 'span',
                    classname: 'i-render__container',
                    action: {
                      renderer: 'action',
                      actionType: 'ajax',
                      actionApi: {
                        url: 'https://www.fastmock.site/mock/a93e0b29161761b8153cbc02db04c643/api/ads_click?order=1',
                        method: 'get'
                      }
                    }
                  }
                ]
              },
              {
                renderer: 'render',
                body: [
                  {
                    innerHTML: '招租广告位2',
                    tag: 'span',
                    classname: 'i-render__container',
                    action: {
                      renderer: 'action',
                      actionType: 'ajax',
                      actionApi: {
                        url: 'https://www.fastmock.site/mock/a93e0b29161761b8153cbc02db04c643/api/ads_click?order=2',
                        method: 'get'
                      }
                    }
                  }
                ]
              },
              {
                renderer: 'render',
                body: [
                  {
                    innerHTML: '招租广告位3',
                    tag: 'span',
                    classname: 'i-render__container',
                    action: {
                      renderer: 'action',
                      actionType: 'ajax',
                      actionApi: {
                        url: 'https://www.fastmock.site/mock/a93e0b29161761b8153cbc02db04c643/api/ads_click?order=3',
                        method: 'get'
                      }
                    }
                  }
                ]
              }
            ],
            height: 140,
            indicatorPosition: 'none',
            arrow: 'always'
          }
        ]
      }
    ]
  },
  body: {
    renderer: 'main',
    name: 'AppMain',
    classname: 'i-website__main',
  }
};

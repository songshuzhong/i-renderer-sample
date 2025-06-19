export default {
  renderer: 'page',
  initData: {
    'IWebsiteExpand': true,
    "Combo": [{
      "type": 1,
      "jieshouqiuhe": "jieshouqiuhe",
      "family": [{"jieshouqiuhe": "asdfasf"}, {"jieshouqiuhe": "132412"}]
    }, {"type": "2", "family": []}, {"type": "3", "family": []}, {"type": "4", "family": []}, {
      "type": "4",
      "family": []
    }, {"type": "5", "family": []}],
    "jieshouqiuhe": "",
    "calender1": "2024-07-24T05:32:04.766Z",
    "qiehuanfenlu": "",
    "ceshi": "",
    "xiala": "",
    "fenluceshi1": "",
    "calender2": "2024-07-24T05:32:04.766Z",
    "fenluceshi2": "",
    "calender3": "2024-07-24T05:32:04.767Z",
    "tabs": "",
    "calender4": "2024-07-24T05:32:04.767Z",
    "IWebsiteExpand": false
  },
  body: [
    {
      "renderer": "table",
      "initApi": {
        "url": "https://local.netease.com/static/api/videos.json"
      },
      actions: [
        {
          renderer: 'action',
        }
      ],
      "columns": [
        {
          "label": "id",
          "name": "id",
          "width": "-",
          "sortable": false,
          "fixed": false,
          "type": "-",
          "align": "none",
          header: [
            {
              renderer: 'html'
            }
          ],
          body: [
            {
              renderer: 'html'
            }
          ]
        },
        {
          "label": "图片",
          "name": "cover",
          "width": "-",
          "sortable": false,
          "fixed": false,
          "type": "-",
          "align": "none"
        },
        {
          "label": "视频",
          "name": "video",
          "width": "-",
          "sortable": false,
          "fixed": false,
          "type": "-",
          "align": "none",
          "groupBy": "多媒体"
        },
        {
          "label": "音频",
          "name": "audio",
          "width": "-",
          "sortable": false,
          "fixed": false,
          "type": "-",
          "align": "none",
          "groupBy": "多媒体"
        },
        {
          "label": "操作",
          "width": "-",
          "sortable": false,
          "fixed": false,
          "type": "-",
          "align": "none"
        }
      ],
      "highlightCurrentRow": false
    },
    {
      renderer: 'affix',
      offset: 60,
      body: {
        renderer: 'anchor',
        direction: 'horizontal',
        options: [
          {
            href: 'jieshouqiuhe',
            title: '基本信息'
          },
          {
            href: 'fenluceshi1',
            title: 'form分录测试1'
          },
          {
            href: 'fenluceshi2',
            title: 'form分录测试2'
          },
          {
            href: 'tabs',
            title: '分录1'
          },
        ]
      }
    },
    {
      renderer: 'html',
      html: '差旅报销单',
      click: () => {
        console.log(1343);
      }
    },
    {
      renderer: 'form',
      controls: [
        {
          renderer: 'divider',
          label: '基本信息'
        },
        {
          "renderer": "switch",
          "inactiveText": "Expand",
          "activeText": "Fold",
          "name": "IWebsiteExpand",
          "type": "icon"
        },
        {
          renderer: 'combo',
          name: 'Combo',
          label: 'combo',
          category: 'table',
          type: 'multiple',
          controls: [
            {
              renderer: 'input',
              label: 'type',
              name: 'type'
            },
            {
              renderer: 'radio',
              id: 'jieshouqiuhe',
              label: '接收分录求和',
              name: 'jieshouqiuhe',
              visibleOn: '$.isEditing',
              options: [
                {
                  text: '选01',
                  value: 1
                },
                {
                  text: '选2',
                  value: 2
                }
              ]
            },
            {
              renderer: 'html',
              html: '<%=$.jieshouqiuhe%>',
              visibleOn: '!$.isEditing',
            },
            {
              renderer: 'combo',
              name: 'family',
              label: 'family',
              category: 'table',
              type: 'multiple',
              controls: [
                {
                  renderer: 'input',
                  id: 'jieshouqiuhe',
                  label: '接收分录求和',
                  name: 'jieshouqiuhe'
                }
              ]
            },
            {
              "renderer": "switch",
              "label": "操作",
              "inactiveText": "编辑",
              "activeText": "保存",
              "name": "isEditing",
              "type": "button"
            },
          ]
        },
        {
          renderer: 'html',
          html: '<%=$.Combo.reduce((t, i) => {t+=Number(i.type); return t;}, 0) || "-"%>'
        },
        {
          renderer: 'input',
          id: 'jieshouqiuhe',
          label: '接收分录求和',
          name: 'jieshouqiuhe'
        },
        {
          renderer: 'calendar',
          name: 'calender1',
          label: '日历'
        },
        {
          renderer: 'checkbox',
          label: '切换分录',
          name: 'qiehuanfenlu',
          options: [
            {
              text: '1',
              value: '1'
            },
            {
              text: '2',
              value: '2'
            }
          ]
        },
        {
          renderer: 'input',
          label: '测试',
          name: 'ceshi'
        },
        {
          renderer: 'select',
          label: '下拉',
          name: 'xiala',
          options: [
            {
              text: '11',
              value: '1'
            },
            {
              text: '2',
              value: '2'
            }
          ]
        },
        {
          renderer: 'viewer',
          width: 260,
          computedClass: '$.IWebsiteExpand? "viewer_collapse":"viewer_-collapse"',
          body: [
            {
              "renderer": "timeline",
              "name": "Combo",
              "type": "type",
              "body": [
                {
                  "renderer": "alert",
                  type: '${type}'
                },
                {
                  "renderer": "divider"
                }
              ]
            }
          ]
        },
        {
          renderer: 'divider',
          label: 'form分录测试01'
        },
        {
          renderer: 'input',
          label: '分录测试1',
          id: 'fenluceshi1',
          name: 'fenluceshi1'
        },
        {
          renderer: 'calendar',
          name: 'calender2',
          label: '日历2'
        },
        {
          renderer: 'divider',
          label: 'form分录测试2'
        },
        {
          renderer: 'input',
          label: '分录测试2',
          name: 'fenluceshi2',
          id: 'fenluceshi2'
        },
        {
          renderer: 'calendar',
          name: 'calender3',
          label: '日历3'
        },
        {
          renderer: 'divider',
          label: '分录1'
        },
        {
          "renderer": "combo",
          "name": "tabs",
          "id": "tabs",
          "label": "选项卡",
          "requiredOn": 1,
          "inline": false,
          "isTable": true,
          "controls": [
            {
              "renderer": "input",
              "label": "分录1第一列",
              "name": "radio"
            },
            {
              "renderer": "input",
              "label": "分录1第二列",
              "name": "input"
            },
            {
              "renderer": "input",
              "label": "AAA",
              "name": "aaa"
            }
          ]
        },
        {
          renderer: 'calendar',
          name: 'calender4',
          label: '日历41'
        },
        {
          renderer: 'viewer',
          body: {
            renderer: 'data'
          }
        }
      ]
    }
  ]
}

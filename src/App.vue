<template>
  <schema
    :init-schema="initSchema"
    :can-schema-update="false"
  />
</template>

<script>
import {defineComponent, reactive} from 'vue';
import {Schema} from 'i-renderer/dist/js/renderer';

export default defineComponent({
  name: 'App',
  components: {
    Schema
  },
  setup() {
    const initSchema = reactive({
      renderer: 'page',
      body: [
        {
          renderer: 'helloWorld'
        },
        {
          renderer: 'html',
          html: '<h1><%=data.title%></h1>',
          inline: true
        },
        {
          renderer: 'action',
          text: '跳转到外链',
          actionType: 'url',
          url: 'https://baidu.com/s?search=123',
          body: {},
          params: {
            blank: '1'
          }
        },
        {
          renderer: 'action',
          text: '弹个窗',
          type: 'success',
          icon: 'ChatLineSquare',
          actionType: 'dialog',
          body: {
            body: [
              {
                renderer: 'form',
                controls: [
                  {
                    renderer: 'input',
                    name: 'title',
                    label: '标题',
                    requiredOn: '1==1',
                    placeholder: '请输入',
                    type: 'text',
                    rules: [
                      {
                        type: 'string',
                        message: '不允许出现数字'
                      }
                    ]
                  }
                ],
                name: 'DemoForm',
                actionApi: {
                  url: '/api/submit',
                  method: 'post',
                  params: {
                    title: '${title}'
                  }
                }
              }
            ],
            footer: [
              {
                renderer: 'action',
                text: '提交',
                actionType: 'submit',
                remoteComponent: 'DemoForm',
                body: {}
              }
            ],
            fullscreen: false,
            center: false,
            closeOnClickModal: true,
            closeOnPressEscape: true
          }
        },
        {
          renderer: 'divider',
          text: 'blabla'
        },
        {
          renderer: 'switch',
          name: 'showForm',
          defaultValue: false,
          label: '',
          width: 40,
          target: 'PerformancePage',
          activeText: '启动',
          inactiveText: '停止'
        },
        {
          renderer: 'divider',
          text: 'blabla'
        },
        {
          renderer: 'tabs',
          panels: [
            {
              label: '直播方式',
              icon: '',
              body: [
                {
                  renderer: 'form',
                  controls: [
                    {
                      renderer: 'radio',
                      name: 'type',
                      type: 'button',
                      target: 'LiveVideoTable',
                      options: [
                        {
                          text: '普通直播',
                          value: '1'
                        },
                        {
                          text: '控流直播',
                          value: '2'
                        },
                        {
                          text: '视频直播',
                          value: '3',
                          disabledOn: ''
                        },
                        {
                          text: '网页开播',
                          value: '4',
                          disabledOn: ''
                        }
                      ],
                      defaultValue: '3'
                    }
                  ],
                  submitType: 'target',
                  actionApi: {},
                  target: 'LiveVideoTable'
                },
                {
                  renderer: 'table',
                  name: 'LiveVideoTable',
                  columns: [
                    {
                      fixed: false,
                      sortable: false,
                      type: 'index',
                      body: []
                    },
                    {
                      label: '封面',
                      name: 'poster',
                      body: [
                        {
                          renderer: 'image',
                          src: '${cover}',
                          previews: []
                        }
                      ]
                    },
                    {
                      label: '名称',
                      name: 'name',
                      body: []
                    },
                    {
                      label: '视频时长',
                      name: 'length',
                      body: []
                    },
                    {
                      label: '视频ID',
                      name: 'id',
                      body: []
                    },
                    {
                      label: '操作',
                      sortable: false,
                      fixed: false,
                      type: '-',
                      align: 'none',
                      body: [
                        {
                          renderer: 'action',
                          category: 'icon',
                          icon: 'Delete',
                          body: {},
                          popupType: 'confirm',
                          tipContent: '确认删除吗？',
                          actionType: 'ajax',
                          actionApi: {
                            url: '/api/delete',
                            method: 'delete',
                            params: {}
                          },
                          confirmTitle: '确定删除吗？'
                        }
                      ]
                    }
                  ],
                  actions: [],
                  initApi: {
                    url: 'https://www.fastmock.site/mock/a93e0b29161761b8153cbc02db04c643/api/videos',
                    method: 'get',
                    params: {
                      type: '${type}',
                      timestamp: '${timestamp}'
                    }
                  },
                  initData: {
                    type: 3
                  },
                  height: 180,
                  showHeader: false
                }
              ]
            },
            {
              label: '在线人数',
              icon: '',
              body: []
            }
          ],
          activeIndex: 1,
          stretch: true,
          tabPosition: 'top',
          activeTab: 1
        },
        {
          renderer: 'divider',
          text: 'blabla'
        },
        {
          renderer: 'service',
          syncLocation: false,
          sendOn: 'data.showForm',
          initApi: {
            url: 'https://www.fastmock.site/mock/a93e0b29161761b8153cbc02db04c643/api/user',
            method: 'get',
            params: {
              role_id: '${role_id}'
            },
            cached: false
          },
          initData: {},
          body: [
            {
              renderer: 'data'
            }
          ],
          silentLoading: false
        }
      ],
      initData: {
        title: '欢迎体验，纵享丝滑',
        showForm: false
      },
      mergeUrlQuery: true,
      name: 'PerformancePage'
    });
    return {
      initSchema
    };
  },
});
</script>

<style>
.i-schema__container {
  padding: 20px;
}
</style>

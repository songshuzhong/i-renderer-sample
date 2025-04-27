<template>
  <router-view :key="key" />
</template>

<script>
import {defineComponent, watch, ref, onMounted, getCurrentInstance} from 'vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'Application',
  setup() {
    const {proxy} = getCurrentInstance();
    const key = ref('/');
    const route = useRoute();

    watch(() => route.path, val => {
      key.value = val;
    });
    onMounted(() => {
      import(/* webpackChunkName:"editor",webpackPrefetch:false,webpackMode:"lazy" */ 'i-renderer/dist/js/editor').then(res => {
        const {Editor} = res;
        proxy.$.appContext.components[Editor.name] = Editor;
      }).catch(e => {
        console.error(e);
      });
    });
    return {
      key
    };
  }
});
</script>

<style>
html,
body,
#app {
  height: 100%;
}
.i-renderer-sample__footer {
  height: 60px;
  border-top: 1px dashed var(--el-border-color);
  line-height: 60px;
  text-align: center;
  color: var(--el-text-color-secondary);
}
.i-header__container__body .i-action {
  position: absolute;
  top: 20px;
  right: 20px;
}
.i-renderer-sample__editor.el-drawer {
  animation: unset;
  transition: unset;
}
.i-renderer-sample__editor .el-drawer__body {
  padding: 0;
  margin: 0;
  height: 100%;
}
.i-editor__container,
.i-layout__container {
  height: 100%;
}
.i-editor__container .monaco-editor {
  height: calc(100% - 50px);
}
.i-renderer-sample__editor .i-editor__container__tools {
  padding-right: 50px;
}
.i-renderer-sample__editor__close {
  position: absolute !important;
  top: 10px;
  right: 20px;
  font-weight: 900;
  z-index: 100;
}
</style>

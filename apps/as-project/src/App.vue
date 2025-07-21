<template>
  <i-schema
    :init-schema="frameSchema"
    :updatable="false"
    classname="i-renderer-website-schema__container"
  />
</template>

<script>
import {defineComponent, onMounted, getCurrentInstance} from 'vue';
import IndexSchema from './data/indexFrame';
import {loadEditor} from '@i-renderer-sample/lib';

export default defineComponent({
  name: 'Application',
  setup() {
    const {proxy} = getCurrentInstance();
    onMounted(() => {
      loadEditor().then(res => {
        const {Editor} = res;
        proxy.$.appContext.components[Editor.name] = Editor;
      }).catch(e => {
        console.error(e);
      });
    });
    return {
      frameSchema: {
        renderer: 'admin',
        ...IndexSchema
      }
    };
  }
});
</script>

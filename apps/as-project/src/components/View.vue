<template>
  <div>
    <div ref="viewEditor" :style="{height: '400px'}"/>
  </div>
</template>
<script>

import {defineComponent, onMounted, getCurrentInstance} from 'vue';
import * as monaco from 'monaco-editor';

export default defineComponent({
  name: 'View1',
  setup() {
    const proxy = getCurrentInstance();
    onMounted(() => {
      monaco.editor.create(proxy.refs.viewEditor, {
        value: 'console.log("Hello, world")',
        language: 'typescript'
      });
    });
  }
})
</script>
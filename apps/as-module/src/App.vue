<template>
  <el-card>
    <i-schema
      :init-schema="schema"
      :updatable="false"
    />
  </el-card>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      schema: {
        renderer: 'page',
        body: [
          {
            renderer: 'html'
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
                  text: 'close'
                }
              ]
            }
          }
        ]
      }
    }
  }
});
</script>
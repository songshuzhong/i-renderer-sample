<template>
  <div style="position: absolute; z-index: 3025">
    12
    <router-link :to="to">{{to}}</router-link>
    <el-button @click="onStart">start</el-button>
    <el-button @click="onStop">stop</el-button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {ElLoading} from 'element-plus';

export default defineComponent({
  name: 'Test',
  props: {
    to: String,
  },
  setup() {
    let routerMask = null;
    const onStart = () => {
      routerMask = ElLoading.service({ fullscreen: true });
    };
    const onStop = () => {
      routerMask && routerMask.close();
      routerMask = null;
    };
    return {
      onStop,
      onStart
    };
  }
});
</script>
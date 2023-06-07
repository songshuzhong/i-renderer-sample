<template>
  <router-view :key="key" />
</template>

<script>
import {defineComponent, watch, ref} from 'vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'Application',
  setup() {
    const key = ref('/');
    const route = useRoute();

    watch(() => route.path, val => {
      key.value = val;
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
  height: 50px;
  border-top: 1px dashed var(--el-border-color);
  line-height: 50px;
  text-align: center;
  color: var(--el-text-color-secondary);
}
.i-header__container__body .i-component__fragment {
  position: absolute;
  top: 20px;
  right: 20px;
}
.i-renderer-sample__editor .el-drawer__body {
  padding: 0;
  margin: 0;
}
</style>

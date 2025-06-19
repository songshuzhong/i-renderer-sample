<template>
  <ElCard class="panui-base-card">
    <template
      v-for="(_, key, index) in $slots"
      :key="index"
      #[key]="slotsProps"
    >
      <slot :name="key" v-bind="slotsProps" v-if="slotsProps"></slot>
      <slot :name="key" v-else></slot>
    </template>
  </ElCard>
</template>
<script>
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'MyCard',
  props: {},
  setup() {}
});
</script>
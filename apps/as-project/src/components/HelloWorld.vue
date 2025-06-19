<template>
  <div ref="div" :style="{ width: '100%', height: '100%' }">
    <router-link to="/code">code</router-link>
    <wc-card title="this is wc card">
      <h1 slot="footer">footer slot</h1>
      <el-form
        ref="formRef"
        style="max-width: 600px"
        :model="dynamicValidateForm"
        label-width="auto"
        class="demo-dynamic"
      >
        <el-form-item
          v-for="i in 10"
          :prop="`email.${i}`"
          :label="`email.${i}`"
          :rules="[{required: true}]"
        >
          <el-input v-model="dynamicValidateForm.values[i]" :key="i"/>
        </el-form-item>
      </el-form>
    </wc-card>
  </div>
</template>

<script>
import {getCurrentInstance, defineComponent, onMounted, ref} from 'vue';
import MyCard from './Card.vue';
export default defineComponent({
  name: 'HelloWorld',
  components: {
    MyCard
  },
  props: {
    msg: String,
    action: Function,
    initData: Object
  },
  setup() {
    const {proxy} = getCurrentInstance();
    const isMounted = ref(false);
    const div = ref(null);
    const dynamicValidateForm = ref({values: Array.from({length: 400}).fill(0).map((_, i) => i)});
    const show = ref(true);
    const list = ref([0, 1, 2]);
    const title = ref('123456');
    const onClick = () => {
      list.value.push(list.value.length);
    };
    const onInput = e => {
      const index = e.target.getAttribute('data-index');
      list.value[index] = e.detail.value;
    };
    const onDelete = () => {
      const index = Math.floor(Math.random() * list.value.length);
      list.value = list.value.filter((_, i) => i !== index);
    };
    const onChangeTitle = () => {
      title.value = '文字说明文字说明文字说明文字说明文字说明文字说明' + Date.now();
    };
    onMounted(() => {
      isMounted.value = true;
      const big = [];
      const timer = setTimeout(() => {
        clearTimeout(timer);
        title.value = '654321';
      }, 3000);
      for (let i = 0; i < 10; i++) {
        big.push(i);
      }
      list.value = big;
    });
    return {
      onChangeTitle,
      onClick,
      onInput,
      onDelete,
      dynamicValidateForm,
      show,
      div,
      title,
      isMounted,
      list,
      mainColor: 'red'
    };
  }
});
</script>

<template>
  <span class="weather">{{ state.weather }}</span>
</template>
<script>
import { defineComponent, getCurrentInstance, watch, reactive, onMounted } from "vue";
export default defineComponent({
  name: "Weather",
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      input: "",
      city: "",
      adcode: "",
      address: "",
      ipAddress: "",
      ipAdCode: "",
      weather: "",
      temperature: "",
      winddirection: "",
      windpower: "",
      humidity: "",
      reporttime: "",
      icon: true,
    });
    const getWeather = () => {
      proxy.$api
        .staticApi({withCredentials: true})
        .get('https://api.seniverse.com/v3/weather/now.json?key=Pf8teyTcIfqUGPeMN&location=beijing&language=zh-Hans&unit=c')
        .then((response) => {
          console.log(response);
        });
    };
    onMounted(() => {
      getWeather();
    });
    return {
      state,
    };
  },
});
</script>

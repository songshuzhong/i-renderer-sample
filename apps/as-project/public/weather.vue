<template>
  <el-card shadow="hover">
    <h1>天气</h1>
    <el-input v-model="state.input" placeholder="输入位置并按下回车以查询该地天气" @keyup.enter="keyUp"></el-input>
    <p class="ipAddress">
      <i class="el-icon-location-outline"></i>
      {{ state.ipAddress }}
      <el-link type="primary" @click="useIp">使用该地区</el-link>
    </p>
    <el-divider></el-divider>
      <div class="showBlock">
        <p class="address">{{ state.address }}</p>
        <p class="temperature">{{ state.temperature }}℃
          <span class="weather">{{ state.weather }}
            <span>
              <i class="mainWeather" :class="getIcon"></i>
            </span>
          </span>
        </p>
        <div class="other">
          <p class="wind"><i class="el-icon-wind-power"></i>
            风向:<span>{{ state.winddirection }}</span>&nbsp;&nbsp;&nbsp;<span>风力:{{ state.windpower }}级</span>
          </p>
          <p class="humidity"><i class="el-icon-odometer"></i> 湿度:{{ state.humidity }}</p>
          <p id="reporttime">消息发布时间:{{ state.reporttime }}</p>
        </div>
    </div>
  </el-card>
</template>
<script>
import { defineComponent, getCurrentInstance, watch, reactive, onMounted } from 'vue';
export default defineComponent({
  name: 'Weather',
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      input: '',
      city: '',
      adcode: '',
      address: '',
      ipAddress: '',
      ipAdCode: '',
      weather: '',
      temperature: '',
      winddirection: '',
      windpower: '',
      humidity: '',
      reporttime: '',
      icon: true
    });
    const title = useTitle()
    title.value = 'Hello' // change current title
    const getAdcode = () => {
      proxy.$api.staticApi().get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
        params: {
          key: '7156d80b5aca8f6459f716d4b3cf5023',        //需要操作
          city: state.adcode,
          extensions: 'base'
        }
      }).then(response => {
        let lives = response.data.lives[0];
        state.weather = lives.weather;
        state.temperature = lives.temperature;
        state.winddirection = lives.winddirection;
        state.windpower = lives.windpower;
        state.humidity = lives.humidity;
        state.reporttime = lives.reporttime;
        state.address = lives.city;
        localStorage.setItem('adcode', state.adcode);    //将存储目前查询的天气
      }).catch(e => {
        proxy.$notify.info({title: '未知错误', message: e.message});
      });
    };
    const useIp = () => {
      state.adcode = state.ipAdCode;
    };
    const keyUp = () => {
      state.city = state.input;
      state.input = '';
      getCityCode();
    };
    const getIcon = () => {
      state.icon = false;
      if (state.weather === '晴') {
        return 'el-icon-sunny';
      } else if (state.weather === '多云') {
        return 'el-icon-cloudy-and-sunny';
      } else if (state.weather === '阴') {
        return 'el-icon-partly-cloudy';
      } else if (state.weather.indexOf('雨')) {
        return 'el-icon-heavy-rain';
      } else if (state.weather.indexOf('雪')) {
        return 'el-icon-light-rain';
      }
      state.icon = true;
      return '';
    };
    const getIp = () => { //挂载时执行，获取ip地址
      proxy.$api.staticApi().get('https://restapi.amap.com/v3/ip?parameters', {
        params: {
          key: '7156d80b5aca8f6459f716d4b3cf5023'        //需要操作
        }
      }).then(
        response => {
          state.ipAddress = `${response.data.province}${response.data.city}`;
          state.ipAdCode = response.data.adcode;
          if (!(localStorage.getItem('adcode'))) {
            state.adcode = response.data.adcode;
          }
        }
      );
    };
    const getCityCode = () => {        //查询城市的adcode
      proxy.$api.staticApi().get('https://restapi.amap.com/v3/geocode/geo?parameters', {
        params: {
          key: '7156d80b5aca8f6459f716d4b3cf5023',        //需要操作
          address: state.city,
        }
      }).then(
        response => {
          if (response.data.status === '1') {
            console.log(response);
            state.adcode = response.data.geocodes[0].adcode;
          } else if (response.data.status === '0') {
            proxy.$notify.error({
              title: '查询错误',
              message: '请重新核对查询地址'
            });
          }
        }
      );
    };
    watch(() => state.adcode, () => {
      getAdcode();
    });
    onMounted(() => {
      if (localStorage.getItem('adcode')) {            //取出本地存储的地址，若不存在，则使用ip地址
        state.adcode = localStorage.getItem('adcode');
      }
      getIp();
    });
    return {
      useIp,
      keyUp,
      getIcon,
      state
    };
  }
});
</script>
<style>
.ipAddress {
    margin-top: 10px;
}

.el-card {
    background-color: rgba(255, 215, 55, 0.8);
    height: 409px;
    color: #000;
}

h1 {
    margin: 0px 0px 10px 10px;
}

.showBlock {
    margin-top: 10px;
}

.temperature {
    font-size: 50px;
}

.weather {
    margin-left: 20px;
    font-size: 35px;
}

.address {
    font-size: 20px;
}

.other {
    margin-top: 10px;
}

.other p {
    margin-top: 10px;
    font-size: 18px;
}

#reporttime {
    margin-top: 10px;
    font-size: 14px;
}

.mainWeather {
    float: right;
    margin-top: 10px;
    margin-right: 10%;
    font-size: 120px;
}

.showBlock {
    margin-left: 10px;
}
</style>
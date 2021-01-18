import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueAMap from 'vue-amap';
Vue.use(VueAMap);

Vue.use(ElementUI);
Vue.config.productionTip = false


VueAMap.initAMapApiLoader({
  // 高德的key
  key: '0b24d0f3e66fa14219204d0b3e98f595',
  // 插件集合
  plugin: ['AMap.Autocomplete','AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  // v: '1.4.4'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

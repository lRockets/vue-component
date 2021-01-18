<template>
  <!-- <el-dialog top="5vh" :append-to-body="true" title="获取地图坐标" :visible.sync="dialogVisible" :before-close="handleClose" width="1000px"> -->
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" />
      <div class="toolbar">
        当前坐标: {{ lng }}, {{ lat }}
        address: {{ address }}
        <el-button type="primary" @click="select">确定</el-button>

      </div>
      <el-amap
		mapStyle="fresh"
        vid="amapDemo2"
        :center="mapCenter"
        :zoom="zoom"
        class="amap-demo"
        :events="events"
        :plugin="plugin"
      >
        <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" />
      </el-amap>

    </div>
  <!-- </el-dialog> -->
</template>

<script>

export default {
  name: 'AmapPage',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    makerPosition: {
      type: Array,
      default: () => {
        return [121.59996, 31.197646]
      }
    }
  },
 
  data: function() {
    const self = this
    return {
      zoom: 12,
      center: [0, 0],
      address: '',
      markers: [
        {
          position: this.makerPosition
        }
      ],
      searchOption: {
        city: '上海',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646],
      plugin: [{
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 100,          //超过10秒后停止定位，默认：无穷大
              maximumAge: 0,           //定位结果缓存0毫秒，默认：0
              convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true,        //显示定位按钮，默认：true
              buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
              showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
              extensions:'all',
              pName: 'Geolocation',
              events: {
                init(o) {
                  // o 是高德地图定位插件实例
				  console.log(o,'o');
				  // return;
                  // o.getCurrentPosition((status, result) => {
                  //   console.log(result,'result')
                  //   // if (result && result.position) {
                  //   //   self.lng = result.position.lng;
                  //   //   self.lat = result.position.lat;
                  //   //   self.center = [self.lng, self.lat];
                  //   //   self.loaded = true;
                  //   //   self.$nextTick();
                  //   // }
                  // });
                }
              }
            },{
        pName: 'ToolBar',
        events: {
        }
      }],
      events: {
        click(e) {
          const { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.markers[0].position = [lng, lat]

          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      },
      lng: 0,
      lat: 0
    }
  },
  created() {
    this.mapCenter = this.makerPosition
    this.lng = this.makerPosition[0]
    this.lat = this.makerPosition[1]
	
	
  },
  methods: {
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi
          lngSum += lng
          latSum += lat
        })
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    },
    handleClose(done) {
      this.$emit('update:dialogVisible', false)
      this.$nextTick(() => {
        done()
      })
    },
    select() {
      // this.$emit('update:dialogVisible', false)
      // this.$emit('update:makerPosition', this.markers[0].position)
	  console.log(this.markers,'this.markers')
    }
  }

}
</script>

<style lang="scss" scoped>
    .amap-demo {
      height: 450px;
    }
    .search-box {
      z-index: 999;
      margin-bottom: 20px;
    }
    .amap-page-container {
      position: relative;
    }
</style>

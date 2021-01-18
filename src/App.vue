<template>
    <div>
        <router-view></router-view>
        <count-down :time="time" format="mm分ss秒"></count-down>
    </div>
</template>

<script>
import countDown from '@/components/countDown/count-down.vue'
    export default {
        components:{countDown},
        data(){
            return{
                time:1000*60*60*24
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
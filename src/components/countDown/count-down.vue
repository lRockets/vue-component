<template>
    <div>
        {{ formattedTime }}
    </div>
</template>

<script>
import { isSameSecond, parseTimeData, parseFormat } from "./utils";
export default {
    props: {
        time: Number,
        format:{
            type:String,
            default:'DD天HH时mm分'
        }
    },
    computed: {
        timeData() {
            return parseTimeData(this.remain);
        },
        formattedTime() {
            return parseFormat(this.format,this.timeData)
        },
    },
    data() {
        return {
            remain: 0, // 剩余数
        };
    },
    watch: {
        time: {
            handler: "reset",
            immediate: true,
        },
    },
    methods: {
        pause() {
            this.counting = false;
            clearInterval(this.timer);
        },
        reset() {
            this.pause();            
            this.start();
        },
        start() {
            if (this.counting) return;
            this.remain = +this.time;
            this.endTime = Date.now() + this.remain;
            this.counting = true;
            this.initTimer();
        },
        getRemain() {
            return Math.max(this.endTime - Date.now(), 0);
        },
        setRemain(remain) {
            this.remain = remain;
            this.$emit('change',this.timeData);
            if (remain === 0) {
                this.pause();
                this.$emit('finish');
            }
        },
        initTimer() {
            this.timer = setInterval(() => {
                let remain = this.getRemain();
                if (!isSameSecond(remain, this.remain) || remain === 0) {
                    this.setRemain(remain);
                }
            }, 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
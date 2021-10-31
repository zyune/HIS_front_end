<template>

    <P>我是数据:{{mes}}</P>


</template>

<script>
    import event from "../../../config/eventJS"
    export default {
        name: "button",
        data() {
            return{
                mes:"test数据可以通过方法改变"
            }
        },
        methods:{
            init(res){
                this.mes = res;
            }
        },
        mounted(){
            var me = this;
            event.$on("clicktest",(res) => {
                me.mes = res;
            })
        }
    }
</script>

<style scoped>

</style>
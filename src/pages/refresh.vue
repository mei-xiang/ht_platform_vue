<template>
    <div class="content" id="content">

    </div>
</template>
<script>
export default {
   data() {
      return {
      }
   },
   beforeRouteEnter (to, from, next) {
        next(vm => {            
            vm.$router.replace(from.fullPath)        
        })    
    },
   methods:{
   },
   activated() {
   }
}
</script>
<style lang='less' scoped>
</style>

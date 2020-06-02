<template>
    <div class="">
      <div class="pageTitle" v-if="pageType === 'list'">
          <span id="title">{{title}}</span>
          <span :class="[prefixCls + ' iconfont leftIcon']" @click=goback(backPagePath) v-if="isOpen"></span>
      </div>
      <div class="pageEditTitle" v-if="pageType === 'edit'">
          <span id="title">{{title}}</span>
          <span class="iconclose iconfont leftIcon" @click=goback(backPagePath) v-if="isOpenClose"></span>
      </div>
    </div>
</template>
<script>
export default {
    name: 'htHeader',
    props:{
      title:String,
      backPagePath:String,
      prefixCls:  {
        type: String,
        default: 'iconadd'
      },
      isOpen: {
        type: Boolean,
        default: true
      },
      isOpenClose: {
        type: Boolean,
        default: true
      },
      pageType: {
        type: String,
        default: 'list'
      },
      isPagePath: {
        type: Boolean,
        default: true
      },
      callBack: {
        type: Function,
        default () {
            return {};
        }
      }
   },
   data() {
      return {
        iconType: this.prefixCls
      }
   },
   methods:{
       goback(backPagePath){
           if(this.isPagePath){
              this.$router.push({path:backPagePath})
           } else {
             this.callBack();
           }
       }
   },
   activated() {
   }
}
</script>
<style lang='less' scoped>
  .leftIcon {
    float: right;
    cursor: pointer;
  }
</style>

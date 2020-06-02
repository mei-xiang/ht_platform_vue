<template>
  <section class="pager">
    <div class="pagerBox">
      <div class="firstpage" @click="jumpFirstPage">首页</div>
      <Page
        :show-total="isTotal"
        :show-elevator="isElevator"
        :show-sizer="isSizer"
        :total="count"
        :page-size="pageSize"
        :current.sync="pageNum"
        @on-page-size-change="handleSizeChange"
        @on-change="handleCurrentChange"
      />
      <input type="text" class="pageInput" v-model="inputVal" @keyup.enter="jump" />
      <div class="jump" @click="jump">GO</div>
      <div class="lastpage" @click="jumpLastPage">末页</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "myPage",
  props: {
    myCount: { // 总数页
        type: [Number, String],
        default: 1
    },
    myPageSize: {
        type: [Number, String],
        default: 10
    },
    pageCurNum: { // 当前页数
        type: [Number, String],
        default: 1
    },
    myIsSizer: { // 显示分页
      type: Boolean,
      default: false
    },
    myIsTotal: { // 显示总条数
      type: Boolean,
      default: false
    },
    myIsElevator: { // 显示总条数
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
      inputVal: 1, // input输入框的内容
      count: this.myCount,
      pageSize: this.myPageSize,
      pageNum: this.pageCurNum,
      isTotal: this.myIsTotal,
      isSizer: this.myIsSizer,
      isElevator: this.myIsElevator,
    }
  },
  methods: {
    /**
     * 分页大小发生改变
     *
     * @param {value} 当前的分页大小
     */
    handleSizeChange(val) {
      this.inputVal = val
      this.callBack(val)
    },
    /**
     * 分页码发生改变处理
     *
     * @param {value} 当前的分页码
     */
    handleCurrentChange(val) {
      this.inputVal = val
      this.callBack(val)
    },
    /**
     * 跳到首页
     */
    jumpFirstPage() {
      this.pageNum = 1
      this.inputVal = 1
      this.callBack(1)
    },
    /**
     * 跳到末页
     */
    jumpLastPage() {
      this.pageNum = Math.ceil(
        this.count / this.pageSize
      )
      this.inputVal = Math.ceil(this.count / this.pageSize)
      this.callBack(this.pageNum)
    },
    jump() {
      const page = Math.ceil(this.count / this.pageSize) //输入值大于最小值并且小于最大值
      if (this.inputVal <= page && this.inputVal >= 1) {
        this.pageNum = parseInt(this.inputVal)
        this.inputVal = parseInt(this.inputVal)
      } else if (this.inputVal > page) {
        //输入值大于最大值
        this.pageNum = page
        this.inputVal = page
      } else {
        //输入值小于最大值
        this.pageNum = 1
        this.inputVal = 1
      }
      this.callBack(this.pageNum)
    }
  }
}
</script>

<style>
.pager {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.pagerBox {
  position: relative;
}
/* 每一项的样式 */
.ivu-page {
  position: relative;
  padding: 0 180px 0 103px;
}
.ivu-page::before {
  position: absolute;
  content: '';
  top: 5px;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 45%;
  background-image: linear-gradient(to right, #2268f8, #1e64f7, #1f65f7);
}
.ivu-page .ivu-page-item {
  width: 42px;
  height: 51px;
  line-height: 51px;
  border: none;
  padding-top: 8px;
  padding-left: 5px;
}
.ivu-page .ivu-page-item a {
  color: #9f9f9f !important;
  font-weight: bold !important;
  font-family: DINAlternate-Bold, DINAlternate !important;
}
.ivu-page .ivu-page-item-active {
  background-image: url('~@/assets/image/page/page_bg.png');
  border: none;
}
.ivu-page .ivu-page-item-active a {
  color: #fff !important;
  background-color: #276cf9;
}

/* 上一页，下一页 */
.ivu-page .ivu-page-prev,
.ivu-page .ivu-page-next {
  background-color: transparent;
  border: none;
}
.ivu-page .ivu-page-prev {
  margin-right: 17px;
}
.ivu-page .ivu-page-next {
  position: absolute;
  top: 0;
  right: 66px;
  line-height: 51px;
}
.ivu-page .ivu-page-prev a,
.ivu-page .ivu-page-next a {
  width: 30px;
  /* height: 30px; */
  /* line-height: 30px; */
  transform: translateY(8px);
  display: inline-block;
  background: no-repeat center center;
}
.ivu-page .ivu-page-prev a {
  background-image: url('~@/assets/image/page/prev_arrow.png');
}
.ivu-page .ivu-page-next a {
  background-image: url('~@/assets/image/page/next_arrow.png');
}
.ivu-page .ivu-page-prev a i::before,
.ivu-page .ivu-page-next a i::before {
  content: '';
}
/* 首页与末页 */
.pagerBox .firstpage,
.pagerBox .lastpage {
  position: absolute;
  top: 8px;
  width: 42px;
  height: 51px;
  line-height: 51px;
  color: #494949;
  cursor: pointer;
  z-index: 9;
  text-align: center;
}
.pagerBox .firstpage {
  left: 25px;
}
.pagerBox .lastpage {
  right: 13px;
}
/* 跳转样式 */
.ivu-page-options {
  color: transparent;
  transform: translateX(-20px);
  padding-left: 10px;
}
.ivu-page-options .ivu-page-options-sizer {
  margin-right: 0;
}
.ivu-page-options-elevator {
  display: flex;
}
/* 头部线条 */
.ivu-page-options .ivu-page-options-elevator input {
  display: none;
  width: 106px;
  height: 26px;
  border-radius: 4px;
  border: 2px solid rgba(57, 122, 253, 1);
  margin: 0;
  padding: 2px 7px;
  background: url('~@/assets/image/page/input_bg.png') no-repeat center right;
  background-size: 40px 26px;
}
/* GO */
.pagerBox .jump {
  position: absolute;
  right: 125px;
  top: 21px;
  color: #fff;
  cursor: pointer;
  width: 40px;
  height: 26px;
  z-index: 111;
  text-align: center;
  font-weight: 500;
  line-height: 26px;
}
/* 制定页面跳转输入框 */
.pagerBox .pageInput {
  position: absolute;
  right: 125px;
  top: 21px;
  width: 106px;
  height: 26px;
  color: #9f9f9f;
  font-weight: bold;
  border-radius: 4px;
  border: 2px solid rgba(57, 122, 253, 1);
  margin: 0;
  padding: 2px 7px;
  background: url('~@/assets/image/page/input_bg.png') no-repeat center right;
  background-size: 40px 26px;
}
</style>

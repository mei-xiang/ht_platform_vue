<template>
  <div v-if="customtype == 'input'">
    <template>
      <Input type="text" v-model="valChange" v-if="!canonlyread" class="ivu-table-custom-input-fa"/>
      <span v-else>{{valChange}}</span>
    </template>
  </div>
  <div v-else-if="customtype == 'event'" class="">
    <template>
      <div v-bind:title="valEvent" class="ivu-table-custom-event-text" @click="openCusTomEvent">{{valEvent}}</div>
    </template>
  </div>
  <div v-else-if="customtype == 'singleChoice'">
    <template>
      <Select v-model="singleChoiceValue" :transfer="true" :disabled="singledisabled">
        <Option v-for="item in singlechoicelist" :value="item.value" :key="item.value" :disabled="item.disabled">{{ item.label }}</Option>
      </Select>
    </template>
  </div>
  <div v-else-if="customtype == 'multipleChoice'">
    <template>
      <Select v-model="multipleChoiceValue" :max-tag-count="multiplemaxtagcount" :transfer="true" multiple :disabled="multipledisabled" class="ivu-table-select-multiple">
        <Option v-for="item in multiplechoicelist" :value="item.value" :key="item.value" :disabled="item.disabled">{{ item.label }}</Option>
      </Select>
    </template>
  </div>
  <div v-else-if="customtype == 'btn'" style="float:right;height: 60px;">
    <template>
      <div class="ivu-table-custom-btn" v-bind:title="btnname">
        <div :class="btnClassNow" @click="openCusTomEvent"></div>
      </div>
    </template>
  </div>
  <div v-else-if="customtype == 'time'">
    <template>
      <div>
        <DatePicker :type="timeType" placeholder="请选择" :value="timeValue" :format="timeFormat" :transfer="true" class="ivu-table-custom-time" :style="widthNow" @on-change="(timeStr,timeDate)=>{onTimeChange(timeStr,timeDate)}"></DatePicker>
      </div>
    </template>
  </div>
  <div v-else-if="customtype == 'radio'">
    <template>
      <input type="radio" :name="customkey" :disabled="canonlyread" :checked="isChecked" @click="changeChecked"/>
    </template>
  </div>
</template>
<script>
    export default {
        name: 'TableCusTom',
        props: {
            customtype: String,//组件类型，input，select,date,boxselect,btn
            customindex:Number,//当前组件顺序
            customkey:String,//要回显的关键字

            //input框
            canonlyread: {//是否只读？默认为false
                type: Boolean,
                default () {
                    return false;
                }
            },
            objdata: {
                type: Object,
                default () {
                    return {};
                }
            },

            //select单选
            singlechoicelist: {//select单选数据
                type: Array,
                default() {
                    return [];
                },
            },
            singledisabled:{//是否禁用select,默认false
                type:Boolean,
                default(){
                    return false;
                },
            },

            //select多选
            multiplechoicelist: {//select多选数据
                type: Array,
                default() {
                    return [];
                },
            },
            multipledisabled:{//是否禁用select,默认false
                type:Boolean,
                default(){
                    return false;
                },
            },
            multiplemaxtagcount:{//多选最多可选几项，超出的折叠
                type:Number,
                default(){
                    return 1;
                },
            },

            //按钮
            btnclass:String,
            btnname:String,

            //时间
            timeCustomData:Array,
            timeType:{
                type:String,
                default(){
                    return 'date'
                }
            },
            timeFormat:String,
            isChecked:false,//table单选回显
        },
        data () {
            return {
                editName:"",
                valChange:this.objdata[this.customkey],
                valEvent:this.objdata[this.customkey],
                singleChoiceValue:"",//select单选值
                multipleChoiceValue:[],//select多选值
                btnClassNow:"icon iconfont ",//按钮组件icon
                widthNow:"",//time组件宽度
                timeValue:"",//time组件回显的值
            }
        },
        watch:{
            'valChange':function(){
                this.objdata[this.customkey] = this.valChange;
                this.$emit('customcallback',this.objdata,this.customindex);//主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
            },
            'singleChoiceValue':function(){
                this.$emit('customcallback',this.singleChoiceValue,this.singlechoicelist);
            },
            'multipleChoiceValue':function(){
                this.$emit('customcallback',this.multipleChoiceValue,this.multiplechoicelist);
            },
        },
        mounted(){
            switch (this.customtype) {
                case 'singleChoice'://下拉选单选
                    for(let i = 0; i < this.singlechoicelist.length; i++){
                        if(this.singlechoicelist[i].checked){
                            this.singleChoiceValue = this.singlechoicelist[i].value;
                        }
                    }
                    break;
                case 'multipleChoice'://下拉选多选
                    let list = [];
                    for(let i = 0; i < this.multiplechoicelist.length; i++){
                        if(this.multiplechoicelist[i].checked){
                            list.push(this.multiplechoicelist[i].value);
                        }
                    }
                    this.multipleChoiceValue = list;
                    break;
                case 'btn'://按钮
                    this.btnClassNow += this.btnclass;
                    break;
                case 'time'://时间
                    this.timeValue = this.objdata[this.customkey];
                    for(let i = 0; i < this.timeCustomData.length; i++){
                        if((this.timeCustomData[i].key == this.customkey || this.timeCustomData[i].slot == this.customkey) && this.timeCustomData[i].width){
                            this.widthNow = "width:" + (this.timeCustomData[i].width - 36) + "px";
                        }
                    }
                    break;
            }

        },
        methods: {
            openCusTomEvent(){
                this.$emit('customcallback',this.objdata,this.customindex);
            },
            onTimeChange(timeStr,timeDate){
                this.$emit('customcallback',timeStr,timeDate,this.objdata,this.customindex);
            },
            changeChecked(){

            }
        }
    }
</script>

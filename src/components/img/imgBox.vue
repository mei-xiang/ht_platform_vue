<template>
  <div class="">
    <div class="demo-upload-list" v-for="item in uploadList" >
        <template v-if="item.status === 'finished'">
            <viewer>
                <img :src="item.fileUrl" style="border-radius: 8px;" @click="handleView(item.fileUrl)">
            </viewer>
            <div class="ivu-img-bottom">
              {{imgNames}}
            </div>
            <div class="demo-upload-list-cover">
                <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon> -->
                <Icon type="md-close" @click.native="handleRemove(item.fileName,item.fileId)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" :stroke-width="4" :stroke-color="['#000000']" hide-info></Progress>
            <div class="ivu-img-bottom">
              {{imgNames}}
            </div>
        </template>
    </div>
    <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="5120"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          type="drag"
          action="//10.0.5.57:5555/platformdfs/api/file"
          class="ivu-img-upload"
          >
          <div class="ivu-img-con" v-if="oneImg">
              <Icon type="md-add" size="40"></Icon>
              <div class="ivu-img-bottom">
                {{imgNames}}
              </div>
          </div>
      </Upload>
  </div>
</template>

<script>
    import axios from 'axios'
    import Emitter from '../../mixins/emitter';
    import mixinsForm from '../../mixins/form';
    export default {
        name: 'ImgBox',
        mixins: [ Emitter, mixinsForm ],
        props: {
          imgName: {
              type: String,
          },
          imgData: {
              type: Array,
              default () {
                  return [];
              }
          },
          returnSuccess: {
            type: Function,
            default () {
                return {};
            }
          },
          maxImgLength: {
            type: Number
          },
          isOneImg: {
            type: Boolean,
            default: false
          }
        },
        data () {
            return {
                defaultList: [],
                imgUrl: '',
                visible: false,
                uploadList: this.imgData,
                imgNames: this.imgName,
                oneImg: true,
            }
        },
        methods: {
            handleView (url) {
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove (file,id) {
                this.oneImg = true
                const fileList = this.$refs.upload.fileList;
                const self = this;
                // console.log(id);
                axios.get('http://10.0.5.57:5555/platformdfs/api/file/id/' + id)
                .then(function (response) {
                  self.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                  self.returnSuccess(response,file,fileList);
                })
                .catch(function (error) {
                    this.$Notice.warning({
                        title: '图片删除失败请稍后再试！',
                    });
                });
                // 删除图片
            },
            handleSuccess (res, file, fileList) {
                if(this.isOneImg){
                  this.oneImg = false
                } else {
                  this.oneImg = true
                }
                file.fileUrl = 'http://' + res.data.data.fileUrl;
                file.fileName = res.data.data.fileName;
                file.fileId = this.GlobalDataUtils.imgIdFn(file);
                this.returnSuccess(res, file, fileList);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '图片格式错误！',
                    desc: file.name + '请选择jpg,png,jpeg,jpe等格式图片上传!'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '图片大小限制',
                    desc: '文件 ' + file.name + '太大,不能超过 5M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能选择5张图片！'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 118px;
        height: 118px;
        text-align: center;
        line-height: 120px;
        border: 1px solid transparent;
        border-radius: 8px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .ivu-img-upload {
      display: inline-block;width:120px;
    }
    .ivu-img-con {
      width: 120px;
      height:120px;
      line-height: 120px;
      color:#2C2C2C;
      border: 1px dashed #dcdee2;
      border-radius: 6px;
    }
    .demo-upload-list img{
        width: 119px;
        height: 119px;
    }
    .demo-upload-list-cover{
        position: absolute;
        top: 0;
        right: 0;
        width: 22px;
        height: 22px;
        border-radius: 8px;
        background: rgba(0,0,0,.5);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        margin: 0 2px;
        position: absolute;
        left: 0px;
        top: 2px;
    }
    .ivu-img-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 120px;
      height: 26px;
      background: rgba(0,0,0,.5);
      color: #fff;
      line-height: 26px;
    }
    .ivu-progress-outer {
      position: absolute;
      bottom: -26px;
      left: 0;
      width: 120px;
      height: 4px;
      /* background: rgba(0,0,0,.5); */
    }
    .ivu-progress-inner {
      vertical-align: middle;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .ivu-upload-drag {
      border: none;
    }
</style>

// 姓名
var name = /^[\u4e00-\u9fa5]{2,4}$/;
// 电话8位座机类的
var tel = /^0?1[3|4|5|8][0-9]\d{8}$/;
// 手机号码
var phone = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
// 身份证号码
var idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 邮件
var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// int校验
var int = /^\+?[1-9][0-9]*$/;
// double校验
var double = /^[-\+]?\d+(\.\d+)?$/;
// float校验
var float = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
// num校验
var num = /^[0-9]*$/;
// 中文效验
var china = /^[\u4e00-\u9fa5],{0,}$/;
// url效验
var url = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
// 英文效验
var english = /^[A-Za-z]+$/;
// 特殊字符串
var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

var FormValidate = (function () {
  // eslint-disable-next-line
  function FormValidate() {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 搜索过滤特殊字符
      Search : function(rule, value, callback) {
        if (!regEn.test(value) || !regCn.test(value)) {
          callback(new Error('搜索不允许输入特殊中英文字符串!'))
        } else {
          callback()
        }
      },
      // 下拉单选多选非空
      SelectNull : function(rule, value, callback) {
        let text = '';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('请选择至少一个' +text+ '!'))
      },
      // 输入非空
      Null: function(rule, value, callback) {
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
      },
      // 姓名的验证规则
      Name: function (rule, value, callback) {
        let text = '姓名';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!userName.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 身份证的验证规则
      IdCard: function (rule, value, callback) {
        let text = '身份证号码';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!idCard.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 电话号码的验证
      Tel: (rule, value, callback) => {
        let text = '电话号码';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!tel.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 手机号码的验证
      Phone: (rule, value, callback) => {
        let text = '手机号码';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!tel.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // int正整数的验证
      Int: (rule, value, callback) => {
        let text = '正整数';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!tel.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 邮箱的验证
      Email: (rule, value, callback) => {
        let text = '邮箱地址';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!email.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 双精度浮点的验证
      Double: (rule, value, callback) => {
        let text = '双精度浮点数';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!double.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 浮点的验证
      Float: (rule, value, callback) => {
        let text = '浮点数';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!double.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // num的验证
      Num: (rule, value, callback) => {
        let text = '数字';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!num.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 中文效验
      China: (rule, value, callback) => {
        let text = '中文汉字';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!num.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // 中文效验
      Url: (rule, value, callback) => {
        let text = 'url';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!url.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
      // english效验
      English: (rule, value, callback) => {
        let text = '英文字母';
        if(rule.text)
          text = rule.text
        if (!value)
          return callback(new Error('该字段为必填字段不能为空！'))
        if (!english.test(value)) {
          callback(new Error('请输入正确的'+text+'!'))
        } else {
          callback()
        }
      },
    }
  }
  return FormValidate
}())
exports.FormValidate = FormValidate

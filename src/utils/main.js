/**
 * 全局数据工具类
 *
 * @export
 * @class GlobalDataUtils
 */
export default class GlobalDataUtils {
  /**
   * 处理图片上传后获取的id
   * @static
   * @param {array} 图片上传返回的总数据
   * @returns imgIdArray
   * @memberof GlobalDataUtils
   */
  static imgIdArrayFn(item) {
    let imgIdArray = [];
    for (var i = 0; i < item.length; i++) {
      let str = item[i].response.config.url;
      let index = str.lastIndexOf("\/");
      str = str.substring(index + 1, str.length);
      imgIdArray.push(str);
    }
    return imgIdArray;
  }
  static imgIdFn(item) {
    let str = item.response.config.url;
    let index = str.lastIndexOf("\/");
    str = str.substring(index + 1, str.length);
    return str;
  }
  /**
   * 处理图片上传后获取的图片数据的合集
   * @static
   * @param {array} 图片上传返回的总数据
   * @returns imgArray
   * @memberof GlobalDataUtils
   */
  static imgArrayFn(item) {
    let imgArray = [];
    for (var i = 0; i < item.length; i++) {
      imgArray.push(item[i].response.data.data);
    }
    return imgArray;
  }
  /**
   * 处理把图片id和图片数据拼再一起的方法
   * @static
   * @param {imgIdArray,imgArray,key} 图片id合集、图片返回数据合集、key是你想把这个id拼成你想要的值
   * @returns imgDatas
   * @memberof GlobalDataUtils
   */
  static imgDataFn(idData,imgData,key) {
    for (var i = 0; i < imgData.length; i++) {
      imgData[i][key] = idData[i]
    }
    return imgData;
  }
  /**
   * [通过参数名获取url中的参数值]
   * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
   * @param  {[string]} queryName [参数名]
   * @return {[string]}           [参数值]
   */
   static getQueryValue(queryName) {
      var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if ( r != null ){
         return decodeURI(r[2]);
      }else{
         return null;
      }
   }
   /**
    * [通过参数名获取url中的参数值]
    * 示例
    * @param  {[Array]} item [参数名]
    * @return {[Array]}       [参数值]
    */
    static getDepartmentAndCompany(item) {
      let companies = {
        department: [],
        company: [],
        headquarters: [],
      };
      console.log(item);
      for(var i = 0; i < item.length; i++) {
        if(item[i].type == 2){
          companies.department.push({
            value: item[i].id,
            label: item[i].companyName,
            parentId: item[i].parentId
          })
        }
        if(item[i].type == 3){
          companies.company.push({
            value: item[i].id,
            label: item[i].companyName,
            parentId: item[i].parentId
          })
        }
        if(item[i].type == 1){
          companies.headquarters.push({
            value: item[i].id,
            label: item[i].companyName
          })
        }
      }
      return companies;
    }
    /**
     * [通过参数名获取url中的参数值]
     * 示例
     * @param  {[Array]} item [参数名]
     * @return {[Array]}       [参数值]
     */
    static getHasCompany(item) {
      if(item.company != "") {
        item.hasCompanyIdList = item.company;
      }
      if(item.department != "" && item.company == ""){
        item.hasCompanyIdList = this.getChildrenCompany(item);
      }
      return item;
    }
    /**
     * [通过参数名获取url中的参数值]
     * 示例
     * @param  {[Array]} item [参数名]
     * @return {[Array]}       [参数值]
     */
    static getChildrenCompany(item) {
      let companies = this.$Storage.getSession('companies');
      let returnItem = [];
      for(var i = 0; i < companies.length; i++) {
        if(item.parentId == companies[i].parentId){
          returnItem.push(companies[i].id);
        }
      }
      returnItem = returnItem.toString();
      return returnItem;
    }
}

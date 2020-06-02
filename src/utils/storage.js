/**
 * 封装sessionStorage
 */

export default{
    setSession: function(key, value) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    getSession: function(key) {
      let value = window.sessionStorage.getItem(key);
      return JSON.parse(value);
    },

    clearOneSession: function(key) {
      window.sessionStorage.removeItem(key);
    },

    clearAllSession: function() {
      window.sessionStorage.clear();
    }
}

<template>
	<a class="button" href="javascript:void(0);" v-if="!isOpen"
  		@click="handleClick" :class="[{'is-loading': hasLoading},{'is-disabled': disabled}]">
  		<slot></slot>
	</a>
	<a class="button" :href="'#/'+path"  v-else
  		@click="handleClick" :class="[{'is-loading': hasLoading},{'is-disabled': disabled}]">
  		<slot></slot>
	</a>
</template>
<script>
  export default {
    name: "uButton",
    props: {
      isRippled: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      path: String,
      hasLoading: {
        type: Boolean,
        default: false
      },
      isOpen:{
      	type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick(event) {
      	if(!this.disabled){
	        this.$emit("click", event);
	        if(this.isOpen){
	        	event.target.setAttribute("target","_blank");
	        }
	        this.$router.push({path: this.path})
	    }
      	
      }
    }
  };
</script>
<style lang="scss">
	.button{
		&.is-disabled{
			opacity: 0.5;
			cursor: no-drop;
		}
		&.is-loading{
			color: #007bff;
		}
		&.is-loading:hover{
			color:#248dff;
		}
        &.is-loading:after{
        	animation: spinAround .5s infinite linear;
		    border: 2px solid #dbdbdb;
		    border-radius: 290486px;
		    content: "";
		    display: block;
		    height: 16px;
		    width: 16px;
		    position: absolute;
		    left: 50%;
		    margin-left: -8px;
		    margin-top: -8px;
		    top: 50%;
    		border-color: transparent transparent #fff #fff;
        }
	}
	@keyframes spinAround {
		from{
			 transform: rotate(0deg);
		}
		to{
			transform: rotate(359deg);
		}
	}
  
</style>
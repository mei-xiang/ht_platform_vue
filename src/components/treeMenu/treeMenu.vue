<template>
	<ul class="tree-menu">
		<!-- <li v-for="(item, key) in menuArr" class="first-menu-wrap"  ref="firstMenuWrap">
		   <router-link :to="item.url ?item.url: ''"
			@click.native="showSecondMenulist(key)"
			:target="item.isOpen?'_blank':'_self'"
				tag="a"  
				:class="{hasChildren: item.list}" ref="firstMenu"
				:style="{'color':item.url?'':'#222'}">
			<i class="iconfont"></i>
			<span class="menu-text"> {{item.name}}</span>
			<animatedIconUpDownArrow class="animated-icon-arrow" v-if="item.list" :isDown="!isCollasped"></animatedIconUpDownArrow>
		   </router-link>
			<ul class="second-menu-wrap">
				<li v-for="(item, key) in item.list" class="second-menu" v-if='item.show'>
					<router-link :to="item.url" :target="item.isOpen?'_blank':'_self'">{{ item.name }}</router-link>
				</li>
			</ul>
		</li> -->
		<li class="clearfix menuItem" @hover="hover()">
			<i class="iconfont itemIcon"></i>
			<span class="itemName">官方首页</span>
			<i class="iconfont arrow"></i>
		</li>
		<!-- <li class="clearfix menuItem">
			<i class="iconfont"></i>
			<span>运单管理</span>
			<i class="iconfont arrow"></i>
		</li>
		<li class="clearfix menuItem">
			<i class="iconfont"></i>
			<span>运输管理</span>
			<i class="iconfont arrow"></i>
		</li>
		<li class="clearfix menuItem">
			<i class="iconfont"></i>
			<span>检测管理</span>
			<i class="iconfont arrow"></i>
		</li>
		<li class="clearfix menuItem">
			<i class="iconfont"></i>
			<span>仓库管理</span>
			<i class="iconfont arrow"></i>
		</li> -->

	
	</ul>
</template>
<script>
	export default {
		components: {}, 
		name: 'treeMenu',
		props: {
			menuArr: {
				type: Array,
			},
			isCollasped: {
				type: Boolean,
				default: false
			},
		},
        methods: {
        	showSecondMenulist(key) {
        		if (this.menuArr[key].list) {
                    var firstMenuWrap = this.$refs.firstMenuWrap[key];
        			firstMenuWrap.classList.toggle('on');
        			var iconArrow = this.$refs.firstMenu[key].$children[0];
        		    iconArrow.animate();
        		}
			},
			hover(){

			}
			
        }
    }
</script>
<style lang="less" scoped>
	.tree-menu{
		background: #ffffff;
		.menuItem{
			background-color: RED;
			width:268px;
			height:60px;
			position: absolute;
			// padding: 10px 12px 27px 42px;
			height: 60px;
			box-sizing: border-box;
			
			&.active{
				color:#0853F3;
				border-left: 6px solid #0853F3;
				
			}
			.itemName{
				float: left;
				line-height: 60px;
			}
			.itemIcon{
				float: left;
				display: inline-block;
				width: 42px;
				height: 38px;
				background-color: yellow;
			}
			.arrow{
				float: right;
				width: 24px;
				height: 24px;
				background-color: yellow;
			}
		}
	}
</style>


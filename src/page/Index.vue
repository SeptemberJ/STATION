<template>
  <div class="Index">
     <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="车辆列表" theme="dark" width="auto" @on-select="OnSelectMenu">
                    <div class="layout-logo-left">{{UserName}}</div>
                    <MenuItem name="车辆列表">
                        <Icon type="android-bus" :size="iconSize"></Icon>
                        <span class="layout-text">车辆列表</span>
                    </MenuItem>
                    <MenuItem name="我的预约">
                        <Icon type="ios-list" :size="iconSize"></Icon>
                        <span class="layout-text">我的预约</span>
                    </MenuItem>
                    <MenuItem name="退出登录">
                        <Icon type="power" :size="iconSize"></Icon>
                        <span class="layout-text">退出登录</span>
                    </MenuItem>
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                      
                          <CarList v-if="Cur==1"></CarList>
                          <MyOrder v-if="Cur==2"></MyOrder>
                      
                    </div>
                </div>
                <div class="layout-copy">
                    柏田科技提供技术支持
                </div>
            </Col>
        </Row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import Spin from '../components/Spin'
import CarList from '../components/CarList'
import MyOrder from '../components/MyOrder'
import {timestampToFormatTime} from '../util/utils'

  export default{
    data: function () {
      return {
        Cur:1,
        spanLeft: 5,
        spanRight: 19
      }
    },
    mounted: function () {
      
    },
    created() {
      
    },
    computed: {
      iconSize () {
          return this.spanLeft === 5 ? 14 : 24;
      },
      UserName(){
        return this.$store.state.userInfo.Name
      }
      
    },
    watch: {
      
    },
    components: {
      CarList,
      MyOrder
      

    },
    methods: {
      //切换左侧栏
      toggleClick () {
          if (this.spanLeft === 5) {
              this.spanLeft = 2;
              this.spanRight = 22;
          } else {
              this.spanLeft = 5;
              this.spanRight = 19;
          }
      },
      //切换Menu
      OnSelectMenu(event){
        switch(event){
          case '车辆列表':
          this.Cur = 1
          document.title = '车辆列表'
          break
          case '我的预约':
          this.Cur = 2
          document.title = '我的预约'
          break
          case '退出登录':
          this.$router.push({name:'登录'})
          localStorage.clear()
          break
        }
      },
     
      
    }
  }
</script>
<style lang="scss">
.Index{
  height: 100%;
  .layout{
        height: 100%;
        border: 1px solid #d7dde4;
        background: #fff;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px 0px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
      height: 30px;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        
        color: #fff;
        text-align: center;
        line-height: 30px;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }

}
.ivu-row-flex{
    height:100%;
    overflow: hidden;
}
</style>
<template>
  <div class="MyOrder">
    <Table :height="Height" border :columns="columns" :data="dataOrder" show-header :show-header="true" :border="false"></Table>
    <Spin v-if="ifSpin"></Spin>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import Spin from '../components/Spin'
import {timestampToFormatTime} from '../util/utils'
  export default{
    data: function () {
      return {
        ifSpin:true,
        columns: [
            // {
            //     type: 'index',
            //     align: 'left',
            // },
            {
                title: '车辆类型',
                key: 'fclzl',
            },
            {
                title: '预约日期',
                key: 'Order_date'
            },
            {
                title: '数量',
                key: 'ydzs',
                width: 60
            },
        ],
        dataOrder: []
      }
    },
    mounted: function () {
      
    },
    created() {
      let Height = document.documentElement.clientHeight - 60 - 30 //-50
      this.$store.state.ScreenHeight = Height
      axios.get(R_PRE_URL+'/getYuDingInfo?yuding_people='+this.$store.state.userInfo.Name
      ).then((res)=> {
        let temp = res.data.yudingList
        temp.map((Item,Idx)=>{
          Item.Order_date = timestampToFormatTime(Item.Date)
//           Item.Operation_date = timestampToFormatTime(Item.yuding_time
// .time)
        })
        this.dataOrder = temp
        this.ifSpin = false
      }).catch((error)=> {
        console.log(error)
      })
    },
    computed: {
      Height(){
        return this.$store.state.ScreenHeight
      }
    },
    watch: {
      
    },
    components: {
      Spin
    },
    methods: {
      chooseRow(event){
        this.$router.push({name:'详情',params: {id:event.id}})
      }
    }
  }
</script>
<style lang="scss">
.MyOrder{
}
</style>

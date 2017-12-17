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
                title: '起始时间',
                key: 'begin_date',
            },
            {
                title: '返程时间',
                key: 'end_date',
            },
            {
                title: '预约日期',
                key: 'Order_date'
            },
            {
                title: '行程',
                key: 'remark'
            },
            {
                title: '数量',
                key: 'cls',
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
          //Item.Order_date = Moment.utc(Item.yuding_time.time)
          Item.Order_date = timestampToFormatTime(Item.yuding_time.time)
          Item.begin_date = timestampToFormatTime(Item.begin_date.time)
          Item.end_date = timestampToFormatTime(Item.end_date.time)
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

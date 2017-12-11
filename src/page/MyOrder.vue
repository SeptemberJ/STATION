<template>
  <div class="MyOrder">
    
    <Spin v-if="ifLoading"></Spin>
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
        ifLoading:true,
        columns1: [
              {
                  type: 'index',
                  width: 60,
                  align: 'center'
              },
              {
                  title: 'title',
                  key: 'fname',
              },
              {
                  title: 'date',
                  key: 'psdate',
                  align:'right'
              }
          ],
        dataVideo: []
      }
    },
    mounted: function () {
      
    },
    created: function () {
      // axios.get(R_PRE_URL+'/selectvideotitle.do'
      // ).then((res)=> {
      //   let temp = res.data
      //   temp.map((Item,Idx)=>{
      //     Item.psdate = timestampToFormatTime(Item.psdate)
      //   })
      //   this.dataVideo = temp
      //   this.ifLoading = false
      // }).catch((error)=> {
      //   console.log(error)
      // })

      
      
    },
    computed: {
      
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

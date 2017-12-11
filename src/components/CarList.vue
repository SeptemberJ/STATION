<template>
  <div class="CarList">
    <Table :height="Height" border :columns="columns" :data="dataCars" show-header :show-header="true" :border="false"></Table>
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
            //     align: 'center',
            //     width:30
            // },

            {
                title: '车牌号',
                key: 'fchehao',
            },
            {
                title: '预约日期',
                key: 'Order_date'
            },
            {
                title: '预约',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.Order(params)
                                }
                            }
                        }, '预定')
                    ]);
                }
            }
        ],
        dataCars: []
      }
    },
    mounted: function () {
      
    },
    created() {
      let Height = document.documentElement.clientHeight - 60 - 30 //-50
      this.$store.state.ScreenHeight = Height
      axios.get(R_PRE_URL+'/getYuding'
      ).then((res)=> {
        let temp = res.data.arr
        temp.map((Item,Idx)=>{
          Item.Order_date = timestampToFormatTime(Item.fyddate.time)
        })
        this.dataCars = temp
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
      },
      Order (ROW) {
        let Info = ROW.row
        let _this = this
        console.log(Info)
          this.$Modal.confirm({
              title: '预约信息',
              content: `您确定预约：<br>车牌号：${Info.fchehao}<br>预约日期：${Info.Order_date}`,
              okText:'提交',
              onOk: () => {
                _this.ifSpin = true
                let DATA = {
                  fid_z:Info.fid_z,
                  fid_c:Info.fid_c,
                  yuding_people:_this.$store.state.userInfo.Name
                }
                axios.post(R_PRE_URL+'/updateYuing',DATA
                ).then((res)=> {
                  switch(res.data.code){
                      case ('2'):
                      _this.$Message.success('预定成功!')
                      break
                      default:
                      _this.$Message.error('预定失败!')
                  }
                  _this.ifSpin = false
                   
                }).catch((error)=> {
                  console.log(error)
                })
                
              },
          })
      },
    }
  }
</script>
<style lang="scss">
.CarList{
}
</style>

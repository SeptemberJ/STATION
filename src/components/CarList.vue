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
import * as Moment from 'moment'
  export default{
    data: function () {
      return {
        ifSpin:true,
        begin_date:'',
        begin_dateS:'',
        end_dateS:'',
        end_date:'',
        cls:1,
        columns: [
            // {
            //     type: 'index',
            //     align: 'center',
            //     width:30
            // },

            {
                title: '车辆类型',
                key: 'fclzl',
            },
            {
                title: '座位数',
                key: 'fzws',
            },
            {
                title: '剩余数量',
                key: 'clsl',
            },
            {
                title: '预约',
                key: 'action',
                align: 'center',
                width:70,
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
      this.getCarList()
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
              okText:'提交',
              maskClosable:false,
              onOk: () => {
                if(!_this.begin_date || !_this.end_date){
                  _this.$Message.error('预约时间为必填项!')
                  return false
                }
                _this.ifSpin = true

                let DATA = {
                  begin_date:Moment(_this.begin_date).utc().add(0,'hours'),
                  end_date: Moment(_this.end_date).utc().add(0,'hours'),
                  cls:_this.cls,
                  fclzl:Info.fclzl,
                  yuding_people:_this.$store.state.userInfo.Name
                }
                axios.post(R_PRE_URL+'/updateYuing.do',DATA
                ).then((res)=> {
                  switch(res.data.code){
                      case ('2'):
                      _this.$Message.success('预定成功!')
                      _this.getCarList()
                      break
                      default:
                      _this.$Message.error('预定失败!')
                  }
                  _this.ifSpin = false
                   
                }).catch((error)=> {
                  console.log(error)
                })
              },

              render: (h) => {
                  return h('div', [
                                h('p', {
                                   props: {
                                    },

                                },'请选择开始时间'),
                                h('DatePicker', {
                                    props: {
                                        type:'datetime',
                                        value: _this.begin_date,
                                        placeholder: '开始时间',
                                        class:'marginT_10'

                                    },
                                    on: {
                                        input: (Val1) => {
                                            _this.begin_date = Val1
                                            _this.begin_dateS = Val1.getTime()
                                        }
                                    },
                                }),
                                h('p', {
                                   props: {
                                    },

                                },'请选择结束时间'),
                                h('DatePicker', {
                                    props: {
                                        type:'datetime',
                                        value: _this.end_date,
                                        placeholder: '请选择',
                                        class:'marginT_10'
                                    },
                                    on: {
                                        input: (Val2) => {
                                            _this.end_date = Val2
                                            _this.end_dateS = Val2.getTime()
                                        }
                                    }
                                }),
                                h('p', {
                                   props: {
                                    },

                                },'预约数量'),
                                h('InputNumber', {
                                  props: {
                                      min:1,
                                      max:Info.clsl
                                  },
                                  on: {
                                      input: (val) => {
                                          this.value = val;
                                          _this.cls = val
                                      }

                                  }
                              })
                            ]);
              }
          })
      },
      // Order2 (ROW) {
      //   let Info = ROW.row
      //   let _this = this
      //   console.log(Info)
      //     this.$Modal.confirm({
      //         title: '预约信息',
      //         content: `您确定预约：<br>车牌号：${Info.fchehao}<br>预约日期：${Info.Order_date}`,
      //         okText:'提交',
      //         onOk: () => {
      //           _this.ifSpin = true
      //           let DATA = {
      //             fid_z:Info.fid_z,
      //             fid_c:Info.fid_c,
      //             yuding_people:_this.$store.state.userInfo.Name
      //           }
      //           axios.post(R_PRE_URL+'/updateYuing',DATA
      //           ).then((res)=> {
      //             switch(res.data.code){
      //                 case ('2'):
      //                 _this.$Message.success('预定成功!')
      //                 _this.getCarList()
      //                 break
      //                 default:
      //                 _this.$Message.error('预定失败!')
      //             }
      //             _this.ifSpin = false
                   
      //           }).catch((error)=> {
      //             console.log(error)
      //           })
                
      //         },
      //     })
      // },
      //获取车辆列表
      getCarList(){
        this.ifSpin = true
        axios.get(R_PRE_URL+'/getYuding'
        ).then((res)=> {
          let temp = res.data.arr
          // temp.map((Item,Idx)=>{
          //   Item.Order_date = timestampToFormatTime(Item.fyddate.time)
          // })
          this.dataCars = temp
          this.ifSpin = false
        }).catch((error)=> {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="scss">
.CarList{


}
p{
    line-height: 30px;
  }
  
</style>

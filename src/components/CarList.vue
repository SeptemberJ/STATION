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
      var S = this
      return {
        isMobile:false,
        ifSpin:true,
        begin_date:'',
        begin_dateS:'',
        end_dateS:'',
        end_date:'',
        cls:1,
        remark:'',
        columns: [
            // {
            //     type: 'index',
            //     align: 'center',
            //     width:30
            // },

            {
                title: '车辆类型',
                key: 'fclzl',
                //width:this.$store.state.isMobile?100:'',
            },
            {
                title: '座位数',
                key: 'fzws',
                width:this.$store.state.isMobile?40:'',
            },
            {
                title: '剩余数量',
                key: 'clsl',
                width:this.$store.state.isMobile?40:'',
            },
            {
                title: '预约',
                key: 'action',
                width:this.$store.state.isMobile?40:'',
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
        dataCars: [],
        optionsS: {
            disabledDate (date) {
                return date && date.valueOf() <= Date.now();
            }
        },
        optionsE: {
          disabledDate (date) {
            return date && date.valueOf() <= Date.now();
                // if(S.begin_date == ''){
                //   return date && date.valueOf() <= Date.now();
                // }else{
                //   return date && date.valueOf() <= Moment(S.limitDate).valueOf();
                // }
            }
            
        },
        
      }
    },
    mounted: function () {
      
    },
    created() {
      let Height = document.documentElement.clientHeight - 60 - 30 //-50
      this.$store.state.ScreenHeight = Height
      this.getCarList()
      this.isMobile = this.$store.state.isMobile
    },
    computed: {
      Height(){
        return this.$store.state.ScreenHeight
      },
      limitDate(){
        return this.$store.state.limitDate
      },
      
    },
    watch: {
      limitDate(){
        return this.$store.state.limitDate
      }
      
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
        _this.begin_date = ''
        _this.end_date = ''
        _this.remark = ''
          this.$Modal.confirm({
              title: '预约信息',
              okText:'提交',
              maskClosable:false,
              onOk: () => {
                console.log('pppp=')
                console.log(_this.begin_date)
                console.log(_this.end_date)
                if(!_this.begin_date || !_this.end_date){
                  _this.$Message.error('预约时间为必填项!')
                  return false
                }
                if(!Moment(_this.begin_date).isBefore(_this.end_date)){
                  _this.$Message.error('结束时间不能小于开始时间!')
                  return false
                }
                _this.ifSpin = true

                let DATA = {
                  begin_date:Moment(_this.begin_date).utc().add(0,'hours'),
                  end_date: Moment(_this.end_date).utc().add(0,'hours'),
                  cls:_this.cls,
                  fclzl:Info.fclzl,
                  yuding_people:_this.$store.state.userInfo.Name,
                  remark:_this.remark
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
                                        placeholder: '开始时间',
                                        value:_this.begin_date,
                                        class:'marginT_10',
                                        editable:false,
                                        options:_this.optionsS

                                    },
                                    on: {
                                        // 'on-change': (Val) => {
                                        //   _this.begin_date = Val
                                        //     // if(_this.end_date && ! Moment(Val1).isBefore(_this.end_date)){
                                        //     //   _this.begin_date = ''
                                        //     //   _this.$Message.error('结束时间不能小于开始时间!')
                                        //     // }else{
                                        //     //   _this.begin_date = Val1
                                        //     // }
                                        // },
                                        // 'on-ok':(Val) => {
                                        //   _this.begin_date = Val
                                        //   // if(_this.end_date && ! Moment(Val1).isBefore(_this.end_date)){
                                        //   //     _this.begin_date = ''
                                        //   //     this.vaule='111'
                                        //   //     _this.$Message.error('结束时间不能小于开始时间!')
                                        //   //   }else{
                                        //   //     _this.begin_date = Val1
                                        //   //   }
                                        // },
                                        input:(Val) => {
                                          _this.begin_date = Val
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
                                        value:_this.end_date,
                                        placeholder: '请选择',
                                        class:'marginT_10',
                                        editable:false,
                                        options:_this.optionsE
                                    },
                                    on: {
                    //                   'on-change': (Val) => {
                    //                     _this.end_date = Val
                    // 　　　　　　　　　　},
                    //                     'on-ok':(Val) => {
                    //                       _this.end_date = Val
                    // 　　　　　　　　　　},
                                        input:(Val) => {
                                          _this.end_date = Val
                                        }
                                    },
                                    
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
                              }),
                              h('p', {
                                 props: {
                                  },
                              },'行程'),
                              h('Input', {
                                  props: {
                                      value: this.value,
                                      autofocus: false,
                                      placeholder: '请输入行程'
                                  },
                                  on: {
                                      input: (val) => {
                                          this.value = val
                                          _this.remark = val
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
  .ivu-table-cell{
    padding-left:5px !important;
    padding-right:5px !important;
  }

  
</style>

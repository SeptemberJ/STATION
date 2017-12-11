<template>
  <div class="CarList">
    <Table border :columns="columns7" :data="data6" show-header :show-header="false" :border="false"></Table>
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
        ifLoading:false,
        columns7: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },

            {
                title: 'Name',
                key: 'name',
            },
            {
                title: 'Age',
                key: 'age'
            },
            {
                title: 'Address',
                key: 'address'
            },
            {
                title: 'Action',
                key: 'action',
                width: 150,
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
                                    this.show(params.index)
                                }
                            }
                        }, '预定')
                    ]);
                }
            }
        ],
        data6: [
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park'
            }
        ]
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
      },
      show (index) {
          this.$Modal.info({
              title: 'User Info',
              content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
          })
      },
      remove (index) {
          this.data6.splice(index, 1);
      }
    }
  }
</script>
<style lang="scss">
.CarList{
}
</style>

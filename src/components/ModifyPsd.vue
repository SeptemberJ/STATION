<template>
  <div class="ModifyPsd" >
    <Form :model="formModifyPsd" ref="formModifyPsd" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="username">
            <Input v-model="formModifyPsd.username" placeholder="请输入用户名" disabled></Input>
        </FormItem>
        <FormItem label="新密码" prop="psw">
            <Input type='password' v-model="formModifyPsd.psw" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="pswAgain">
            <Input type='password'  v-model="formModifyPsd.pswAgain" placeholder="请确认新密码"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formModifyPsd')">保存</Button>
        </FormItem>
    </Form>
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
        ifSpin:false,
        formModifyPsd:{
          username:this.$store.state.userInfo.Name,
          psw:'',
          pswAgain:''
        },
        ruleValidate: {
            username: [
                { required: true, message: '请输入用户名!', trigger: 'blur' }
            ],
            psw: [
                { required: true, message: '请输入新密码!', trigger: 'blur' }
            ],
            pswAgain: [
                { required: true, message: '请确认密码!', trigger: 'blur' }
            ],
        }
      }
    },
    mounted: function () {
      
    },
    created() {
    },
    computed: {
    },
    watch: {
      
    },
    components: {
      Spin
    },
    methods: {
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  if(this.formModifyPsd.psw!=this.formModifyPsd.pswAgain){
                    this.$Message.error('两次输入的密码不一致!')
                    return
                  }
                  let DATA = {
                    username:this.formModifyPsd.username,
                    psw:this.formModifyPsd.psw
                  }
                   axios.get(R_PRE_URL+'/setPass?username='+this.formModifyPsd.username+'&psw='+this.formModifyPsd.psw
                  // axios.post(R_PRE_URL+'/setPass',DATA
                  ).then((res)=> {
                    if(res.data.result == 2 ){
                      this.$Message.success('密码修改成功!');
                      this.$router.push({name:'登录'})
                      localStorage.clear()
                    }else{
                      this.$Message.error(res.data.message+'!');
                    }
                    this.ifSpin = false
                  }).catch((error)=> {
                    console.log(error)
                  })
                  
              } else {
                  this.$Message.error('带*号的为必填项!');
              }
          })
      },
    }
  }
</script>
<style lang="scss">
.ModifyPsd{
}
</style>

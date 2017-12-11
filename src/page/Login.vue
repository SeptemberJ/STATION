<template>
  <div class="Login">
    <div class="LoginBox">
      <Row class="marginTB_20 TextCenter">
          <Col span="24"><h2>登录</h2></Col>
      </Row>
      <Form ref="formLogin" :model="formLogin" :rules="ruleInline">
        <Row>
          <Col span="24">
            <FormItem prop="user">
              <Input type="text" v-model="formLogin.user" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formLogin.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <Spin v-if="ifSpin"></Spin>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import Spin from '../components/Spin'
  export default{
    data: function () {
      return {
        ifSpin:false,
        formLogin: {
            user: '',
            password: ''
        },
        ruleInline: {
            user: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
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
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                let LoginInfo = this.formLogin
                axios.get(R_PRE_URL+'/login.do?username='+LoginInfo.user+'&psw='+LoginInfo.password
                  ).then((res)=> {
                    switch(res.data.result){
                      case ('2'):
                      localStorage.setItem("user_Name",LoginInfo.user)
                      this.$store.state.userInfo.Name = LoginInfo.user
                      this.$Message.success('欢迎登录!')
                      this.$router.push({name:'首页'})
                      break
                      case ('4'):
                      this.$Message.error('用户名或密码错误!')
                      break
                      default:
                      this.$Message.error('系统繁忙!')
                    }
                  }).catch((error)=> {
                    console.log(error)
                  })
              } else {
                  this.$Message.error('请输入用户名或密码!');
              }
          })
      }
      
    }
  }
</script>
<style lang="scss">
.Login{
  width: 100%;
  height: 100%;
  background-color: #FF3CAC;
  background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);

  .LoginBox{
    width: 80%;
    max-width: 500px;
    padding:20px 0;
    border-radius: 5px;
    box-shadow: 10px 10px 5px #333;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);   /* IE 9 */
    -moz-transform:translate(-50%,-50%);  /* Firefox */
    -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%,-50%); 
    form{
      width: 90%;
      margin: 0 auto;

    } 
  }

  
  
}
</style>
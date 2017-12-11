<template>
  <div class="Index">
    <div class="LoginBox">
      <Row class="marginTB_20 TextCenter">
          <Col span="24"><h2>登录</h2></Col>
      </Row>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <Row>
          <Col span="24">
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
// import MemberSideBar from 'components/MemberSideBar'
  export default{
    data: function () {
      return {
        formInline: {
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
    created: function () {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$Message.success('Success!');
                  this.$router.push({name:'车辆列表'})
              } else {
                  this.$Message.error('Fail!');
              }
          })
      }
      
    }
  }
</script>
<style lang="scss">
.Index{
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
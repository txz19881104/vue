<template>
    <Row class="style_magin_top_login">
        <Col :xs="{ span: 24, offset: 0 }" :md="{ span:20, offset:2 }" :lg="{ span: 6, offset: 9 }">
        <div class="topic-category">
            <Tabs type="line">
                <TabPane label="登录" icon="person">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
                        <FormItem prop="user">
                            <Input type="text" v-model="formInline.user" placeholder="用户名">
                            <Icon type="md-person" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formInline.password" placeholder="密码">
                            <Icon type="md-unlock" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <Checkbox v-model="formInline.SavePasswd" class="password_check">记住密码</Checkbox>
                        <FormItem>
                            <Button type="success" @click="handleSubmit('formInline')" long>登录</Button>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane label="注册" icon="person-add">
                    <Form ref="formInline" :model="formInline" :rules="ruleRegister" class="form">
                        <FormItem prop="user">
                            <Input type="text" v-model="formInline.user" placeholder="用户名">
                            <Icon type="md-person" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formInline.password" placeholder="密码">
                            <Icon type="md-unlock" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formInline.passwordagain" placeholder="再次输入密码">
                            <Icon type="md-unlock" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="success" @click="handleRegister('formInline')" long>注册</Button>
                        </FormItem>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
        </Col>
    </Row>
</template>
<script>
import myLogin from './Login.vue'
import qs from 'qs'
export default {
    inject: ['reload'],
    data() {
        return {
            formInline: {
                user: '',
                password: '',
                passwordagain: '',
                SavePasswd: true,
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '长度为6-30', trigger: 'blur' }
                ]
            },
            ruleRegister: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { type: 'string', min: 3, max: 30, message: '长度为3-30', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, max: 30, message: '长度为6-30', trigger: 'blur' }
                ],
                passwordagain: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, max: 30, message: '长度为6-30', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {

        Login(name) {
            var url = "/Api/Login";
            this.$ajax.post(url, qs.stringify({ user: this.formInline.user, password: this.formInline.password })).then(response => {
                if (response.status == 200) {
                    if (response.data.status == this.GLOBAL.Success) {
                        //判断复选框是否被勾选 勾选则调用配置cookie方法
                        if (this.formInline.SavePasswd == true) {
                            console.log("记录cookie");
                            //传入账号名，密码，和保存天数3个参数
                            this.setUserPasswd(this.formInline.user, this.formInline.password);
                            // 本地存储token 
                            localStorage.setItem('Token', response.data.Token);
                            // 把token加入header里
                            this.$ajax.defaults.headers.common['Token'] = response.data.Token;
                        } else {
                            console.log("清空Cookie");
                            //清空Cookie
                            this.clearUserPasswd();
                        }


                        this.GLOBAL.IsLogin = response.data.rows[0].UserAuthority;
                        this.GLOBAL.UserName = response.data.rows[0].UserName;

                        var LoginValue = "IsLogin=" + this.GLOBAL.IsLogin + ";UserName=" + this.GLOBAL.UserName;
                        localStorage.setItem('LoginValue', LoginValue);

                        this.GLOBAL.GetSetting(response.data.rows[0].UserSetting)
                        this.$Message.success('登录成功!');
                        this.$router.push({ path: '/' });
                        this.reload();

                    } else {
                        this.$Message.error('用户名不存在，请注册！');
                    }
                } else {
                    this.$Message.error('登录失败!');
                }
            }, response => {
                console.log(response);
                this.$Message.error('登录失败!');
            });
        },

        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.Login(name)
                } else {
                    this.$Message.error('登录失败,请检查登录参数!');
                }
            })
        },

        handleRegister(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.formInline.password === this.formInline.passwordagain) {
                        var url = "/Api/Register";
                        this.$ajax.post(url, qs.stringify({ user: this.formInline.user, password: this.formInline.password })).then(response => {

                            if (response.status == 200) {
                                if (response.data.status == this.GLOBAL.Success) {
                                    this.GLOBAL.IsLogin = 1;
                                    this.GLOBAL.UserName = this.formInline.user;
                                    //传入账号名，密码，和保存天数3个参数
                                    this.setUserPasswd(this.formInline.user, this.formInline.password);
                                    // 本地存储token 
                                    localStorage.setItem('Token', response.data.Token);
                                    // 把token加入header里
                                    this.$ajax.defaults.headers.common['Token'] = response.data.Token;
                                    this.$Message.success('注册成功!');
                                    this.$router.push({ path: '/', query: { userName: this.formInline.user } });

                                    var LoginValue = "IsLogin=" + this.GLOBAL.IsLogin + ";UserName=" + this.GLOBAL.UserName;
                                    localStorage.setItem('LoginValue', LoginValue);
                                } else {
                                    this.$Message.error('用户名已经被使用，请重新注册！');
                                }
                            } else {
                                this.$Message.error('注册失败!');
                            }
                        }, response => {
                            console.log(error);
                            this.$Message.error('注册失败!');
                        });
                    } else {
                        this.$Message.error('两次输入的密码不一致,请确认!');
                    }
                } else {
                    this.$Message.error('注册失败!');
                }
            })
        },

        //设置cookie
        setUserPasswd(c_name, c_pwd) {
            //var exdate = new Date(); //获取时间
            //exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            //window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            //window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            var UserInfo = "userName=" + c_name + ";"
            localStorage.setItem('UserInfo', UserInfo);

        },
        //读取cookie
        getUserPasswd: function() {
            var UserInfo = localStorage.getItem('UserInfo');
            if (UserInfo != null) {
                var arr = UserInfo.split(';'); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.formInline.user = arr2[1]; //保存到保存数据的地方
                    } /*else if (arr2[0] == 'userPwd') {
                        this.formInline.password = arr2[1];
                    }*/
                }
            }

            if (this.formInline.user != '' && this.formInline.password != '') {
                this.Login(this.formInline)
            }
        },


        //清除cookie
        clearUserPasswd: function() {
            localStorage.removeItem('UserInfo');
            //this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        }
    },

    mounted() {
        if (this.GLOBAL.IsLogin == 5) {
            this.GLOBAL.IsLogin = 0
            this.GLOBAL.UserName = ''

            this.clearUserPasswd();
            var LoginValue = "IsLogin=" + this.GLOBAL.IsLogin + ";UserName=" + this.GLOBAL.UserName;
            localStorage.setItem('LoginValue', LoginValue);
        } else {
            this.getUserPasswd();
        }

        this.GLOBAL.GetGlobalValue()
    }
}
</script>
<style scoped>
.style_magin_top_login {
    margin-top: 10rem;
}

.h2-mod {
    color: #666;
    background-color: #ddd;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

.topic-category {
    border-radius: 0.5rem;
    border: 0.2rem solid #e5e5e5;
    background-color: #eee;
}

.form {
    width: 300px;
    margin: 0 auto;
    margin-top: 2rem;
}

.tabs-nav {
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
}

.password_check {
    margin-bottom: 1rem;
    float: right;
}
</style>
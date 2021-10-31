


<template>

    <div class="page-bg">

    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="login-container">
        <el-form-item >
            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="8"> <img :src="url" width="100%" height="100%" alt=""></el-col>
                <el-col :span="8">&nbsp;</el-col>
            </el-row>
        </el-form-item>
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>


        </div>
</template>

<script >
    //import NProgress from 'nprogress'
    export default {
        name:"login",
        data() {
            return {
                url:require("../assets/logo.png"),
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },

            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass};
                        console.log(loginParams)
                        let login = [this.ruleForm2.account, this.ruleForm2.checkPass]
                //         localStorage.setItem("LoginUser", JSON.stringify(login))
                //         this.$store.commit("setLoginUser", login);
                //         if(this.ruleForm2.account == 1){
                //             this.$router.push({path: '/odIndex'});
                //         } else if(this.ruleForm2.account == 2) {


                        this.$axios.get("/login", {
                            params: {
                                username: this.ruleForm2.account,
                                password: this.ruleForm2.checkPass
                            }
                        }).then((res) => {
                            this.logining = false;
                            if (res.data.code != 200) {
                                this.$message("账号和密码不匹配。请检查");
                            } else if (res.data.code == 200) {
                                //存储在localStorage
                                localStorage.clear();
                                localStorage.setItem("LoginUser", JSON.stringify(res.data.data))
                                this.$store.commit("setLoginUser", res.data.data);
                                let role = res.data.data.role;
                                console.log(role)
                                this.ruleForm2.account = "";
                                this.ruleForm2.checkPass = ""

                                if (role == 1) {
                                    this.$router.push({path: '/odIndex'});
                                } else if (role == 2) {
                                  this.$router.push({path: '/yjhome'});
                                } else if (role == 3) {
                                  this.$router.push({path: '/rdhome'});
                                } else if (role == 4) {
                                  this.$router.push({path: '/sfhome'});
                                } else if (role == 5) {
                                  this.$router.push({path: '/fnhome'});
                                } else if (role == 6) {
                                  this.$router.push({path: '/adhome'});
                                }

                            }
                        }, (error) => {
                            this.$message("当前网络不通");
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

    // //background
    // /**
    //  * GitHub: https://github.com/hustcc/canvas-nest.js
    //  */
    // !
    //     function() {
    //         function n(n, e, t) {
    //             return n.getAttribute(e) || t
    //         }
    //         function e(n) {
    //             return document.getElementsByTagName(n)
    //         }
    //         function t() {
    //             var t = e("script"),
    //                 o = t.length,
    //                 i = t[o - 1];
    //             return {
    //                 l: o,
    //                 z: n(i, "zIndex", -1),
    //                 o: n(i, "opacity", .5),
    //                 c: n(i, "color", "0,0,0"),
    //                 n: n(i, "count", 99)
    //             }
    //         }
    //         function o() {
    //             a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    //                 c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    //         }
    //         function i() {
    //             r.clearRect(0, 0, a, c);
    //             var n, e, t, o, m, l;
    //             s.forEach(function(i, x) {
    //                 for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e],
    //                 null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
    //             }),
    //                 x(i)
    //         }
    //         var a, c, u, m = document.createElement("canvas"),
    //             d = t(),
    //             l = "c_n" + d.l,
    //             r = m.getContext("2d"),
    //             x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    //                 function(n) {
    //                     window.setTimeout(n, 1e3 / 45)
    //                 },
    //             w = Math.random,
    //             y = {
    //                 x: null,
    //                 y: null,
    //                 max: 2e4
    //             };
    //         m.id = l,
    //             m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o,
    //             e("body")[0].appendChild(m),
    //             o(),
    //             window.onresize = o,
    //             window.onmousemove = function(n) {
    //                 n = n || window.event,
    //                     y.x = n.clientX,
    //                     y.y = n.clientY
    //             },
    //             window.onmouseout = function() {
    //                 y.x = null,
    //                     y.y = null
    //             };
    //         for (var s = [], f = 0; d.n > f; f++) {
    //             var h = w() * a,
    //                 g = w() * c,
    //                 v = 2 * w() - 1,
    //                 p = 2 * w() - 1;
    //             s.push({
    //                 x: h,
    //                 y: g,
    //                 xa: v,
    //                 ya: p,
    //                 max: 6e3
    //             })
    //         }
    //         u = s.concat([y]),
    //             setTimeout(function() {
    //                     i()
    //                 },
    //                 100)
    //     } ();
</script>

<style  scoped>

    .page-bg {
        background: url('../../src/assets/1.jpg');
        backgorund-size:cover;
    }
    .div{
        height: 100%;
    }
    .bigclass{
        margin-top: 180px;
    }

    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border: 1px solid #eaeaea;
        background-color: white;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-container .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login-container .remember {
        margin: 0px 0px 35px 0px;
    }
</style>

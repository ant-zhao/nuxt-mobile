<template>
	<div class="weread-login">
		<div class="login-form ewm">
			<div class="login-header">
				<h3 class="ac">{{ boChatInfo?'绑定手机号':ewmLogin==1 ? '微信登录' : '注册/登录' }}</h3>
				<p class="line"></p>
				<EwmLog v-if="ewmLogin==1" :weChatInfo="weChatInfo" />
				<TelLog 
                    v-else :loading="isLogin" 
                    @login="login" 
                    @handleTelCode="handleTelCode" 
                    @handleLogin="handleLogin"
                    @handleRegister="handleRegister"
                />
			</div>
			<!-- <div class="login-footer noSelect" v-if="!boChatInfo">
				<div class="login-footer-flex" v-for="(item,index) in loginAgain" :key="index">
					<p class="login-footer-icon b-sizing" @click="ewmLogin=item.type">
						<img :src="item.img" />
					</p>
					<p class="login-footer-tit">{{item.name}}</p>
				</div>
			</div> -->
		</div>
	</div>
</template>
<script type="text/javascript">
import TelLog from "./telLog.vue";
import EwmLog from "./ewmLog.vue";
import WeiboLog from "./weiboLog.vue";
import { loginApi, registerApi } from "@/server/login";
import { mapMutations } from "vuex";
export default {
	name: "weread-login",
	props: {
		boChatInfo: {
			type: Boolean
		},
		weChatInfo: {
			type: Object,
			default() {
				return {};
			}
        },
        pageType: {
			type: String,
			default: null
		},
		telIcon: {
			type: String,
			default: null
		}
	},
	watch:{
		ewmLogin(val){
            if (!process.browser) return;
			localStorage.type=val;
			if(val==2){
				let path = this.$route.path;
				location.href="https://api.weibo.com/oauth2/authorize?client_id=966440062&response_type=code&redirect_uri="+encodeURIComponent(`${window.location.origin}${path}`);
			}
			
		}
	},
	data() {
		return {
            ewmLogin: process.browser?localStorage.type?localStorage.type:0:0,
            isLogin: false,
			loginAgain:[
                {
                    name:'手机登录',
                    img:require("@/assets/imgs/login/tel.png"),
                    type:0
                },{
                    name:'微信登录',
                    img:require("@/assets/imgs/login/weixin.png"),
                    type:1
                },
                // {
                //     name:'微博登录',
                //     img:require("@/assets/imgs/login/weibo.png"),
                //     type:2
                // }
            ]
		};
	},
	components: {
		TelLog,
		EwmLog,
		WeiboLog
    },
    created() {
        this.redirect = this.$route.query.redirect;
    },
	methods: {
        ...mapMutations({
            setUseInfo: "user/setUserInfo"
        }),
		login() {
			this.$emit("login");
		},
		cutLogType() {
			this.ewmLogin = !this.ewmLogin;
		},
		handleTelCode(phone) {
			this.$emit("handleTelCode", phone);
		},
		async handleLogin(loginInfo) {
            const that = this;
            if (this.isLogin) return;
            this.isLogin = true;
            const { code, data } = await loginApi({
                passWord: loginInfo.password,
                phone: loginInfo.phone
            });
            window.localStorage.setItem(
                "readUserInfo",
                JSON.stringify(data||{})
            );
            that.setUseInfo(data);
            let timer = setTimeout(() => {
                this.isLogin = false;
                clearTimeout(timer);
                timer = null;
                if (code!=0) return;
                if(that.$route.path.indexOf('/login')>=0){
                    that.$router.push(!!this.redirect ?this.redirect:`/`);
                } else {
                    this.login();
                    window.location.reload();
                }
            }, 80);
        },
        async handleRegister(info) {
            const that = this;
            if (this.isLogin) return;
            this.isLogin = true;
            const { code, data } = await registerApi({
                ...info
            });
            this.setUseInfo(data);
            window.localStorage.setItem(
                "readUserInfo",
                JSON.stringify(data)
            );
            let timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                this.isLogin = false;
                if(code!==0) return;
                if(that.$route.path.indexOf('/login')>=0){
                    that.$router.push(!!this.redirect ?this.redirect:`/`);
                } else {
                    this.login();
                    window.location.reload();
                }
            }, 80);
        } 
	}
};
</script>
<style lang="less" scoped>
.weread-login {
    .code-box {
        /deep/.ant-form-item-children {
            input {
                height: 41px;
                box-sizing: border-box;
                padding: 10px 0;
                border: none;
                border-bottom: 1px solid var(--borderColor);
                border-radius: 0;
                font-size: 14px;
                font-weight: 400;
                color: var(--headColor);
                line-height: 34px;
                transition: .2s linear;
                &.min {
                    padding: 10px 82px 10px 0;
                }
                &::-webkit-input-placeholder {
                    font-size: 14px;
                    font-weight: 400;
                    color: var(--placeholderColor);
                    line-height: 34px;
                }
                &:focus {
                    border-color: var(--activeColor)!important;
                    box-shadow: none;
                }
            }
        }
    }

    display: flex;
    justify-content: center;

    .login-form {
        width: 12rem;
        box-sizing: border-box;
        background: var(--backgroundColor);
        border-radius: 8px;
        box-shadow: 0px 0px 60px 0px var(--shadowColor);
        padding: 1rem .6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
            font-size: .8rem;
            font-weight: 600;
            color: var(--headColor);
            line-height: 1rem;
            padding: 10px 0 2px;
        }

        .line {
            width: 100%;
            height: 1px;
            background: var(--borderColor);
            position: relative;
            margin-bottom: 30px;

            &::after {
                content: '';
                position: absolute;
                display: block;
                width: 50px;
                height: 2px;
                top: -1px;
                left: 50%;
                background: var(--darkColor);
                transform: translateX(-50%);
            }
        }

        .login-footer {
            padding-top: 26px;
            display:flex;
            justify-content: space-between;
            .login-footer-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                margin: auto;
                background: var(--lightColor);
                box-shadow: 0px 9px 20px -2px avr(--shadowColor);

                img {
                    display: block;
                    max-width: 24px;
                    max-height: 60%;
                    margin: 0 auto;
                }
            }

            .login-footer-tit {
                height: 17px;
                font-size: 12px;
                font-weight: 400;
                color: var(--placeholderColor);
                line-height: 17px;
                padding-top: 8px;
            }
        }
    }
}
</style>

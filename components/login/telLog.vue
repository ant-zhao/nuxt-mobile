<template>
    <div class="code-box">
        <van-form @submit="login" ref="logForm" @submit.native.prevent>
            <template v-if="formType=='register'">
                <div class="head-box ac">
                    <van-uploader
                        name="file"
                        class="avatar-uploader"
                        :disabled="loading||uploadImgLoading"
                        :before-read="beforeUpload"
                        :after-read="uploadImg"
                    >
                        <img v-if="imgUrl" :src="imgUrl" alt="avatar" />
                        <div v-else>
                            <van-icon :name="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">
                                头像
                            </div>
                        </div>
                    </van-uploader>
                </div>
                <div class="item-box">
                    <van-field v-model="form.name" :max-length="20" placeholder="请输入昵称" @input="clearVerify('name')" :rules="rules.name"></van-field>
                </div>
            </template>
            <div class="item-box">
                <van-field v-model="form.phone" type="number" placeholder="请输入手机号" @input="clearVerify('phone')" :rules="rules.phone"></van-field>
            </div>
            <div class="item-box">
                <van-field v-model="form.password" :max-length="30" type="password" placeholder="请输入密码" @input="clearVerify('password')" :rules="rules.password"></van-field>
            </div>
            <div class="item-box" v-if="formType=='register'">
                <van-field v-model="form.againPassword" :max-length="30" type="password" placeholder="再次输入密码密码" @input="clearVerify('againPassword')" :rules="rules.againPassword"></van-field>
            </div>
            <!-- <div v-if="formType=='login'" class="item-box pr">
                <van-field class="min" v-model="form.imgCode" :max-length="4" type="text" placeholder="请输入图片验证码" @input="clearVerify('imgCode')" :rules="rules.imgCode"></van-field>
                <div class="imgCode-block pa noSelect df" @click="initImgCode">
                    <p v-for="(item, i) in imgCodeData.code" :key="i" :style="`transform:rotate(${imgCodeData.rotate[i]}deg);font-size: ${imgCodeData.fz[i]}px;color:rgb(${imgCodeData.color[i].toString()})`">
                        {{ item }}
                    </p>
                </div>
            </div> -->
            <!-- <div class="item-box pr">
                    <van-field class="min" v-model="form.code" type="number" placeholder="请输入手机验证码" @input="clearVerify('code')"></van-field>
                <div :class="['getCode pa noSelect', getCode ? 'active' : '']" @click="handleImgCode">
                    {{ getCode ? `${codeCount}s` : '获取验证码' }}
                </div>
            </div> -->
            <div class="sub-box">
                <van-button :loading="loading" native-type="submit">
                    {{
                        formType=='login'?'登录':'注册'
                    }}
                </van-button>
            </div>
            <div class="login-type pt20 ar">
                <span class="noSelect" @click="cutLoginType">
                    {{
                        formType=='login'?'没有账号，注册':'已有账号，登录'
                    }}
                </span>
            </div>
        </van-form>
    </div>
</template>
<script type="text/javascript">
import { uploadFileApi } from "@/server/api";
import url from '@/server/global';
const { filePath } = url;
export default {
    name: 'tel-login',
    props: {
        loading: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    data() {
        const checkImgCode = (value) => {
            return !!value&&value.toUpperCase() === this.imgCodeData.code.join('').toUpperCase();
        };
        const checkPhone = (value) => {
            const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
            return !!value&&reg.test(value);
        };
        const pwdAgainCheck =(value) => {
            return !!value&&this.form.password===value;
        };
        return {
            rules: {
                imgCode: [{ validator: checkImgCode, message: '请输入正确验证码', trigger: 'onBlur' }],
                code: [{ required: true, message: '请输入手机验证码', trigger: 'onBlur' }],
                name: [{ required: true, message: '请输入昵称', trigger: 'onBlur' }], 
                password: [{ required: true, message: '请输入密码', trigger: 'onBlur' }], 
                phone: [{ validator: checkPhone, trigger: 'onBlur',message: '请输入正确手机号', }],
                againPassword: [{ required: true, validator: pwdAgainCheck, trigger: 'onBlur', message: '两次输入密码不一致' }]
            },
            form: {
                name:"",
                phone: "",
                // imgCode: '',
                password: "",
                againPassword: ""
            },
            imgCodeData: {
                code: [],
                rotate: [],
                fz: [],
                color: []
            },
            getCode: false,
            codeCount: 60,
            formType: 'login',
            imgUrl: '',
            uploadImgLoading: false
        };
    },
    created() {
        // this.initImgCode();
    },
    methods: {
        clearVerify(key) {
            if (key == 'phone' && this.form.phone.length > 11) {
                this.$set(this.form, 'phone', this.form.phone.substr(0, 11));
            }
            // if (key == 'code' && this.form.code.length > 6) {
            //     this.$set(this.form, 'code', this.form.code.substr(0, 6));
            // }
            this.$refs['logForm'].resetValidation(key);
        },
        cutLoginType() {
            this.$refs['logForm'].resetValidation();
            this.formType = this.formType==='login'?'register':'login';
        },
        login() {
            this.formType==='login'? 
            this.$emit('handleLogin', this.form):
            this.$emit('handleRegister', this.form);
        },
        handleImgCode() {
            if (this.getCode) return;
            this.$refs['logForm'].validateField('phone', phoneError => {
                if (!phoneError) {
                    this.$refs['logForm'].validateField('imgCode', imgCodeError => {
                        if (!imgCodeError) {
                            this.getCode = true;
                            this.$emit('handleTelCode', this.form.phone);
                            let codeTimer = setInterval(() => {
                                this.codeCount -= 1;
                                if (this.codeCount == 0) {
                                    clearInterval(codeTimer);
                                    codeTimer = null;
                                    this.getCode = false;
                                    this.codeCount = 60;
                                }
                            }, 1000);
                        }
                    });
                }
            });
        },
        initImgCode() {
            const data = this.getRndCode();
            const rotate = this.getRandom(35, -35, 4);
            const fz = this.getRandom(16, 20, 4);
            const color = [this.getRandom(100, 255, 3), this.getRandom(100, 255, 4), this.getRandom(100, 255, 3), this.getRandom(100, 255, 3)];
            this.imgCodeData = Object.assign(
                {},
                {
                    code: data,
                    rotate,
                    fz,
                    color
                }
            );
        },
        //获取验证码字符
        getRndCode() {
            const codes = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let d = [];
            for (let i = 0; i < 4; i++) {
                d.push(codes.substr(parseInt(Math.random() * 61) - 1, 1));
            }
            return d;
        },
        getRandom(max, min, num) {
            const asciiNum = ~~(Math.random() * (max - min + 1) + min);
            if (!Boolean(num)) {
                return asciiNum;
            }
            const arr = [];
            for (let i = 0; i < num; i++) {
                arr.push(this.getRandom(max, min));
            }
            return arr;
        },
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$zhMessage.error('只能上传JPG/PNG格式的文件!');
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$zhMessage.error('图片必须小于5MB!');
            }
            return isJpgOrPng && isLt5M;
        },
        
        async uploadImg (info) {
            this.uploadImgLoading = true;
            let params = new FormData();
            params.append("file", info.file);
            const { code, data } = await uploadFileApi(params);
            this.uploadImgLoading = false;
            if(code!==0) {
                this.$zhMessage.error("网络错误，上传失败");
                return;
            }
            const { fileId = '', fileExtName = 'png' } = data;
            const url = `${filePath}/${fileId}.${fileExtName}`;
            this.imgUrl = url;
            this.$set(this.form, "userUrl", `${fileId}.${fileExtName}`);
        }
    }
};
</script>
<style lang="less" scoped>
.code-box {
    .head-box {
        /deep/.avatar-uploader {
            display: block;
            >.van-uploader__wrapper {
                display: block;
                width: 2.6rem;
                height: 2.6rem;
                margin: 0 auto;
                float: initial;
                border-radius: 50%;
                border: 1px dashed var(--borderColor);
                color: var(--labelColor);
                .van-uploader__input-wrapper {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                    border-radius: 50%;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    img {
                        display: block;
                        border-radius: 50%;
                        margin: 0 auto;
                        height: 100%;
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
        }
    }
    .item-box {
        /deep/.van-field {
            padding: 0;
            border-bottom: 0;
            margin-bottom: 0.6rem;
            &__body {
                border-bottom: 1px solid var(--borderColor);
                .van-field__control {
                    flex: 1;
                    height: 1.52rem;
                    font-weight: 400;
                    color: var(--headColor);
                    font-size: .5rem;
                    line-height: 1.52rem;
                }
                .verify-code {
                    color:var(--activeColor);
                    font-size: .4rem;
                    font-weight:400;
                }
            }
        }
        .imgCode-block {
            height: 1.4rem;
            width: 3rem;
            background: var(--hoverBackgroundColor);
            border-radius: 2px;
            text-align: center;
            line-height: 1.4rem;
            font-size: .5rem;
            top: 0;
            right: 0;
            justify-content: space-around;
        }
        .getCode {
            height: 1.4rem;
            width: 3rem;
            text-align: center;
            line-height: 1.4rem;
            font-size: .5rem;
            color: var(--darkColor);
            top: 0;
            right: 0;
            &.active {
                color: var(--disabledColor);
                cursor: not-allowed;
            }
        }
    }
    .sub-box {
        padding-top: 18px;
        button {
            width: 100%;
            height: 1.6rem;
            background: var(--activeColor);
            color: #ffffff;
            &:active {
                background: var(--activeColor);
            }
        }
    }
    .login-type {
        color: var(--activeColor);
    }
}
</style>

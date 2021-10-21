<template>
    <div class="code-box pt25">
        <el-form :model="form" :rules="rules" ref="logForm" @submit.native.prevent>
            <div class="item-box">
                <el-form-item prop="phone">
                    <el-input v-model="form.phone" type="number" placeholder="请输入手机号" @input="clearVerify('phone')"></el-input>
                </el-form-item>
            </div>
            <div class="item-box pr">
                <el-form-item prop="imgCode">
                    <el-input class="min" v-model="form.imgCode" maxlength="4" type="text" placeholder="请输入图片验证码" @input="clearVerify('imgCode')"></el-input>
                </el-form-item>
                <div class="imgCode-block pa noSelect df" @click="initImgCode">
                    <p v-for="(item, i) in imgCodeData.code" :key="i" :style="`transform:rotate(${imgCodeData.rotate[i]}deg);font-size: ${imgCodeData.fz[i]}px;color:rgb(${imgCodeData.color[i].toString()})`">
                        {{ item }}
                    </p>
                </div>
            </div>
            <div class="item-box pr">
                <el-form-item prop="code">
                    <el-input class="min" v-model="form.code" type="number" placeholder="请输入手机验证码" @input="clearVerify('code')"></el-input>
                </el-form-item>
                <div :class="['getCode pa noSelect', getCode ? 'active' : '']" @click="handleImgCode">
                    {{ getCode ? `${codeCount}s` : '获取验证码' }}
                </div>
            </div>
            <div class="sub-box">
                <el-button :loading="loading" @click="login">绑定</el-button>
            </div>
        </el-form>
    </div>
</template>
<script type="text/javascript">
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
        const checkImgCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入图片验证码'));
            } else {
                if (value.toUpperCase() != this.imgCodeData.code.join('').toUpperCase()) {
                    return callback(new Error('验证码错误'));
                } else {
                    callback();
                }
            }
        };
        const checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入手机号'));
            } else {
                const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        };
        return {
            rules: {
                imgCode: [{ validator: checkImgCode, trigger: 'submit' }],
                code: [
                    {
                        required: true,
                        message: '请输入手机验证码',
                        trigger: 'submit'
                    }
                ],
                phone: [{ validator: checkPhone, trigger: 'submit' }]
            },
            form: {
                phone: null,
                imgCode: '',
                code: null
            },
            imgCodeData: {
                code: [],
                rotate: [],
                fz: [],
                color: []
            },
            getCode: false,
            codeCount: 60
        };
    },
    created() {
        this.initImgCode();
    },
    methods: {
        clearVerify(key) {
            if (key == 'phone' && this.form.phone.length > 11) {
                this.$set(this.form, 'phone', this.form.phone.substr(0, 11));
            }
            if (key == 'code' && this.form.code.length > 6) {
                this.$set(this.form, 'code', this.form.code.substr(0, 6));
            }
            this.$refs['logForm'].clearValidate(key);
        },
        login() {
            this.$refs['logForm'].validate(valid => {
                if (!valid) return;
                this.$emit('handle3Login', this.form);
            });
        },
        handleImgCode() {
            if (this.getCode) return;
            this.$refs['logForm'].validateField('phone', phoneError => {
                if (!phoneError) {
                    this.$refs['logForm'].validateField('imgCode', imgCodeError => {
                        if (!imgCodeError) {
                            this.getCode = true;
                            this.$emit('handle3TelCode', this.form.phone);
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
        }
    }
};
</script>
<style lang="less" scoped>
.code-box {
    .item-box {
        .imgCode-block {
            height: 34px;
            width: 76px;
            background: var(--hoverBackgroundColor);
            border-radius: 2px;
            text-align: center;
            line-height: 34px;
            font-size: 16px;
            color: var(--disabledColor);
            top: 0;
            right: 0;
            justify-content: space-around;
        }
        .getCode {
            height: 34px;
            width: 76px;
            text-align: center;
            line-height: 34px;
            font-size: 14px;
            color: var(--textColor);
            top: 0;
            right: 0;
            &.active {
                color:var(--disabledColor);
                cursor: not-allowed;
            }
        }
    }
    .sub-box {
        padding-top: 18px;
        button {
            width: 100%;
            height: 42px;
            background: var(--activeColor);
            color: var(--backgroundColor);
            &:active {
                background: var(--activeColor);
            }
        }
    }
}
</style>

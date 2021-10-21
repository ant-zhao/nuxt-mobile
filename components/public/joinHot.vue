<template>
    <div v-if="visible" class="join-box pf">
        <div class="join tCenter">
            <van-form
                @submit="submit"
                @submit.native.prevent
                class="form-box"
            >
                <van-field
                    clearable readonly
                    :rules="rules.hots"
                    clickable name="hots"
                    :disabled="loading"
                    @input="clearVerify('hots')"
                    v-model="form.hots.name"
                    label="句集"
                    placeholder="选择句集"
                    @click="cutJj"
                >
                    <template #right-icon>
                        <van-icon v-if="form.hots.name" name="clear" @click.stop="clearHots" />
                        <van-icon v-else name="arrow-down" />
                    </template>
                </van-field>
                <div class="pt20 ar footer">
                    <van-button :loading="loading" @click="turnShow">
                        取消
                    </van-button>
                    <van-button :loading="loading" type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
        <van-popup v-model="showJj" position="bottom">
            <div class="pt10 pb10">
                <van-field v-model="searchTxt" placeholder="请输入句集名称" @input="getHots">
                    <template #button>
                        <van-icon name="search" />
                    </template>
                </van-field>
            </div>
            <van-picker
                show-toolbar
                :columns="selHotsList"
                @confirm="onConfirm"
                @cancel="cutJj"
            />
        </van-popup>
    </div>
</template>
<script type="text/javascript">
import { queryMyHotNameApi } from "@/server/post";
export default {
    name: "join_hot",
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            rules: {
                hots: [{ required: true, message: '请选择句集', trigger: 'submit' }],
            },
            hotsList: [],
            visible: false,
            form: { hots: {name:'', id: null} },
            showJj: false,
            searchTxt: ''
        }
    },
    computed:{
        selHotsList() {
            return this.hotsList.map(v=>v.name);
        }
    },
    mounted() {
        this.getHots()
    },
    methods: {
        turnShow() {
            if(this.visible) {
                this.$playScroll();
                this.visible = false;
            } else {
                this.visible = true;
                this.$stopScroll();
            }
        },
        cutJj () {
            this.showJj = !this.showJj
        },
        onConfirm(value, index) {
            this.$set(this.form, 'hots', this.hotsList[index]);
            this.cutJj();
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        async getHots(name="") {
            const {code,data} = await queryMyHotNameApi({ name });
            if(code===0&&data&&data.length) {
                this.$set(this, "hotsList", data.map(v=>{
                    return {
                        ...v,
                        value: v.id+'',
                        key: v.id+''
                    }
                }));
            } else if(name) {
                this.$set(this, 'hotsList', [{ name, value: 'new-'+name, key: 'new-'+name }])
            } else {
                this.$set(this, 'hotsList', [])
            }
        },
        submit() {
            const { hots } = this.form;
            const hotData = hots&&hots.key?hots.key.indexOf("new-")>=0?{
                id: null,
                name: hots.name.replace(/[\r\n]/g,"").replace(/\ +/g,"")
            }:{id:hots.key,name:hots.name}:{id:null,name:""};
            this.$emit("joinHot",hotData);
        },
        clearHots() {
            this.$set(this.form, 'hots', { id:'', name:'', key:'' });
            this.getHots();
        },
    }
}
</script>

<style lang="less" scoped>
.join-box {
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 100;
    background: var(--hoverShadowColor);
    .join {
        width: 80%;
        padding: 1rem .5rem;
        background: var(--backgroundColor);
        border-radius: 8px;
        .footer {
            .van-button {
                height: 1.3rem;
                line-height: 1.3rem;
                padding: 0 15px;
            }
        }
    }
}
</style>

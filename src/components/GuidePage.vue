<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="3">
          <ul id="menu" class="ul-menu">
            <li v-for="i in guideArr" class="menuItem li-menu" :key="i.index" index="i.index" @click="handleOpen(i)">
              {{ i.name }}
            </li>
          </ul>
        </el-col>
        <el-col :span="21">
          <el-container>
            <el-main style="height: 500px">
              <ul v-for="i in guideArr" :key="i.index" class="ul-li-left">
                <h1 :id="i.name" class="ul-style">{{ i.name }}</h1>
                <li v-for="j in i.members" :key="j.index" class="li-style">
                  <el-avatar shape="square" :src="require('../../public/foodpic/' + j.pic)"></el-avatar>
                  <div style="margin-left: 10px">
                    <div>{{ j.name }}</div>
                    <div style="font-size: small; color: #93999f">
                      月售：{{ j.mSell }} &nbsp;&nbsp;&nbsp; 好评率：{{
                        j.charge
                      }}
                    </div>
                    <div style="color: red">¥ {{ j.price }}</div>
                  </div>
                  <div>
                    <span v-show="!j.add" style="position: absolute; right: 0; top: 30%">
                      <i class="el-icon-circle-plus-outline" style="color: dodgerblue" @click="j.add = true;j.num++;"></i>
                    </span>
                    <span v-show="j.add" style="position: absolute; right: 0; top: 30%">
                      <el-input-number size="small" v-model="j.num" @change="handleChange(j)" :min="0" :max="10"
                        label="个数"></el-input-number>
                    </span>
                  </div>
                </li>
              </ul>
            </el-main> 
          </el-container>
        </el-col>
      </el-row>
    </el-main>
    <el-footer class="shopcart" >
      <span style="position: relative;font-size: 50px; z-index:30000;">
        <i class="el-icon-shopping-cart-full" style="color: dodgerblue; height: 40px;" @click="drawer = drawer == true ? false : true"></i>
      </span>
      <el-drawer
        title="购物车"
        :visible.sync="drawer"
        direction="btt"
        :modal-append-to-body="false"
        style="position: fixed; bottom: 60px;width: 100;"
        >
      </el-drawer>     
    </el-footer>
  </el-container>
</template>

<script>
import axios from "axios";
import hosts from "../data/host";
export default {
  data() {
    return {
      guideArr: [],
      drawer:false,
      form:[],
    };
  },
  methods: {
    handleOpen(i) {
      if (document.getElementsByClassName("menu-active")[0]) {
        document
          .getElementsByClassName("menu-active")[0]
          .classList.remove("menu-active");
      }
      document
        .getElementsByClassName("menuItem")[i.index]
        .classList.add("menu-active");
      document.getElementById(i.name).scrollIntoView();
    },
    handleChange(item) {
      console.log(item)
    },
    async getData() {
      await axios.get(`${hosts.development}/getfoodlist`).then((res) => {
        this.guideArr = res.data;
      });
      for (let i in this.guideArr) {
        //前端需要的属性，不需要体现在数据库中
        this.guideArr[i].index = i;
        for (let j in this.guideArr[i].members) {
          //前端需要的属性，不需要体现在数据库中
          this.guideArr[i].members[j].index = `${i}.${j}`;
          this.guideArr[i].members[j].add = false;
          if (this.guideArr[i].members[j].isHot) {
            this.guideArr[0].members.push(this.guideArr[i].members[j]);
          }
        }
      }
      console.log(this.guideArr);
    },
  },
  mounted() {
    this.getData();
    if (document.getElementsByClassName("menuItem")[0]) {
      document
        .getElementsByClassName("menuItem")[0]
        .classList.add("menu-active");
    }
  },
};
</script>

<style>
.ul-menu {
  width: 100%;
  text-align: left;
  list-style: none;
}

.li-menu {
  cursor: pointer;
  height: 60px;
  background: #f0f0f0;
  color: #000;
}

.ul-li-left {
  text-align: left;
  list-style: none;
}

.ul-style {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: #93999f;
  background: #f3f5f7;
}

.li-style {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  position: relative;
  border: none;
  cursor: pointer;
}

.el-main {
  scroll-behavior: smooth;
  /*屏幕平滑滚动*/
}

.el-main::-webkit-scrollbar {
  display: none;
  /*不显示滚动条*/
}

.menu-active {
  background: #0b8fc4;
  color: #594454;
}
#app {
    text-align: center;
}

.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #141d27;
  text-align: left;
  position:fixed;
}
/* .el-drawer__container{
  bottom: 60px;
} */
</style>

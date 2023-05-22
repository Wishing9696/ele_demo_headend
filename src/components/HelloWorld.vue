<template>
  <el-container>
    <el-header>
      <el-row>
        <el-menu router default-active="/GuidePage" class="el-menu-demo" mode="horizontal">
          <el-col :span="8"><el-menu-item index="/GuidePage">商品</el-menu-item></el-col>
          <el-col :span="8"><el-menu-item index="/CommentsPage">评价</el-menu-item></el-col>
          <el-col :span="8"><el-menu-item index="/SellerPage">商家</el-menu-item></el-col>
        </el-menu>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.el-main{
    padding-bottom: 0px !important;

};
</style>

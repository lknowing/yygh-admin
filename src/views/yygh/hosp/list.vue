<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="searchObj.provinceCode"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.cityCode" placeholder="请选择市">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="医院logo">
        <template slot-scope="scope">
          <img
            :src="'data:image/jpeg;base64,' + scope.row.logoData"
            width="80"
          />
        </template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="param.hostypeString" label="等级" width="90" />
      <el-table-column prop="param.fullAddress" label="详情地址" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? "未上线" : "已上线" }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <router-link :to="'/yygh/hospset/hospital/show/' + scope.row.id">
            <el-button type="primary" size="mini">查看</el-button>
          </router-link>
          <router-link :to="'/yygh/hospset/hospital/schedule/' + scope.row.hoscode">
            <el-button type="primary" size="mini">排班</el-button>
          </router-link>

          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            @click="updateStatus(scope.row.id, 0)"
            >下线</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            @click="updateStatus(scope.row.id, 1)"
            >上线</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>
<script>
import hospApi from "@/api/yygh/hosp";

import dictApi from "@/api/yygh/dict";

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 医院列表数据集合
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {
        provinceCode: "",
        cityCode: "",
      }, // 查询表单对象，有下拉选择框要初始化数据
      provinceList: [], //所有省集合
      cityList: [], //所有市集合
    };
  },
  created() {
    //初始化表格数据
    this.fetchData();
    //初始化省份信息
    this.getProvinceList();
  },
  methods: {
    //表格数据查询
    fetchData(page = 1) {
      this.page = page;
      hospApi
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.pageModel.content;
          this.total = response.data.pageModel.totalElements;
          this.listLoading = false;
        });
    },
    //查询省份信息
    getProvinceList() {
      dictApi.findByDictCode("Province").then((response) => {
        this.provinceList = response.data.list;
      });
    },
    //二级联动省市信息
    provinceChanged() {
      //清除历史信息
      this.searchObj.cityCode = "";
      this.cityList = [];
      //查询新的二级信息
      dictApi.findChildData(this.searchObj.provinceCode).then((response) => {
        this.cityList = response.data.list;
      });
    },
    //清空
    resetData() {
      this.searchObj = {
        provinceCode: "",
        cityCode: "",
      };
      //初始化表格数据
      this.fetchData();
    },
    //切换每页显示的记录数
    changeSize(size) {
      this.limit = size;
      //初始化表格数据
      this.fetchData();
    },
    updateStatus(id, status) {
      hospApi.updateStatus(id, status).then((response) => {
        this.$message({
              type: "success",
              message: "操作成功!",
            });
        this.fetchData(this.page);
      });
    },
  },
};
</script>
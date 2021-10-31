<template>
  <div id="bar">
    <el-row  type="flex" justify="center">
      <el-col :span="10">
        <div class="grid-content">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" ></el-table-column>
            <el-table-column prop="level" label="挂号级别"></el-table-column>
            <el-table-column prop="fee" label="挂号费用"></el-table-column>
             <el-table-column label="操作">
              <template>
                <el-button size="mini">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

        <el-row >
          <el-col :span="24">
          <div class="grid-content">
          <el-row  type="flex" justify="center">
          

            <el-col :span="8">
              <div>
                <el-form label-width="70px">
                  <el-row>
                    <el-col>
                      <el-form-item label="挂号级别">
                        <el-input type="text" placeholder="请输入挂号级别"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="挂号费">
                        <el-input type="text" placeholder="请输入挂号费用"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col offset="20">
                      <el-button type="primary">&nbsp;&nbsp;更新&nbsp;&nbsp;</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-col>

           
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "bar",
  data() {
    return {
tableData:[
    {
        id:1,
        level:'专家',
        fee:'12'

    }
]

    }
  },
  methods: {}
};
</script>
<style lang="scss">
.el-row {
  margin-bottom: 50px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>

<template>
    <div>
        <el-upload action="string"
                   :multiple="true"
                   :before-upload="beforeupload"
                   :show-file-list="false">
            <el-button size="mini" type="primary" @click="clearUpload">导入</el-button>
        </el-upload>

        <el-button size="mini" type="primary" @click="submitUpload">手动上传</el-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                uploadForm: new FormData(),
            }
        },
        methods: {
//获取文件
            beforeupload(file) {
                console.log(file)
                this.uploadForm.append('file', file);
                console.log(this.uploadForm.get("file"))
                return false;
            },
            clearUpload() {
                this.uploadForm = new FormData();
            },
//手动上传
            submitUpload() {
                console.log(this.uploadForm)
                let data = this.uploadForm;
                let config ={
                    contentType: false
                }
                // this.$axios.post("/od/postImg",this.uploadForm).then((res)=>{
                //
                // })
                this.$axios({
                    url: '/od/postImg',
                    method: "post",
                    data: data,
                    headers:{
                        // 'Content-type': 'multipart/form-data'
                        a:'dijasdfdsa',
                        b:"dfkas"
                    },
                    processData: false,//必写
                    contentType: false,//必写
                    success: function (rs) {
                        if (rs.data.state == '0')
                            MessageBox({title: '提示', message: '导入成功!', type: 'success'});
                        else
                            MessageBox({title: '提示', message: '导入失败!', type: 'error'});
                    }
                });
            }
        }
    }
</script>

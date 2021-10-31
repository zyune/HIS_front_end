<template>
  <el-form :model="registration" label-width="80px" style="margin:20px;" ref="registration" :rules="rules">
    <el-row :gutter="20" :span="20">
      <el-col :span="5">
        <el-form-item
          label="病历号"
          prop="medicalRecord"
        >
          <el-input v-model="registration.medicalRecord" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item
          label="姓名"
          prop="patientName"
        >
          <el-input v-model="registration.patientName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item
          label="性别"
          prop="patientSex"
        >
          <el-radio-group v-model="registration.patientSex">
            <el-radio label="男" >男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item
          label="年龄"
          prop="patientAge"
        >
          <el-input v-model="registration.patientAge">
            <template slot="append">岁</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" :span="20">
      <el-col :span="5">
        <el-form-item label="结算类别">
          <el-input placeholder="自费" :disabled="true"></el-input>
        </el-form-item>
      </el-col>

      <el-form>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="挂号类别/挂号科室/看诊医生"
          >
            <el-cascader v-model="value" @expand-change="expandChange" @change="Change" :options="options"></el-cascader>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="20" :span="20">
      <el-col :span="5">
        <el-form-item label="身份证号" prop="patientCard">
          <el-input v-model="registration.patientCard"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="家庭住址" prop="patientAddress">
          <el-input v-model="registration.patientAddress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item
          label="看诊日期"
          prop="registrationDate"
        >
          <el-date-picker v-model="registration.registrationDate" type="datetime" :disabled="true"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" :span="20">
      <el-col :span="5">
        <el-form-item label="应收金额">
          <el-input v-model="registration.registrationFee" :disabled="true">
            <template slot="append">￥</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10" align="right">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">&nbsp;&nbsp;挂号&nbsp;&nbsp;</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>


<script>
export default {
  data() {
    return {
      rules:{
      patientName: [
            { required: true, message: '请输入病人姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
      patientSex:[
         { required: true, message: '病人性别', trigger: 'change' },
      ],
      patientAge: [
        { required: true, message: '请输入病人年龄', trigger: 'blur' },
        { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur'},
      ],
      patientCard: [
  { required: true, message: '请输入病人身份证号', trigger: 'blur' },
        { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' }
      ],
      patientAddress: [
          { required: true, message: '请输入病人家庭住址', trigger: 'blur' },
      ]
      },
      value: "",
      registrationLevel: 1,
      medicalRecord:'',
      registrationCategorys: [],
      departments: [],
       options: [
         {
          value: 'A1',
          label: '普通号',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'B1',
            label: '拳部门',
            children: [{
              value: 'C1',
              label: '方聪'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        },

         {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, 

        {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }
        ],
      doctors: [],
      registration: {
        patientSex:'男',
           registrationDate:new Date()
      }
    };
  },
  methods: {
// 从后台获取数据
  getProductType(){
    console.log("缴费的骄傲里看到房价肯德基撒可富静安寺")
    console.log(this.options)

      let type = 3;
      let now = new Date();
      let hour = now.getHours() 
      if(hour >= 8 && hour <= 12){
        type = 1;
      } else if (hour > 14 && hour <= 18){
        type = 2
      } 
     this.$fetch("sf/getSchedulingInfoByDay",{day:type})
         .then(res=>{
           console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
            console.log(res)
            let option = []
            let levels =[]
            res.data.forEach(e => {
              let level = {}
              level.value = e[0]
              level.label = e[1]
             
              let departments = []
              e[2].forEach(b => {
                  let department = {}
                  department.value = b[0]
                  department.label = b[1]
                   let doctors = []
                  b[2].forEach(c => {
                      let doctor = {}
                      doctor.value = c[0];
                      doctor.label = c[1];
                      doctor.left = c[2]
                      doctors.push(doctor)
                  })
                 department.children = doctors
                 departments.push(department);

              })
              level.children = departments
              levels.push(level);
            
              let doctors = []
            })


            option.push(levels)
            this.options =option[0];

            console.log(this.options)
        });
   },// 页面加载完成后会执行此方法
 
    


    expandChange(value){
        console.log(value)
    },
    Change(value){
      console.log("change")
        console.log(value)
        console.log("修改后：")
        let ids = []
        value.forEach(e => {
          ids.push(e.substr(1))
        });
      let id = ids[0];
      let level = {}
       this.registrationCategorys.forEach(ke => {
         if(ke.id == id){
           level = ke;
         }
       })
      this.registration.registrationFee =  level.registrationFee
      this.registration.blank2 = ids[0]
      this.registration.outpatientDoctorNo = ids[1]
      this.registration.departmentNo = ids[2];  
    },
    getLevel() {
      this.$fetch("/sf/listRegistrationLevel").then(res => {
        console.log(res);
        this.registrationCategorys = res.data;
      });
    },
   getMedicineRecord(){
     this.$fetch("/sf/generateRegistrationId").then((res) =>{
        this.registration.medicalRecord = res.data;
        this.registration.registrationFee = "0.00"
     })
   },
     onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
  },
    onSubmit() {
      

      this.registration.blank1 = this.registration.registrationFee;


      this.$axios.post("/sf/addRegistration", this.registration).then(res => {
  
        console.log(res);
        this.$message("挂号成功");})

  }
  },
  created() {
    this.getLevel();
    this.getProductType()
    this.getMedicineRecord();
  }
};
</script>

<style>
</style>

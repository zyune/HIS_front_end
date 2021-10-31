<template>
    <el-table  border
              :data="list"
              highlight-current-row  >


        <el-table-column prop="patientFeeDetail.patientName" label="患者姓名">
            <template slot-scope="scope">
                {{scope.row.patientName }}
            </template>
        </el-table-column>
        <el-table-column prop="patientFeeDetail.medicalRecord" label="患者病历号">
            <template slot-scope="scope">
                {{scope.row.medicalRecord }}
            </template>
        </el-table-column>
        <el-table-column prop="patientFeeDetail.registrationFee" label="挂号费用">

            <template slot-scope="scope">
                {{scope.row.registrationFee }}元
            </template>
        </el-table-column>
        <el-table-column prop="patientFeeDetail.medicineFee" label="西药费用">
            <template slot-scope="scope">
                {{scope.row.medicineFee }}元
            </template>
        </el-table-column>
        <el-table-column prop="patientFeeDetail.herbalFee" label="中药费用">
            <template slot-scope="scope">
                {{scope.row.herbalFee }}元
            </template>
        </el-table-column>
        <el-table-column prop="patientFeeDetail.insepctionFee" label="检验费用">

            <template slot-scope="scope">
                {{scope.row.insepctionFee }}元
            </template>

        </el-table-column>
        <el-table-column prop="patientFeeDetail.checkFee" label="检查费用">

            <template slot-scope="scope">
                {{scope.row.checkFee }}元
            </template>

        </el-table-column>
        <el-table-column prop="patientFeeDetail.disposeFee" label="处置费用">

            <template slot-scope="scope">
                {{scope.row.disposeFee }}元
            </template>

        </el-table-column>

        <el-table-column prop="patientFeeDetail.sumPrice" label="金额">
            <template slot-scope="scope">
                {{scope.row.sumPrice }}元
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "",
        data(){
            return{
                list:[]
            }
        },created(){
            let blh = this.$store.getters.getInspectionPatient.medicalRecord
            let patientFeeDetail = {}
            this.$axios.get("/od/getFeeDetailByBLH",{params:{blh:blh}}).then((res) =>{
                patientFeeDetail = res.data.data;
                patientFeeDetail.patientName= this.$store.getters.getInspectionPatient.patientName;
                this.list = [patientFeeDetail]
                console.log(this.list)
            })

        }
    }
</script>

<style scoped>

</style>
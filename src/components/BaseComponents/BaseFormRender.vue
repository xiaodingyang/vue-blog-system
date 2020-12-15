<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-position="left"
           :label-width="labelWidth">
    <el-row>
      <el-col :span="item.span"
              v-for="item in formColumn"
              :key="item.key">
        <el-form-item :label="item.label"
                      :prop="item.key">
          <!-- 文本框 -->
          <el-input :disabled="item.disabled"
                    v-model="form[item.key]"
                    size="mini"
                    placeholder="请输入"
                    :style="`width: ${formWidth}`"
                    v-if="item.type==='input'"></el-input>
          <!-- 下拉列表 -->
          <el-select :disabled="item.disabled"
                     v-model="form[item.key]"
                     clearable
                     placeholder="请选择"
                     size="mini"
                     :style="`width: ${formWidth}`"
                     v-if="item.type==='select'">
            <el-option :label="item.label"
                       :value="item.value"
                       v-for="item in item.options"
                       :key="item.value"></el-option>
          </el-select>
          <!-- 单选框 -->
          <el-radio-group :disabled="item.disabled"
                          v-model="form[item.key]"
                          :style="`width: ${formWidth}`"
                          v-if="item.type==='radio'">
            <el-radio :label="item.value"
                      v-for="item in item.radios"
                      :key="item.value">{{item.label}}</el-radio>
          </el-radio-group>
          <!-- 单选框加文本框 -->
          <span v-if="item.type==='radio,input'">
            <el-radio-group :disabled="item.disabled"
                            v-model="form[item.key]">
              <el-radio :label="item.value"
                        v-for="item in item.radios"
                        :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
            <el-input :disabled="item.disabled"
                      v-model="form[item.key]"
                      size="mini"
                      placeholder="请输入"
                      :style="`width: ${formWidth}`"
                      v-if="item.type==='input'"></el-input>
          </span>
          <el-cascader placeholder="请选择"
                       :style="`width: ${formWidth}`"
                       v-model="form[item.key]"
                       :options="item.options"
                       :props="item.props"
                       clearable
                       size="mini"
                       filterable
                       v-if="item.type==='cas'"></el-cascader>
          <el-date-picker v-model="form[item.key]"
                          :style="`width: ${formWidth}`"
                          type="datetime"
                          placeholder="选择日期时间"
                          size="mini"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          v-if="item.type==='datetime'">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: {
    //   数据绑定项
    form: {
      type: Object,
      required: true,
      default: () => { }
    },
    // 表单渲染项
    formColumn: {
      type: Array,
      required: true,
      default: () => []
    },
    // 规则项
    rules: {
      type: Array,
      default: () => { }
    },
    // label 宽度
    labelWidth: {
      type: String,
      default: "150px"
    },
    // form 宽度
    formWidth: {
      type: String,
      default: ""
    },
    // form 宽度
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    };
  },
  methods: {

  },
  created () {

  },
  components: {}
};
</script>

<style scoped lang="less"></style>

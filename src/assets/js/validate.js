/**
 * Created by Jing on 2017/7/25.
 */
import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from '../../../node_modules/vee-validate/dist/locale/zh_CN';
// 配置中文
Validator.addLocale(zh);

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate,config);

// 自定义validate
const dictionary = {
    zh_CN: {
      messages: {
           email: () => '请输入正确的邮箱格式',
        required: ( field )=> "请输入" + field
      },
      attributes:{
        email:'邮箱',
        password:'密码',
        name: '账号',
        phone: '手机',
    adminPhone: '手机号码',
    landline: '座机',
    operationNo: '营业执照号',
    companyName: '公司名称',
    storeName: '公司名称',
    legalPerson: '法人代表姓名',
    IdentityCodeValid: '身份证',
    registeredCapital: '注册资本',
    dateTime: '营业时间',
    establishTime: '注册日期',
    names: '负责人姓名',
    ContractNumber: '合同编号',
    aliasName: '门店别称',
    lateRate: '滞纳金比例',
    VipService: '服务单结算比例',
    isZip: '邮政编码',
    orgAddress: '详细地址',
    address: '地址',
        fax: '传真'
      }
    }
}

Validator.updateDictionary(dictionary);
//手机
Validator.extend('phone', {
    messages: {
      zh_CN:field => field + '必须是11位手机号码',
    },
    validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});
//邮编
Validator.extend('isZip', {
    messages: {
      zh_CN:field => field +'格式不正确'
  },
  validate: value => {
  return /^[1-9][0-9]{5}$/.test(value);
}
});
//企鹅账号
Validator.extend('qq', {
    messages: {
      zh_CN:field => 'qq号码输入不正确'
  },
  validate: value => {
  return /^[1-9][0-9]{4,14}$/.test(value);
}
});
//传真号码
Validator.extend('fax', {
    messages: {
      zh_CN:field => field + '号码输入不正确'
  },
  validate: value => {
  return /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);
}
});
//座机号码
Validator.extend('landline', {
    messages: {
      zh_CN:field => field + '号码输入不正确'
  },
  validate: value => {
  return /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);
}
});
// 营业执照号

Validator.extend('operationNo', {
    messages: {
      zh_CN:field => field + '号码输入不正确'
  },
  validate: value => {
  return /(^[a-zA-Z0-9]{18}$)|(^[a-zA-Z0-9]{15}$)|(^[a-zA-Z0-9]{13}$)/.test(value);
}
});
//法人姓名
Validator.extend('onlyName', {
    messages: {
      zh_CN:field => field + '不正确'
  },
  validate: value => {
  return /^[A-Za-z\u4e00-\u9fa5]+$/.test(value);
}
});
//身份证
Validator.extend('IdentityCodeValid', {
    messages: {
      zh_CN:field => field + '格式不正确'
  },
  validate: value => {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value);
}
});
//整数
Validator.extend('onlyInt', {
    messages: {
      zh_CN:field => field + '格式不正确'
  },
  validate: value => {
  return /^[0-9]*$/.test(value);
}
});
//合同编号
Validator.extend('isNumber', {
    messages: {
      zh_CN:field => field + '格式不正确'
  },
  validate: value => {
  return /^\d{16,18}$/.test(value);
}
});
//只能输入数字和两位小数
Validator.extend('onlyDecimals', {
    messages: {
      zh_CN:field => field + '格式不正确'
  },
  validate: value => {
  return /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
}
});






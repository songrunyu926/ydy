import Vue from 'vue'
import { 
  Button,
  Tabs,
  TabPane,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Icon,
  Backtop,
  Pagination,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  TimePicker,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Col,
  Row,
  Upload,
  Table,
  TableColumn,
  Loading,
  MessageBox,
  Message,
  Notification,
  Divider,
  Switch,
  InputNumber
 } from 'element-ui'

Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Icon)
Vue.use(Backtop)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(TimePicker)
Vue.use(CheckboxGroup)
Vue.use(DatePicker)
Vue.use(Checkbox)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Col)
Vue.use(Row)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive)
Vue.use(Divider)
Vue.use(Switch)
Vue.use(InputNumber)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;



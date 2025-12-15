import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import Tooltip from 'primevue/tooltip'
import Ripple from 'primevue/ripple'

import App from './App.vue'
import router from './router'

// PrimeVue Components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Sidebar from 'primevue/sidebar'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Tag from 'primevue/tag'
import ProgressBar from 'primevue/progressbar'
import Chart from 'primevue/chart'
import Timeline from 'primevue/timeline'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Image from 'primevue/image'
import Galleria from 'primevue/galleria'
import Steps from 'primevue/steps'
import Breadcrumb from 'primevue/breadcrumb'
import Panel from 'primevue/panel'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import Skeleton from 'primevue/skeleton'
import OverlayPanel from 'primevue/overlaypanel'
import InputMask from 'primevue/inputmask'
import InputSwitch from 'primevue/inputswitch'
import SelectButton from 'primevue/selectbutton'
import Knob from 'primevue/knob'
import Slider from 'primevue/slider'
import TreeTable from 'primevue/treetable'
import Tree from 'primevue/tree'
import Editor from 'primevue/editor'
import Message from 'primevue/message'
import InlineMessage from 'primevue/inlinemessage'
import Password from 'primevue/password'
import SplitButton from 'primevue/splitbutton'
import SpeedDial from 'primevue/speeddial'
import PickList from 'primevue/picklist'
import OrderList from 'primevue/orderlist'
import DataView from 'primevue/dataview'
import Paginator from 'primevue/paginator'
import ToggleButton from 'primevue/togglebutton'
import ContextMenu from 'primevue/contextmenu'

// Styles
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(ConfirmationService)
app.use(DialogService)

// Directives
app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)

// Components
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('Calendar', Calendar)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Dialog', Dialog)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Card', Card)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('Sidebar', Sidebar)
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('Tag', Tag)
app.component('ProgressBar', ProgressBar)
app.component('Chart', Chart)
app.component('Timeline', Timeline)
app.component('Textarea', Textarea)
app.component('Checkbox', Checkbox)
app.component('RadioButton', RadioButton)
app.component('MultiSelect', MultiSelect)
app.component('FileUpload', FileUpload)
app.component('Image', Image)
app.component('Galleria', Galleria)
app.component('Steps', Steps)
app.component('Breadcrumb', Breadcrumb)
app.component('Panel', Panel)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Chip', Chip)
app.component('Divider', Divider)
app.component('Skeleton', Skeleton)
app.component('OverlayPanel', OverlayPanel)
app.component('InputMask', InputMask)
app.component('InputSwitch', InputSwitch)
app.component('SelectButton', SelectButton)
app.component('Knob', Knob)
app.component('Slider', Slider)
app.component('TreeTable', TreeTable)
app.component('Tree', Tree)
app.component('Editor', Editor)
app.component('Message', Message)
app.component('InlineMessage', InlineMessage)
app.component('Password', Password)
app.component('SplitButton', SplitButton)
app.component('SpeedDial', SpeedDial)
app.component('PickList', PickList)
app.component('OrderList', OrderList)
app.component('DataView', DataView)
app.component('Paginator', Paginator)
app.component('ToggleButton', ToggleButton)
app.component('ContextMenu', ContextMenu)

app.mount('#app')


import Vue from 'vue'
import Resource from 'vue-resource'
import Alert from 'vue-strap/src/alert'
import Util from '../../util/util'

Vue.use(Resource)

var company = ''
var user = ''
var document_base = 'specialist'

var linkST = Util.getUrlServerDB() + 'module/specialist/'
var linkTI = Util.getUrlServerDB() + 'master/types_identification/'
var linkRF = Util.getUrlServerDB() + 'master/required_fields/'
var linkSP = Util.getUrlServerDB() + 'master/specialtys/'
var linkFF = Util.getUrlServerDB() + 'master/format_fields/'

var jsonDocumentRF = null
var jsonDocumentFF = null

export default {
  props: ['appSpecialist'], 
  data () {
    return {
      id: '',
      specialist: {
        company : '',
        type_identification: '',
        dni: '',
        first_name: '',
        last_name: '',
        specialty: '',
        address: '',
        email: '',
        cell_phone: '',
        home_phone: '',
        office_phone: '',
        state: true,
        state_record: 'Activo',
        registration_date: new Date()
      },
      listSearch: [
        { "value": "dni", "text": "Identificación" },
        { "value": "first_name", "text": "Nombres" },
        { "value": "last_name", "text": "Apellidos" }
      ],      
      listType: [],
      listSpecialty: [],
      showList: true,
      listData: null,
      state: '',
      searchKey: '',
      messageError: null,
      showTab_1: true,
      showTab_2: false,
      searchFor: '',
      textSearch: '',
      type_alert: 'danger'  
    }
  },
  methods: {
    isFormValid: function () {
      this.messageError = Util.validRequiredFields(this.specialist, jsonDocumentRF)
      setTimeout(this.clearMessageError, 2500)

      return this.messageError == null
    },
    clearMessageError: function () {
      this.messageError = null
    },
    addRecord: function () {
      Util.clearForm(this.specialist)

      this.specialist.company = company
      this.specialist.state_record = 'Activo'
      this.state = 'Insert'
      this.showList = false
      this.showTab(1)
    },
    showTab: function (index) {
      this.showTab_1 = false
      this.showTab_2 = false

      if (index == 1) this.showTab_1 = true
      if (index == 2) this.showTab_2 = true
    },
    saveChange: function () {
      if (!this.isFormValid()) return

      Util.formatFields(this.specialist, jsonDocumentFF)

      if (this.state == 'Edit') {
        var jsonUpdate = Util.createDynamicJson(this.specialist)

        this.$http.put(
          linkST + this.id,
          jsonUpdate
        ).then(response => {
          this.getRecords()
        })
      } else if (this.state == 'Insert') {
        var urlValid = linkST + company + '/' + this.specialist.type_identification + '/' + this.specialist.dni

        this.$http.get(urlValid).then(function (response) {
          if (response.data) {
            this.messageError = 'Ya existe un especialista con esa identificación'
          } else {
            this.$http.post(linkST, this.specialist).then(response => {
                this.getRecords()
            })
          }
        }, function (error) {
          console.log(error.statusText)
        })
      }
    },
    getPeople: function () {
      var value = this.textSearch.toUpperCase()
      var url = linkST + 'filter/' + company + '/' + this.searchFor + '/' + value

      this.listData = null

      this.$http.get(url).then(function (response) {
        if (response.data) {
          this.listData = response.data
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },    
    deleteRecord: function (id) {
      this.$http.delete(linkST + id).then(function (response) {
        this.getRecords()
        this.state = '';
      }, function (error) {
        console.log(error.statusText);
      })
    },
    deleteLogicRecord: function (id) {
      this.$http.put(linkST + 'delete/' + id, {state_record: 'Eliminado'}).then(function (response) {
        this.getRecords()
        this.state = '';
      }, function (error) {
        console.log(error.statusText);
      })
    },
    loadRecord: function (id) {
      this.$http.get(linkST + id).then(function (response) {
        this.id = id
        this.specialist = response.data

        this.state = 'Edit'
        this.showList = false
        this.showTab(1)
      }, function (error) {
        console.log(error.statusText)
      })
    },
    getRecords: function () {
      this.$http.get(linkST + 'company/' + company).then(function (response) {
        if (response.data) {
          this.listData = response.data
          this.showList = true
          this.messageError = null
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    getTypes: function () {
      this.$http.get(linkTI).then(function (response) {
        if (response.data) {
          this.listType = Util.filterCompany(response.data, company)
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    getRequiredFields: function () {
      this.$http.get(linkRF).then(function (response) {
        if (response.data) {
          jsonDocumentRF = Util.filterDocument(response.data, company, document_base)
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    getFormatFields: function () {
      this.$http.get(linkFF).then(function (response) {
        if (response.data) {
          jsonDocumentFF = Util.filterDocument(response.data, company, document_base)
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    getSpecialty: function () {
      this.$http.get(linkSP).then(function (response) {
        if (response.data) {
          this.listSpecialty = Util.filterCompany(response.data, company)
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    getSession: function () {
      if (this.$session.exists()) {
        company = this.$session.get('company')
        user = this.$session.get('user')
      } else {
        console.log('No existe sesion')
        this.$router.push('/')
      }
    },
    logOut: function () {
      this.$session.destroy()
      this.$router.push('/')
    }
  },
  mounted: function () {
    this.getSession()
    this.getTypes()
    this.getRequiredFields()
    this.getFormatFields()
    this.getSpecialty()
    this.getRecords()
  },
  components: {
    Alert
  }   
}

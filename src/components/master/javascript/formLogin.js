import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import Alert from 'vue-strap/src/alert'
import Util from '../../util/util'

Vue.use(Resource)
Vue.use(Router)

var company = ''
var document_base = 'login'
var crypto = require('crypto')

var linkUS = Util.getUrlServerDB() + 'master/users/'
var linkRF = Util.getUrlServerDB() + 'master/required_fields/'
var linkCI = Util.getUrlServerDB() + 'master/clinic/'

var jsonDocumentRF = null

export default {
  props: ['appLogin'],
  data () {
    return {
      id: '',
      listClinic: null,
      login: {
        company : '',
        user: '',
        password: ''
      },
      messageTitle: '',
      messageError: null,
      type_alert: 'danger'
    }
  },
  methods: {
    isFormValid: function () {
      this.showMessageBox('warning', Util.validRequiredFields(this.login, jsonDocumentRF))

      return this.messageError == null
    },
    clearMessageError: function () {
      this.messageError = null
    },
    showMessageBox: function (type, message) {
      this.type_alert = type
      this.messageError = message

      if (type === 'danger') {
        this.messageTitle = 'Opss!'
      }
      if (type === 'success') {
        this.messageTitle = 'Bien hecho!'
      }
      if (type === 'info') {
        this.messageTitle = 'Bien hecho!'
      }
      if (type === 'warning') {
        this.messageTitle = 'Opss!'
      }

      setTimeout(this.clearMessageError, 2500)
    },
    logIn: function () {
      if (!this.isFormValid()) return

      var lPassword = crypto.createHash('md5').update(this.login.password).digest("hex")

      var jsonFilter = {}
      jsonFilter['company'] = this.login.company
      jsonFilter['user'] = this.login.user
      jsonFilter['password'] = lPassword

      // Validamos
      this.$http.put(linkUS + 'filter', jsonFilter).then(function (response) {
        if (response.data) {
          this.$session.start()
          this.$session.set('company', this.login.company)
          this.$session.set('user', this.login.user)
          this.$router.push('/master/menu')
        } else {
          this.showMessageBox('danger', 'Usuario invalido, por favor verifique!')
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
    getClinic: function () {
      this.$http.get(linkCI).then(function (response) {
        if (response.data) {
          this.listClinic = response.data
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
  },
  mounted: function () {
    this.getClinic()
    this.getRequiredFields()
  },
  components: {
    Alert
  }
}

import Vue from 'vue'
import Resource from 'vue-resource'
import Datepicker from 'vuejs-datepicker'
import Alert from 'vue-strap/src/alert'
import Util from '../../util/util'

Vue.use(Resource)

var company = ''
var user = ''
var document_base = 'quotes'

var linkQU = Util.getUrlServerDB() + 'module/quotes/'
var linkPA = Util.getUrlServerDB() + 'module/patients/'
var linkSP = Util.getUrlServerDB() + 'module/specialist/'

var linkRF = Util.getUrlServerDB() + 'master/required_fields/'

var jsonDocumentRF = null

export default {
  props: ['appQuotes'],
  data () {
    return {
      id: '',
      quotes: {
        company : '',
        id_patient: '',
        id_specialist: '',
        date_quotes: new Date(),
        hour_quotes: '',
        note: '',
        state_quotes: 'Activa',
        registration_date: new Date()
      },
      filterSearchQuotes: {
        people : '',
        field: '',
        textSearch: '',
        beginDate: new Date(),
        endDate: new Date(),
        state: ''
      },
      showList: true,    
      listData: null,
      state: '',
      messageError: null,
      listSearch: [
        { "value": "dni", "text": "Identificación" },
        { "value": "first_name", "text": "Nombres" },
        { "value": "last_name", "text": "Apellidos" }
      ],
      listPeople: [
        { "value": "patients", "text": "Paciente" },
        { "value": "specialist", "text": "Especialista" }
      ],
      listState: [
        { "value": "Activa", "text": "Activa" },
        { "value": "Efectiva", "text": "Efectiva" },
        { "value": "Cancelada", "text": "Cancelada" }
      ],
      searchForPatient: '',
      textSearchPatient: '',
      showPacient: false,
      listPacient: null,
      textChoosePatient: null,
      searchForSpecialist: '',
      textSearchSpecialist: '',
      showSpecialist: false,
      listSpecialist: null,
      textChooseSpecialist: null,
      listPeopleFilter: null,
      type_alert: 'danger'
    }
  },
  methods: {
    isFormValid: function () {
      this.messageError = Util.validRequiredFields(this.quotes, jsonDocumentRF)
      this.showModalMessage = this.messageError !== null
      setTimeout(this.clearMessageError, 2500)

      return this.messageError == null
    },
    isValidFilter: function () {
      this.messageError = Util.validFilterFields(this.filterSearchQuotes)
      setTimeout(this.clearMessageError, 2500)

      return this.messageError == null
    },
    clearMessageError: function () {
      this.messageError = null
    },
    addRecord: function () {
      Util.clearForm(this.quotes)

      this.quotes.company = company
      this.quotes.state_quotes = 'Activa'
      this.state = 'Insert'
      this.showList = false
      this.showPacient = false
    },
    showModelPacient: function () {
      this.showPacient = true
      this.searchForPatient = ''
      this.textSearchPatient = ''
      this.listPacient = null
    },
    showModelSpecialist: function () {
      this.showSpecialist = true
      this.searchForSpecialist = ''
      this.textSearchSpecialist = ''
      this.listSpecialist = null
    },
    choosePacient: function (jsonPacient) {
      if (jsonPacient) {
        this.quotes.id_patient = jsonPacient._id
        this.textChoosePatient = jsonPacient.type_identification + jsonPacient.dni + ' - ' + jsonPacient.last_name + ' ' + jsonPacient.first_name
      }
      this.showPacient = false
    },
    chooseSpecialist: function (jsonSpecialist) {
      if (jsonSpecialist) {
        this.quotes.id_specialist = jsonSpecialist._id
        this.textChooseSpecialist = jsonSpecialist.type_identification + jsonSpecialist.dni + ' - ' + jsonSpecialist.last_name + ' ' + jsonSpecialist.first_name
      }
      this.showSpecialist = false
    },
    removePacient: function () {
      this.quotes.id_patient = ''
      this.textChoosePatient = null
      this.showPacient = false
    },
    removeSpecialist: function () {
      this.quotes.id_specialist = ''
      this.textChooseSpecialist = null
      this.showSpecialist = false
    },
    showSearchQuotes: function () {
      this.listData = null
      this.showList = true
      this.messageError = null
      Util.clearForm(this.filterSearchQuotes)
    },   
    saveChange: function () {
      if (!this.isFormValid()) return

      if (this.state == 'Insert') {
        var urlValid = linkQU + company + '/' + this.quotes.id_patient + '/' + this.quotes.dni

        this.$http.get(urlValid).then(function (response) {
          if (response.data) {
            this.messageError = 'Ya existe un especialista con esa identificación'
          } else {
            this.$http.post(linkQU, this.quotes).then(response => {
                this.showSearchQuotes()
            })
          }
        }, function (error) {
          console.log(error.statusText)
        })
      }
    },
    deleteRecord: function (id) {
      this.$http.delete(linkQU + id).then(function (response) {
        this.state = '';
      }, function (error) {
        console.log(error.statusText);
      })
    },
    deleteLogicRecord: function (id) {
      this.$http.put(linkQU + 'delete/' + id, {state_quotes: 'Cancelada'}).then(function (response) {
        this.getQuotes()
        this.state = '';
      }, function (error) {
        console.log(error.statusText);
      })
    },
    getQuotes: function () {
      this.listPeopleFilter = null
      this.listData = null
      if (!this.isValidFilter()) return

      var url = ''

      var search = this.filterSearchQuotes.field
      var value = this.filterSearchQuotes.textSearch.toUpperCase()

      if (this.filterSearchQuotes.people === 'patients') {
        url = linkPA + 'filter/' + company + '/' + search + '/' + value
      }
      if (this.filterSearchQuotes.people === 'specialist') {
        url = linkSP + 'filter/' + company + '/' + search + '/' + value
      }

      // Se busca primero las personas
      this.$http.get(url).then(function (response) {
        if (response.data) {
          this.listPeopleFilter = response.data
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    filterQuotes: function (id) {
      var jsonFilter = {}
      jsonFilter['company'] = company
      jsonFilter['state_quotes'] = this.filterSearchQuotes.state
      jsonFilter['date_quotes'] = {'$gte' : this.filterSearchQuotes.beginDate, '$lte' : this.filterSearchQuotes.endDate}

      if (this.filterSearchQuotes.people === 'patients') {
        jsonFilter['id_patient'] = id
      }
      if (this.filterSearchQuotes.people === 'specialist') {
        jsonFilter['id_specialist'] = id
      }

      // Buscamos las citas
      this.$http.put(linkQU + 'filter', jsonFilter).then(function (response) {
        if (response.data) {
          this.listData = response.data
        }
      }, function (error) {
        console.log(error.statusText)
      })     
    },
    getPeople: function (people, search, value) {
      var url = ''
      this.listPacient = null
      this.listSpecialist = null
      value = value.toUpperCase()

      if (people === 'patients') {
        url = linkPA + 'filter/' + company + '/' + search + '/' + value
      }
      if (people === 'specialist') {
        url = linkSP + 'filter/' + company + '/' + search + '/' + value
      }

      this.$http.get(url).then(function (response) {
        if (response.data) {
          if (people === 'patients') {
            this.listPacient = response.data
          }
          if (people === 'specialist') {
            this.listSpecialist = response.data
          }
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
    getSession: function () {
      if (this.$session.exists()){
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
    this.getRequiredFields()
  },
  components: {
    Datepicker,
    Alert
  }
}

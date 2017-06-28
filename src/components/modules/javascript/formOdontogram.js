import Vue from 'vue'
import Resource from 'vue-resource'
import Alert from 'vue-strap/src/alert'

import Util from '../../util/util'

Vue.use(Resource)

var company = ''
var id_patient = ''
var user = ''
var document_base = 'odontogram'

var linkPA = Util.getUrlServerDB() + 'module/patients/'
var linkOD = Util.getUrlServerDB() + 'module/odontogram/'
var linkOP = Util.getUrlServerDB() + 'master/odontogram_param/'
var linkRF = Util.getUrlServerDB() + 'master/required_fields/'

var jsonDocumentRF = null

export default {
  props: ['appOdontogram'], 
  data () {
    return {
      id: '',
      idPatientSession: false,
      showQuadrantAll: false,
      showQuadrant_1: true,
      showQuadrant_2: false,
      showQuadrant_3: false,
      showQuadrant_4: false,
      code: '',
      type: 'color',
      value_sel: '',
      listOdontogramParam: [],
      selOdontogramParam: {
        code: '',
        type: '',
        color: '',
        img: '',
        name: ''
      },
      listCuadrante_1: {
        "row_1": [],
        "row_2": []
      },
      listCuadrante_2: {
        "row_1": [],
        "row_2": []
      },
      listCuadrante_3: {
        "row_1": [],
        "row_2": []
      },
      listCuadrante_4: {
        "row_1": [],
        "row_2": []
      },
      odontogram: {
        company : '',
        id_patient: '',
        graph: [],
        modify: []
      },
      state: 'Insert',
      messageTitle: '',
      messageError: null,
      type_alert: 'success',
      searchForPatient: '',
      textSearchPatient: '',
      showPacient: false,
      listPacient: null,
      textChoosePatient: null,
      listSearch: [
        { "value": "dni", "text": "Identificación" },
        { "value": "first_name", "text": "Nombres" },
        { "value": "last_name", "text": "Apellidos" }
      ]      
    }
  },
  methods: {
    showModelPacient: function () {
      this.showPacient = true
      this.searchForPatient = ''
      this.textSearchPatient = ''
      this.listPacient = null
    },
    getPeople: function (search, value) {
      var url = ''
      this.listPacient = null
      value = value.toUpperCase()

      url = linkPA + 'filter/' + company + '/' + search + '/' + value

      this.$http.get(url).then(function (response) {
        if (response.data) {
          this.listPacient = response.data
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    choosePacient: function (jsonPacient) {
      Util.clearForm(this.odontogram)

      if (jsonPacient) {
        this.odontogram.id_patient = jsonPacient._id
        id_patient = this.odontogram.id_patient
        this.textChoosePatient = jsonPacient.type_identification + 
                                 jsonPacient.dni + ' - ' + 
                                 jsonPacient.last_name + ' ' + 
                                 jsonPacient.first_name
        this.loadOdontogram()
        this.showQuadrantAll = true
      }
      this.showPacient = false
    },
    removePacient: function () {
      id_patient = ''
      this.odontogram.id_patient = ''
      this.textChoosePatient = null
      this.showPacient = false
      this.showQuadrantAll = false
    },
    initQuadrants: function () {
      var index = 0
      var indey = 0
      var lLabel = ''
      var lGraph = {}

      this.listCuadrante_1.row_1 = []
      this.listCuadrante_1.row_2 = []
      this.listCuadrante_2.row_1 = []
      this.listCuadrante_2.row_2 = []
      this.listCuadrante_3.row_1 = []
      this.listCuadrante_3.row_2 = []
      this.listCuadrante_4.row_1 = []
      this.listCuadrante_4.row_2 = []

      // Cuadrante 1
      for (index = 18; index >= 11; index--) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_1['row_1'].push({'value': lLabel, 'graph': lGraph})
      }
      for (index = 55; index >= 51; index--) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_1['row_2'].push({'value': lLabel, 'graph': lGraph})
      }
      // Cuadrante 2
      for (index = 21; index <= 28; index++) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_2['row_1'].push({'value': lLabel, 'graph': lGraph})
      }
      for (index = 61; index <= 65; index++) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_2['row_2'].push({'value': lLabel, 'graph': lGraph})
      }
      // Cuadrante 3
      for (index = 71; index <= 75; index++) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_3['row_1'].push({'value': lLabel, 'graph': lGraph})
      }
      for (index = 31; index <= 38; index++) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_3['row_2'].push({'value': lLabel, 'graph': lGraph})
      }
      // Cuadrante 4
      for (index = 85; index >= 81; index--) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_4['row_1'].push({'value': lLabel, 'graph': lGraph})
      }
      for (index = 48; index >= 41; index--) {
        lLabel = '' + index
        lGraph = {}
        for (indey in this.odontogram.graph) {
          if (this.odontogram.graph[indey].label === lLabel) {
            lGraph = this.odontogram.graph[indey]
          }
        }
        lGraph['lparam'] = this.listOdontogramParam
        this.listCuadrante_4['row_2'].push({'value': lLabel, 'graph': lGraph})
      }
    },
    showQuadrant: function (index) {
      this.showQuadrant_1 = false
      this.showQuadrant_2 = false
      this.showQuadrant_3 = false
      this.showQuadrant_4 = false

      if (index == 1) this.showQuadrant_1 = true
      if (index == 2) this.showQuadrant_2 = true
      if (index == 3) this.showQuadrant_3 = true
      if (index == 4) this.showQuadrant_4 = true
    },
    isFormValid: function () {
      this.showMessageBox('warning', Util.validRequiredFields(this.odontogram, jsonDocumentRF))

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
    setColorOP: function (color) {
      return 'background-color: ' + color
    },
    getOdontogramParam: function () {
      this.$http.get(linkOP).then(function (response) {
        if (response.data) {
          this.listOdontogramParam = Util.filterCompany(response.data, company)
          if (this.idPatientSession) {
            this.loadOdontogram()
          }
        }
      }, function (error) {
        console.log(error.statusText)
      })
    },
    setSymbol: function (object) {
      this.code = object.code
      this.type = object.type
      this.selOdontogramParam = object

      if (object.color) {
        this.value_sel = object.color
      }
      if (object.img) {
        this.value_sel = object.img
      }
    },
    generateGraph: function () {
      var lGraph = []
      var index = 0
      var jsonData = null

      // Cuadrante 1
      for (index in this.listCuadrante_1.row_1) {
        jsonData = this.listCuadrante_1.row_1[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }
      for (index in this.listCuadrante_1.row_2) {
        jsonData = this.listCuadrante_1.row_2[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }
      // Cuadrante 2
      for (index in this.listCuadrante_2.row_1) {
        jsonData = this.listCuadrante_2.row_1[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }
      for (index in this.listCuadrante_2.row_2) {
        jsonData = this.listCuadrante_2.row_2[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }
      // Cuadrante 3
      for (index in this.listCuadrante_3.row_1) {
        jsonData = this.listCuadrante_3.row_1[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }
      for (index in this.listCuadrante_3.row_2) {
        jsonData = this.listCuadrante_3.row_2[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }
      // Cuadrante 4
      for (index in this.listCuadrante_4.row_1) {
        jsonData = this.listCuadrante_4.row_1[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }
      for (index in this.listCuadrante_4.row_2) {
        jsonData = this.listCuadrante_4.row_2[index]

        if (jsonData.graph.code) {
          if (jsonData.graph.code !== '') {
            lGraph.push(jsonData.graph)
          }
        }
      }

      this.odontogram.company = company
      this.odontogram.id_patient = id_patient
      this.odontogram.graph = lGraph
      this.odontogram.modify.push({'user': user, 'record_date': new Date()})
    },
    saveChange: function () {
      if (!this.isFormValid()) return

      this.generateGraph()

      if (this.state === 'Edit') {
        this.$http.put(
          linkOD + this.id,
          this.odontogram
        ).then(response => {
          this.messageError = 'La actualización se realizó con éxito!'
          setTimeout(this.clearMessageError, 2500)
          this.loadOdontogram()
        })
      } else if (this.state === 'Insert') {
        this.$http.post(linkOD, this.odontogram).then(response => {
          this.messageError = 'El guardado se realizó con éxito!'
          setTimeout(this.clearMessageError, 2500)
          this.loadOdontogram()
        })
      }
    },
    loadOdontogram: function () {
      this.state = 'Insert'

      this.$http.get(linkOD + company + '/' + id_patient).then(function (response) {
        if (response.data) {
          this.id = response.data._id
          this.odontogram = response.data
          delete this.odontogram['_id']
          this.state = 'Edit'
          this.initQuadrants()
        } else {
          this.initQuadrants()
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
      if (this.$session.exists()) {
        company = this.$session.get('company')
        user = this.$session.get('user')
        id_patient = this.$session.get('id_patient')
        if (id_patient) {
          this.idPatientSession = true
          this.showQuadrantAll = true
        }
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
    this.getOdontogramParam()
  },
  components: {
    Alert
  }  
}

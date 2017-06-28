// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSession from 'vue-session'

require('../node_modules/bootstrap/less/bootstrap.less')

Vue.config.productionTip = false

Vue.use(require('vue-moment'))
Vue.use(VueSession)

Vue.component('control-hour', {
  template: '<div class="form-control">' +
            '<select v-on:change="updateHour()" v-model="item_hour" style="width: 60px;"><option v-for="ihour in listHour" v-bind:value="ihour.value">{{ ihour.value }}</option></select>' +
            ' : <select v-on:change="updateHour()" v-model="item_minute" style="width: 60px;"><option v-for="iminutes in listMinutes" v-bind:value="iminutes.value">{{ iminutes.value }}</option></select>' +
            ' : <select v-on:change="updateHour()" v-model="item_meridian" style="width: 60px;"><option v-for="imeridian in listMeridian" v-bind:value="imeridian.value">{{ imeridian.value }}</option></select>' +
            '&nbsp;&nbsp;<label v-show="showMessage">Hora invalida</label>' +
            '</div>',
  data: function () {
    return {
      hour_full: '',
      item_hour: '',
      item_minute: '',
      item_meridian: '',
      listHour: [
        { 'value': '01' },
        { 'value': '02' },
        { 'value': '03' },
        { 'value': '04' },
        { 'value': '05' },
        { 'value': '06' },
        { 'value': '07' },
        { 'value': '08' },
        { 'value': '09' },
        { 'value': '10' },
        { 'value': '11' },
        { 'value': '12' }
      ],
      listMinutes: [],
      listMeridian: [
        { 'value': 'AM' },
        { 'value': 'PM' }
      ],
      showMessage: false
    }
  },
  props: ['range', 'value'],
  methods: {
    initMinutes: function () {
      var accumulator = 0
      var minuteText = ''
      this.listMinutes = []

      if (this.range === null) {
        this.range = '1'
      }

      for (var index = 0; index < 60; index++) {
        minuteText = '' + accumulator

        if (minuteText.length === 1) {
          minuteText = '0' + minuteText
        }

        this.listMinutes.push({'value': minuteText})

        accumulator += parseInt(this.range)

        if (accumulator >= 60) {
          break
        }
      }
    },
    updateHour: function () {
      this.hour_full = this.item_hour + ':' + this.item_minute + ' ' + this.item_meridian
      this.$emit('update:value', this.hour_full)
      this.validHour()
    },
    validHour: function () {
      if (this.hour_full.length < 8) {
        this.showMessage = true
      } else {
        this.showMessage = false
      }
    }
  },
  mounted: function () {
    this.initMinutes()
  }
})

Vue.component('control-tooth', {
  template: '<div>' +
            '<table border="1" style="width: 50px; border-style: solid; border-collapse: separate; border-spacing:1px;">' +
            '<tr>' +
            '<td colspan="3" align="center">{{label}}</td>' +
            '</tr>' +
            '</table>' +
            '<table v-if="this.lType == \'color\'" border="1" style="width: 50px; border-style: solid; border-collapse: separate; border-spacing:1px;">' +
            '<tr>' +
            '<td :style="color_up" @click.prevent="updateSimbol(\'Up\')" colspan="3">&nbsp;</td>' +
            '</tr>' +
            '<tr>' +
            '<td :style="color_left" @click.prevent="updateSimbol(\'Left\')">&nbsp;</td>' +
            '<td :style="color_center" @click.prevent="updateSimbol(\'Center\')">&nbsp;</td>' +
            '<td :style="color_right" @click.prevent="updateSimbol(\'Right\')">&nbsp;</td>' +
            '</tr>' +
            '<tr>' +
            '<td :style="color_down" @click.prevent="updateSimbol(\'Down\')" colspan="3">&nbsp;</td>' +
            '</tr>' +
            '</table>' +
            '<table v-if="this.lType == \'symbol\'" style="border-collapse: separate; border-spacing:5px;">' +
            '<tr>' +
            '<td>' +
            '<a href="javascript:;" @click.prevent="updateSimbol(\'Symbol\')">' +
            '<img :src="this.img_sel" style="height: 50px; width: 45px">' +
            '</a>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</div>',
  data: function () {
    return {
      color_up: 'background-color:',
      color_down: 'background-color:',
      color_left: 'background-color:',
      color_right: 'background-color:',
      color_center: 'background-color:',
      check_up: false,
      check_down: false,
      check_left: false,
      check_right: false,
      check_center: false,
      check_symbol: false,
      img_sel: '',
      lType: 'color',
      graph: {
        label: '',
        code: '',
        type: '',
        vestibular: {code: '', check: false},
        palatina_lingual: {code: '', check: false},
        mesial: {code: '', check: false},
        distal: {code: '', check: false},
        oclusal: {code: '', check: false}
      }
    }
  },
  props: ['label', 'type', 'value', 'code', 'gvalue'],
  watch: {
    gvalue: function () {
      this.initSimbol()
    }
  },
  methods: {
    updateSimbol: function (pType) {
      this.lType = this.type
      if (this.type === 'color' && pType === 'Up') {
        if (!this.check_up) {
          this.color_up = 'background-color: ' + this.value
        } else {
          this.color_up = 'background-color:'
        }
        this.check_up = !this.check_up
      }
      if (this.type === 'color' && pType === 'Down') {
        if (!this.check_down) {
          this.color_down = 'background-color: ' + this.value
        } else {
          this.color_down = 'background-color:'
        }
        this.check_down = !this.check_down
      }
      if (this.type === 'color' && pType === 'Left') {
        if (!this.check_left) {
          this.color_left = 'background-color: ' + this.value
        } else {
          this.color_left = 'background-color:'
        }
        this.check_left = !this.check_left
      }
      if (this.type === 'color' && pType === 'Right') {
        if (!this.check_right) {
          this.color_right = 'background-color: ' + this.value
        } else {
          this.color_right = 'background-color:'
        }
        this.check_right = !this.check_right
      }
      if (this.type === 'color' && pType === 'Center') {
        if (!this.check_center) {
          this.color_center = 'background-color: ' + this.value
        } else {
          this.color_center = 'background-color:'
        }
        this.check_center = !this.check_center
      }
      if (this.type === 'symbol') {
        if (!this.check_symbol) {
          this.img_sel = this.value
        } else {
          this.img_sel = ''
          this.lType = 'color'
        }
        this.check_symbol = !this.check_symbol
      }

      this.graph.label = this.label
      this.graph.code = ''
      this.graph.type = ''

      if (this.type === 'color') {
        this.graph.vestibular.check = this.check_up
        this.graph.palatina_lingual.check = this.check_down
        this.graph.mesial.check = this.check_right
        this.graph.distal.check = this.check_left
        this.graph.oclusal.check = this.check_center

        if (this.graph.vestibular.check) {
          if (this.graph.vestibular.code === '') {
            this.graph.vestibular.code = this.code
          }
        } else {
          this.graph.vestibular.code = ''
        }

        if (this.graph.palatina_lingual.check) {
          if (this.graph.palatina_lingual.code === '') {
            this.graph.palatina_lingual.code = this.code
          }
        } else {
          this.graph.palatina_lingual.code = ''
        }

        if (this.graph.mesial.check) {
          if (this.graph.mesial.code === '') {
            this.graph.mesial.code = this.code
          }
        } else {
          this.graph.mesial.code = ''
        }

        if (this.graph.distal.check) {
          if (this.graph.distal.code === '') {
            this.graph.distal.code = this.code
          }
        } else {
          this.graph.distal.code = ''
        }

        if (this.graph.oclusal.check) {
          if (this.graph.oclusal.code === '') {
            this.graph.oclusal.code = this.code
          }
        } else {
          this.graph.oclusal.code = ''
        }

        if (this.graph.vestibular.check ||
            this.graph.palatina_lingual.check ||
            this.graph.mesial.check ||
            this.graph.distal.check ||
            this.graph.oclusal.check) {
          this.graph.code = this.code
          this.graph.type = this.lType
        }
      }

      if (this.type === 'symbol') {
        if (this.check_symbol) {
          this.graph.code = this.code
          this.graph.type = this.lType

          this.graph.vestibular.code = ''
          this.graph.vestibular.check = false
          this.graph.palatina_lingual.code = ''
          this.graph.palatina_lingual.check = false
          this.graph.mesial.code = ''
          this.graph.mesial.check = false
          this.graph.distal.code = ''
          this.graph.distal.check = false
          this.graph.oclusal.code = ''
          this.graph.oclusal.check = false

          this.color_up = 'background-color:'
          this.color_down = 'background-color:'
          this.color_left = 'background-color:'
          this.color_right = 'background-color:'
          this.color_center = 'background-color:'

          this.check_up = false
          this.check_down = false
          this.check_left = false
          this.check_right = false
          this.check_center = false
        }
      }
      this.$emit('update:gvalue', this.graph)
    },
    initSimbol: function () {
      var object = this.gvalue

      if (object.hasOwnProperty('label')) {
        this.graph = object
        // this.lType = this.graph.type

        if (this.graph.type === 'symbol' && this.graph.lparam) {
          this.lType = this.graph.type

          for (var index in this.graph.lparam) {
            if (this.graph.code === this.graph.lparam[index].code) {
              this.img_sel = this.graph.lparam[index].img
              this.check_symbol = true
              break
            }
          }
        }

        if (this.graph.type === 'color' && this.graph.lparam) {
          this.lType = this.graph.type

          for (index in this.graph.lparam) {
            if (this.graph.vestibular.check && this.graph.vestibular.code === this.graph.lparam[index].code) {
              this.color_up = 'background-color:' + this.graph.lparam[index].color
              this.check_up = true
            }

            if (this.graph.palatina_lingual.check && this.graph.palatina_lingual.code === this.graph.lparam[index].code) {
              this.color_down = 'background-color:' + this.graph.lparam[index].color
              this.check_down = true
            }

            if (this.graph.mesial.check && this.graph.mesial.code === this.graph.lparam[index].code) {
              this.color_right = 'background-color:' + this.graph.lparam[index].color
              this.check_right = true
            }

            if (this.graph.distal.check && this.graph.distal.code === this.graph.lparam[index].code) {
              this.color_left = 'background-color:' + this.graph.lparam[index].color
              this.check_left = true
            }

            if (this.graph.oclusal.check && this.graph.oclusal.code === this.graph.lparam[index].code) {
              this.color_center = 'background-color:' + this.graph.lparam[index].color
              this.check_center = true
            }
          }
        }
        delete this.graph['lparam']
      }
    }
  },
  mounted: function () {
    this.initSimbol()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

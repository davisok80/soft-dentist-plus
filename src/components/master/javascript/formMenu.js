import { HalfeldMenu, HalfeldCard } from 'halfeld-components'

var company = ''
var user = ''

export default {
  props: ['appMenu'],
  data () {
    return {
      links: [
        { name: 'Pacientes', link: '#/module/patients' },
        { name: 'Especialista', link: '#/module/specialist' },
        { name: 'Citas', link: '#/module/quotes'},
        { name: 'Historia Clinica', link: '#/master/menu'},
        { name: 'Odontograma', link: '#/module/odontogram'}
      ]
    }
  },
  methods: {
    logOut: function () {
      this.$session.destroy()
      this.$router.push('/')
    },
    getSession: function () {
      if (this.$session.exists()){
        company = this.$session.get('company')
        user = this.$session.get('user')
      } else {
        console.log('No existe sesion')
        this.$router.push('/')
      }
    }
  },
  mounted: function () {
    this.getSession()
  },
  components: {
    HalfeldMenu,
    HalfeldCard
  }
}

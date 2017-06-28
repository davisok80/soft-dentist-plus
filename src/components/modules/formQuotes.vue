<template lang="html">
  <div id="appQuotes" class="form-group col-sm-8">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/master/menu"><span class="glyphicon glyphicon-home"></span> SoftDentistPlus</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="#/module/patients">Pacientes</a></li>
          <li><a href="#/module/specialist">Especialista</a></li>
          <li class="active"><a href="#/module/quotes">Citas</a></li>
          <li><a href="#/master/menu">Historia Clinica</a></li>
          <li><a href="#/module/odontogram">Odontograma</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click.prevent="logOut"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>
        </ul>
      </div>
    </nav>

    <alert v-if="this.messageError != null" v-bind:type="type_alert" placement="top" width="400px">
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>Opss!</strong>
      <p>{{messageError}}</p>
    </alert>

    <div v-if="showList">
      <div class="actions" align="left">
        <a class="btn btn-default" @click.prevent="addRecord">
          <span class="glyphicon glyphicon-plus"></span>
          Nueva cita
        </a>
      </div>
      <br>
      <div>
        <!-- Busqueda de citas -->
        <table class="table">
          <tbody>

            <tr>
              <td colspan="4" align="left" valign="middle"><label>Filtrar por:</label></td>
            </tr>

            <tr>
              <td align="left">
                <select v-on:change="getQuotes()" v-model="filterSearchQuotes.people" class="form-control">
                  <option disabled value=""></option>
                  <option v-for="iPeople in listPeople" v-bind:value="iPeople.value">{{ iPeople.text }}</option>
                </select>
              </td>
              <td align="left">
                <select v-on:change="getQuotes()" v-model="filterSearchQuotes.field" class="form-control">
                  <option disabled value=""></option>
                  <option v-for="iSearch in listSearch" v-bind:value="iSearch.value">{{ iSearch.text }}</option>
                </select>
              </td>
              <td align="left" colspan="2"><input v-model="filterSearchQuotes.textSearch" type="text" class="form-control"></td>
            </tr>

            <tr>
              <td>
                <label>Desde:</label>&nbsp;&nbsp;
                <datepicker v-on:input="getQuotes()" v-model="filterSearchQuotes.beginDate" format="dd/MM/yyyy" language="es"></datepicker>
              </td>
              <td>
                <label>Hasta:</label>&nbsp;&nbsp;
                <datepicker v-on:input="getQuotes()" v-model="filterSearchQuotes.endDate" format="dd/MM/yyyy" language="es"></datepicker>
              </td>
              <td>
                <label>Estado:</label>&nbsp;&nbsp;
                <select v-on:change="getQuotes()" v-model="filterSearchQuotes.state" class="form-control">
                  <option disabled value=""></option>
                  <option v-for="iState in listState" v-bind:value="iState.value">{{ iState.text }}</option>
                </select>
              </td>
              <td align="left">
                <a class="btn btn-warning btn-xs" @click.prevent="getQuotes">Buscar</a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Fin Busqueda de citas -->
        <!-- Lista resultado de personas -->
        <table class="table">
          <thead>
          <tr>
            <th>Tipo ID</th>
            <th>ID</th>
            <th>Apellidos</th>
            <th>Nombres</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="data in listPeopleFilter">
            <td align="left">
              <a href="#" @click.prevent="filterQuotes(data._id)">{{ data.type_identification }}</a>
            </td>
            <td align="left">
              <a href="#" @click.prevent="filterQuotes(data._id)">{{ data.dni }}</a>
            </td>
            <td align="left">{{ data.last_name }}</td>
            <td align="left">{{ data.first_name }}</td>
          </tr>
          </tbody>
        </table>
        <!-- Fin lista resultado de personas -->
        <!-- Lista resultado de citas -->
        <table class="table">
          <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="data in listData">
            <td align="left">{{ data.date_quotes | moment("DD/MM/YYYY") }}</td>
            <td align="left">{{ data.hour_quotes }}</td>
            <td align="left">{{ data.state_quotes }}</td>
            <td align="center">
              <a v-if="data.state_quotes == 'Activa'" class="btn btn-danger btn-xs" @click.prevent="deleteLogicRecord(data._id)">Cancelar cita</a>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- Fin lista resultado de citas -->
      </div>
    </div>
    <div v-else>
      <form v-on:submit.prevent="saveChange">
        <h3 align="left">Citas</h3>
          <br>
          <!-- Paciente -->
          <div class="form-group" align="left">
            <label>Paciente:</label>
            <a class="btn btn-warning btn-xs" @click.prevent="showModelPacient">Escoger</a>
            <br>
            <label v-show="this.textChoosePatient != null">{{ this.textChoosePatient }}</label>
            <a v-show="this.textChoosePatient != null" class="btn btn-danger btn-xs" @click.prevent="removePacient()">Quitar</a>
          </div>        
          <div class="form-group" align="left" v-if="showPacient">
            <table class="table">
              <tbody>
                <tr>
                  <td align="right" valign="middle"><label for="searchForPatient">Buscar por:</label></td>
                  <td align="left">
                    <select v-model="searchForPatient" class="form-control" id="searchForPatient">
                      <option disabled value="">Buscar por</option>
                      <option v-for="searchPatient in listSearch" v-bind:value="searchPatient.value">{{ searchPatient.text }}</option>
                    </select>
                  </td>
                  <td align="left"><input v-model="textSearchPatient" type="text" id="textSearchPatient" class="form-control"></td>
                  <td align="center" valign="middle">
                    <a class="btn btn-warning btn-xs" @click.prevent="getPeople('patients', this.searchForPatient.value, this.textSearchPatient.value)">Buscar</a>
                    <a class="btn btn-warning btn-xs" @click.prevent="choosePacient()">Cancelar</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table">
              <thead>
              <tr>
                <th>Tipo ID</th>
                <th>ID</th>
                <th>Apellidos</th>
                <th>Nombres</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="data in listPacient" v-if="data.state == 'Activo'">
                <td align="left">
                  <a href="#" @click.prevent="choosePacient(data)">{{ data.type_identification }}</a>
                </td>
                <td align="left">{{ data.dni }}</td>
                <td align="left">{{ data.last_name }}</td>
                <td align="left">{{ data.first_name }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- Fin Paciente -->
          <!-- Especialista -->
          <div class="form-group" align="left">
            <label>Especialista:</label>
            <a class="btn btn-warning btn-xs" @click.prevent="showModelSpecialist">Escoger</a>
            <br>
            <label v-show="this.textChooseSpecialist != null">{{ this.textChooseSpecialist }}</label>
            <a v-show="this.textChooseSpecialist != null" class="btn btn-danger btn-xs" @click.prevent="removeSpecialist()">Quitar</a>
          </div>        
          <div class="form-group" align="left" v-if="showSpecialist">
            <table class="table">
              <tbody>
                <tr>
                  <td align="right" valign="middle"><label for="searchForSpecialist">Buscar por:</label></td>
                  <td align="left">
                    <select v-model="searchForSpecialist" class="form-control" id="searchForSpecialist">
                      <option disabled value="">Buscar por</option>
                      <option v-for="searchSpecialist in listSearch" v-bind:value="searchSpecialist.value">{{ searchSpecialist.text }}</option>
                    </select>
                  </td>
                  <td align="left"><input v-model="textSearchSpecialist" type="text" id="textSearchSpecialist" class="form-control"></td>
                  <td align="center" valign="middle">
                    <a class="btn btn-warning btn-xs" @click.prevent="getPeople('specialist', this.searchForSpecialist.value, this.textSearchSpecialist.value)">Buscar</a>
                    <a class="btn btn-warning btn-xs" @click.prevent="chooseSpecialist()">Cancelar</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table">
              <thead>
              <tr>
                <th>Tipo ID</th>
                <th>ID</th>
                <th>Apellidos</th>
                <th>Nombres</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="data in listSpecialist" v-if="data.state_record == 'Activo' && data.state">
                <td align="left">
                  <a href="#" @click.prevent="chooseSpecialist(data)">{{ data.type_identification }}</a>
                </td>
                <td align="left">{{ data.dni }}</td>
                <td align="left">{{ data.last_name }}</td>
                <td align="left">{{ data.first_name }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- Fin Especialista -->
          <div class="form-group" align="left">
            <label for="quotes.date_quotes">Fecha:</label>
            <datepicker v-model="quotes.date_quotes" name="quotes.date_quotes" format="dd/MM/yyyy" language="es"></datepicker>
          </div>
          <div class="form-group" align="left">
            <label for="quotes.hour_quotes">Hora:</label>
            <control-hour range="15" :value.sync="quotes.hour_quotes"></control-hour>
          </div>
          <div class="form-group" align="left">
            <label for="quotes.note">Nota:</label>
            <textarea v-model="quotes.note" class="form-control" rows="5" id="quotes.note"></textarea>
          </div>
        <br>
        <button type="submit" class="btn btn-primary">Crear cita</button>
        <button type="button" class="btn btn-primary" @click.prevent="showSearchQuotes">Cancelar</button>
      </form>
    </div>
    <br>
    <div>
      <div class="panel panel-default">
        <div class="panel-footer"><p>&copy; 2017 SoftDentistPlus</p></div>
      </div>
    </div>
  </div>
</template>
<script src="./javascript/formQuotes.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

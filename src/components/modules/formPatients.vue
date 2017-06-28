<template lang="html">
  <div id="appPatient" class="form-group col-sm-8">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/master/menu"><span class="glyphicon glyphicon-home"></span> SoftDentistPlus</a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active"><a href="#/module/patients">Pacientes</a></li>
          <li><a href="#/module/specialist">Especialista</a></li>
          <li><a href="#/module/quotes">Citas</a></li>
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
          Nuevo paciente
        </a>
      </div>
      <br>
      <table class="table">
        <tbody>
          <tr>
            <td align="right"><label>Buscar por:</label></td>
            <td align="left">
              <select v-model="searchFor" class="form-control">
                <option disabled value="">Seleccionar</option>
                <option v-for="iSearch in listSearch" v-bind:value="iSearch.value">{{ iSearch.text }}</option>
              </select>
            </td>
            <td align="left"><input v-model="textSearch" type="text" class="form-control"></td>
            <td align="center" valign="middle">
              <a class="btn btn-warning btn-xs" @click.prevent="getPeople()">Buscar</a>
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
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in listData" v-if="data.state == 'Activo'">
          <td align="left">
            <a href="#" @click.prevent="loadRecord(data._id)">{{ data.type_identification }}</a>
          </td>
          <td align="left">
            <a href="#" @click.prevent="loadRecord(data._id)">{{ data.dni }}</a>
          </td>
          <td align="left">{{ data.last_name }}</td>
          <td align="left">{{ data.first_name }}</td>
          <td align="center">
            <a class="btn btn-danger btn-xs" @click.prevent="deleteLogicRecord(data._id)">Eliminar</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <form v-on:submit.prevent="saveChange">
        <h3 align="left">Paciente</h3>
        <ul class="nav nav-tabs">
          <li v-bind:class="{ active: showTab_1 }"><a href="javascript:;" @click.prevent="showTab(1)">Datos personales</a></li>
          <li v-bind:class="{ active: showTab_2 }"><a href="javascript:;" @click.prevent="showTab(2)">Datos de contacto</a></li>
        </ul>

        <div v-if="showTab_1">
          <br>
          <div class="form-group" align="left">
            <label for="patient.type_identification">Tipo identificacion:</label>
            <select v-model="patient.type_identification" class="form-control" :disabled="this.state == 'Edit' ? true : false">
              <option disabled value="">Seleccionar</option>
              <option v-for="type in listType" v-bind:value="type.value">{{ type.text }}</option>
            </select>          
          </div>
          <div class="form-group" align="left">
            <label for="patient.dni">Numero identificacion:</label>
            <input v-model="patient.dni" type="text" class="form-control" :disabled="this.state == 'Edit' ? true : false">
          </div>
          <div class="form-group" align="left">
            <label for="patient.first_name">Nombres:</label>
            <input v-model="patient.first_name" type="text" id="patient.first_name" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.last_name">Apellidos:</label>
            <input v-model="patient.last_name" type="text" id="patient.last_name" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.birthdate">Fecha de nacimiento:</label>
            <datepicker v-model="patient.birthdate" name="patient.birthdate" format="dd/MM/yyyy" language="es"></datepicker>
          </div>
          <div class="form-group" align="left">
            <label for="patient.gender">Genero:</label>
            <select v-model="patient.gender" class="form-control" id="patient.gender">
              <option disabled value="">Seleccionar</option>
              <option v-for="gender in listGender" v-bind:value="gender.value">{{ gender.text }}</option>
            </select>
          </div>
          <div class="form-group" align="left">
            <label for="patient.civil_status">Estado civil:</label>
            <select v-model="patient.civil_status" class="form-control" id="patient.civil_status">
              <option disabled value="">Seleccionar</option>
              <option v-for="civilStatus in listCivilStatus" v-bind:value="civilStatus.value">{{ civilStatus.text }}</option>
            </select>          
          </div>
        </div>
        <div v-if="showTab_2">
          <br>
          <div class="form-group" align="left">
            <label for="patient.address">Direccion:</label>
            <input v-model="patient.address" type="text" id="patient.address" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.email">Email:</label>
            <input v-model="patient.email" type="text" id="patient.email" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.cell_phone">Celular:</label>
            <input v-model="patient.cell_phone" type="text" id="patient.cell_phone" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.home_phone">Telefono de casa:</label>
            <input v-model="patient.home_phone" type="text" id="patient.home_phone" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.office_phone">Telefono del trabajo:</label>
            <input v-model="patient.office_phone" type="text" id="patient.office_phone" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.emergency_contact">Contacto de emergencia:</label>
            <input v-model="patient.emergency_contact" type="text" id="patient.emergency_contact" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.phone_contact">Telefono de contacto:</label>
            <input v-model="patient.phone_contact" type="text" id="patient.phone_contact" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="patient.note">Obvservacion:</label>
            <textarea v-model="patient.note" class="form-control" rows="5" id="patient.note"></textarea>
          </div>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" class="btn btn-primary" @click.prevent="getRecords">Cancelar</button>
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
<script src="./javascript/formPatients.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

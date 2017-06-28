<template lang="html">
  <div id="appSpecialist" class="form-group col-sm-8">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/master/menu"><span class="glyphicon glyphicon-home"></span> SoftDentistPlus</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="#/module/patients">Pacientes</a></li>
          <li class="active"><a href="#/module/specialist">Especialista</a></li>
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
          Nuevo especialista
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
          <th class="col-sm-2">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in listData" v-if="data.state_record == 'Activo'">
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
        <h3 align="left">Especialista</h3>
        <ul class="nav nav-tabs">
          <li v-bind:class="{ active: showTab_1 }"><a href="javascript:;" @click.prevent="showTab(1)">Datos personales</a></li>
          <li v-bind:class="{ active: showTab_2 }"><a href="javascript:;" @click.prevent="showTab(2)">Datos de contacto</a></li>
        </ul>

        <div v-if="showTab_1">
          <br>
          <div class="form-group" align="left">
            <label for="specialist.type_identification">Tipo identificacion:</label>
            <select v-model="specialist.type_identification" class="form-control" :disabled="this.state == 'Edit' ? true : false">
              <option disabled value="">Seleccionar</option>
              <option v-for="type in listType" v-bind:value="type.value">{{ type.text }}</option>
            </select>          
          </div>
          <div class="form-group" align="left">
            <label for="specialist.dni">Numero identificacion:</label>
            <input v-model="specialist.dni" type="text" class="form-control" :disabled="this.state == 'Edit' ? true : false">
          </div>
          <div class="form-group" align="left">
            <label for="specialist.first_name">Nombres:</label>
            <input v-model="specialist.first_name" type="text" id="specialist.first_name" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="specialist.last_name">Apellidos:</label>
            <input v-model="specialist.last_name" type="text" id="specialist.last_name" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="specialist.specialty">Especialidad:</label>
            <select v-model="specialist.specialty" class="form-control" id="specialist.specialty">
              <option disabled value="">Seleccionar</option>
              <option v-for="item_specialty in listSpecialty" v-bind:value="item_specialty.value">{{ item_specialty.text }}</option>
            </select>          
          </div>
          <div class="form-group" align="left">
            <label for="specialist.last_name">Activo:</label>
            <input v-model="specialist.state" type="checkbox" id="specialist.state" class="form-control">
          </div>
        </div>
        <div v-if="showTab_2">
          <br>
          <div class="form-group" align="left">
            <label for="specialist.address">Direccion:</label>
            <input v-model="specialist.address" type="text" id="specialist.address" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="specialist.email">Email:</label>
            <input v-model="specialist.email" type="text" id="specialist.email" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="specialist.cell_phone">Celular:</label>
            <input v-model="specialist.cell_phone" type="text" id="specialist.cell_phone" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="specialist.home_phone">Telefono de casa:</label>
            <input v-model="specialist.home_phone" type="text" id="specialist.home_phone" class="form-control">
          </div>
          <div class="form-group" align="left">
            <label for="specialist.office_phone">Telefono del trabajo:</label>
            <input v-model="specialist.office_phone" type="text" id="specialist.office_phone" class="form-control">
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
<script src="./javascript/formSpecialist.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template lang="html">
  <div id="appOdontogram" class="form-group col-sm-8">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/master/menu"><span class="glyphicon glyphicon-home"></span> SoftDentistPlus</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="#/module/patients">Pacientes</a></li>
          <li><a href="#/module/specialist">Especialista</a></li>
          <li><a href="#/module/quotes">Citas</a></li>
          <li><a href="#/master/menu">Historia Clinica</a></li>
          <li class="active"><a href="#/module/odontogram">Odontograma</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click.prevent="logOut"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>
        </ul>
      </div>
    </nav>

    <alert v-if="this.messageError != null" v-bind:type="type_alert" placement="top" width="400px">
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>{{messageTitle}}</strong>
      <p>{{messageError}}</p>
    </alert>

    <!-- Paciente -->
    <div class="form-group" align="left" v-if="!idPatientSession">
      <label>Paciente:</label>
      <a v-if="this.textChoosePatient == null" class="btn btn-warning btn-xs" @click.prevent="showModelPacient">Escoger</a>
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
              <a class="btn btn-warning btn-xs" @click.prevent="getPeople(this.searchForPatient.value, this.textSearchPatient.value)">Buscar</a>
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

    <nav class="navbar navbar-default" v-if="showQuadrantAll">
      <div class="container-fluid">
        <ul class="nav navbar-nav">
          <li v-bind:class="{ active: showQuadrant_1 }"><a href="javascript:;" @click.prevent="showQuadrant(1)">Cuadrante 1</a></li>
          <li v-bind:class="{ active: showQuadrant_2 }"><a href="javascript:;" @click.prevent="showQuadrant(2)">Cuadrante 2</a></li>
          <li v-bind:class="{ active: showQuadrant_3 }"><a href="javascript:;" @click.prevent="showQuadrant(3)">Cuadrante 3</a></li>
          <li v-bind:class="{ active: showQuadrant_4 }"><a href="javascript:;" @click.prevent="showQuadrant(4)">Cuadrante 4</a></li>
        </ul>
      </div>
    </nav>

    <table style="border-collapse: separate; border-spacing:10px;" v-if="showQuadrantAll">
      <tr>
        <td>
          <!-- Cuadrante 1 -->
          <div v-show="showQuadrant_1">
            <table style="border-collapse: separate; border-spacing:5px; align: center">
              <tr>
                <td v-for="(data, index) in listCuadrante_1.row_1">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_1.row_1[index].graph"></control-tooth>                  
                </td>
              </tr>
              <tr>
                <td colspan="3">&nbsp;</td>
                <td v-for="(data, index) in listCuadrante_1.row_2">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_1.row_2[index].graph"></control-tooth>
                </td>
              </tr>
            </table>
          </div>
          <!-- Cuadrante 2 -->
          <div v-show="showQuadrant_2">
            <table style="border-collapse: separate; border-spacing:5px; align: center">
              <tr>
                <td v-for="(data, index) in listCuadrante_2.row_1">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_2.row_1[index].graph"></control-tooth>
                </td>
              </tr>
              <tr>
                <td v-for="(data, index) in listCuadrante_2.row_2">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_2.row_2[index].graph"></control-tooth>
                </td>
                <td colspan="3">&nbsp;</td>
              </tr>
            </table>
          </div>
          <!-- Cuadrante 3 -->
          <div v-show="showQuadrant_3">
            <table style="border-collapse: separate; border-spacing:5px; align: center">
              <tr>
                <td v-for="(data, index) in listCuadrante_3.row_1">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_3.row_1[index].graph"></control-tooth>
                </td>
                <td colspan="3">&nbsp;</td>
              </tr>
              <tr>
                <td v-for="(data, index) in listCuadrante_3.row_2">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_3.row_2[index].graph"></control-tooth>
                </td>
              </tr>
            </table>
          </div>
          <!-- Cuadrante 4 -->
          <div v-show="showQuadrant_4">
            <table style="border-collapse: separate; border-spacing:5px; align: center">
              <tr>
                <td colspan="3">&nbsp;</td>         
                <td v-for="(data, index) in listCuadrante_4.row_1">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_4.row_1[index].graph"></control-tooth>
                </td>
              </tr>
              <tr>
                <td v-for="(data, index) in listCuadrante_4.row_2">
                  &nbsp;<control-tooth :label="data.value" :type="type" :code="code" :value="value_sel" :gvalue.sync="listCuadrante_4.row_2[index].graph"></control-tooth>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td>
          <!-- Tabla de simbolos -->
          <table style="border-collapse: separate; border-spacing:5px;">
            <tr v-for="dataOdontogramParam in listOdontogramParam">
              <td v-if="dataOdontogramParam.type == 'color'" :style="setColorOP(dataOdontogramParam.color)">
                <a href="javascript:;" @click.prevent="setSymbol(dataOdontogramParam)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              </td>
              <td v-if="dataOdontogramParam.type == 'symbol'">
                <a href="javascript:;" @click.prevent="setSymbol(dataOdontogramParam)">
                  <img :src="dataOdontogramParam.img" style="height: 35px; width: 35px">
                </a>
              </td>
              <td>
                &nbsp;{{dataOdontogramParam.name}}
              </td>
            </tr>
          </table>
        </td>
        <td>
          <!-- Tabla de seleccion -->
          <table style="border-collapse: separate; border-spacing:5px;">
            <tr>
              <td colspan="2">
                <h4>Selección</h4>
              </td>
            </tr>
            <tr>
              <td v-if="selOdontogramParam.type == 'color'" :style="setColorOP(selOdontogramParam.color)">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </td>
              <td v-if="selOdontogramParam.type == 'symbol'">
                <img :src="selOdontogramParam.img" style="height: 35px; width: 35px">
              </td>
              <td v-if="selOdontogramParam.name">
                &nbsp;{{selOdontogramParam.name}}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <br>
    <button v-if="showQuadrantAll" type="button" class="btn btn-primary" @click.prevent="saveChange">Guardar cambios</button>
    <br><br>
    <div class="panel panel-default">
      <div class="panel-footer"><p>&copy; 2017 SoftDentistPlus</p></div>
    </div>
  </div>
</template>
<script src="./javascript/formOdontogram.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

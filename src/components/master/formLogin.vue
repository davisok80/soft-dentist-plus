<template lang="html">
  <div id="appLogin" class="form-group col-sm-8">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#"> SoftDentistPlus</a>
        </div>
      </div>
    </nav>

    <alert v-if="this.messageError != null" v-bind:type="type_alert" placement="top" width="400px">
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>{{messageTitle}}</strong>
      <p>{{messageError}}</p>
    </alert>

    <div>     
      <form v-on:submit.prevent="logIn" class="form-horizontal">
        <br>
        <table class="table">
          <tbody>
            <tr>
              <td>
                <!-- Login -->
                <div class="form-group">
                  <label class="control-label col-sm-4">Clinica</label>
                  <div class="col-sm-8">
                    <select v-model="login.company" class="form-control">
                      <option disabled value="">Seleccionar</option>
                      <option v-for="iClinic in listClinic" v-bind:value="iClinic.company" v-if="iClinic.state == 'Activo'">{{ iClinic.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="login.user" class="control-label col-sm-4">Usuario</label>
                  <div class="col-sm-8">
                    <input v-model="login.user" type="text" class="form-control">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-sm-4">Password</label>
                  <div class="col-sm-8">
                    <input type="password" class="form-control" v-model="login.password">
                  </div>
                </div>

              </td>
              <td>
                <img src="./assets/Logo_2.jpg" style="height: 180px; width: 180px">
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" class="btn btn-primary">Entrar</button>
        <button type="reset" class="btn btn-primary">Cancelar</button>
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
<script src="./javascript/formLogin.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

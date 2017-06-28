<template lang="html">

  <div id="appMenu" class="form-group col-sm-8">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/master/menu"><span class="glyphicon glyphicon-home"></span> SoftDentistPlus</a>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click.prevent="logOut"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>
        </ul>
      </div>
    </nav>

    <!-- Menu component -->
    <HalfeldMenu
      :items="links"
      primary-color="#444"
      secondary-color="#c3c3c3"
      label="MENU"
      shadow-color="#333"
      style="height: 390px">

      <!-- Your header content -->
      <img src="./assets/Logo_2.jpg" style="height: 260px; width: 280px">
    </HalfeldMenu>
    <div>
      <div class="panel panel-default">
        <div class="panel-footer"><p>&copy; 2017 SoftDentistPlus</p></div>
      </div>
    </div>   
  </div>
</template>

<script src="./javascript/formMenu.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

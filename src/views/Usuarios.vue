<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="item">
        <div class="col-xl-3 col-lg-6"></div>
      </div>
    </base-header>

    <!--Form-->
    <div class="container-fluid mt--7">
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header border-0">
              <div class="item align-items-center">
                <div class="col">
                  <h3 class="mb-0">Usuários do Sistema</h3>
                </div>
              </div>
            </div>

            <div class="table-responsive text-center">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Cargo</th>
                    <!-- <th colspan="2">Ações</th> -->
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="usuario in usuarios" :key="usuario.pk_usuario">
                    <th class="capitalize">{{usuario.no_usuario}}</th>
                    <td>{{usuario.email}}</td>
                    <td>{{usuario.telefone}}</td>
                    <td class="capitalize">{{usuario.no_cargo}}</td>
                    <!-- <td>
                      <base-button @click="editar(item)" type="warning" size="sm" class>Alterar</base-button>
                      <base-button @click="excluir(item)" type="danger" size="sm" class>Excluir</base-button>
                    </td>-->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usuarios: []
    };
  },
  methods: {
    getUsuarios() {
      this.$http("/usuarios").then(res => {
        this.usuarios = res.data;
      });
    }
  },
  mounted() {
    this.getUsuarios();
  }
};
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #adb5bd;
  opacity: 1;
}
</style>

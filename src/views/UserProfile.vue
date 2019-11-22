<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 600px; "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Olá, {{nome}}</h1>
            <p
              class="text-white mt-0 mb-5"
            >Esta é a sua página de perfil, aqui você pode visualizar os seus dados, alterá-los, ou excluir e encerrar sua conta</p>
            <a href="#!" class="btn mr-2 btn-info">Editar Perfil</a>

            <base-button type="info" class="ml-4 btn btn-danger">Excluir</base-button>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image mb-5 pb-5">
                  <img src="img/theme/vue.jpg" class="rounded-circle" />
                </div>
              </div>
            </div>

            <div class="card-body pt-0 pt-md-4">
              <div class="text-center mt-5">
                <h3 class="capitalize">{{usuario[0].no_usuario}}</h3>
                <div class="h5 font-weight-300 capitalize">
                  <i class="ni location_pin mr-2"></i>
                  {{usuario[0].no_cargo}}
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>
                  {{usuario[0].email}}
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>
                  {{usuario[0].telefone}}
                </div>
                <hr class="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-profile",
  data() {
    return {
      usuario: "",
      nome: "Usuário"
    };
  },
  methods: {
    getUsuario() {
      this.$http.get(`/usuario?id=13`).then(async res => {
        this.usuario = await res.data;
        const name = await this.usuario[0].no_usuario;
        const firstName = name.split(" ");
        this.nome = firstName[0];
      });
    }
  },
  mounted() {
    this.getUsuario();
  }
};
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
</style>

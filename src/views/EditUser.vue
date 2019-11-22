<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 600px;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{nome}}</h1>
            <p
              class="text-white mt-0 mb-5"
            >Esta é a sua página de perfil, aqui você pode visualizar os seus dados e alterá-los,</p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Meu Perfil</h3>
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Username"
                        placeholder="Username"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].no_usuario"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Email address"
                        placeholder="jesse@example.com"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].email"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="First name"
                        placeholder="First name"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].telefone"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Last name"
                        placeholder="Last name"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].nu_cpf"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                <!-- <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                        alternative
                        label="Address"
                        placeholder="Home Address"
                        input-classes="form-control-alternative"
                        v-model="model.address"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="City"
                        placeholder="City"
                        input-classes="form-control-alternative"
                        v-model="model.city"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Country"
                        placeholder="Country"
                        input-classes="form-control-alternative"
                        v-model="model.country"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Postal code"
                        placeholder="Postal code"
                        input-classes="form-control-alternative"
                        v-model="model.zipCode"
                      />
                    </div>
                  </div>
                </div>-->
                <hr class="my-4" />
                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">About me</h6>

                <div class="col-12">
                  <a href="#!" class="btn btn-info">Salvar</a>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "profile_edit",
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
<style></style>

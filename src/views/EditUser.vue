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
            <h1 class="display-2 text-white">Olá, {{nome}}</h1>
            <p
              class="text-white mt-0 mb-5"
            >Esta é a sua página de perfil, aqui você pode visualizar os seus dados e alterá-los,</p>
            <router-link to="/profile">
              <span class="btn mr-2 btn-info">Voltar</span>
            </router-link>
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
                <base-alert
                  class="col-xl-12"
                  show
                  dismissible
                  v-for="mensagem in mensagens"
                  :key="mensagem.texto"
                  :type="mensagem.tipo"
                >{{mensagem.texto}}</base-alert>
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
                        label="Usuário"
                        placeholder="Usuário"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].no_usuario"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Email"
                        placeholder="email@exemplo.com"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].email"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Telefone"
                        placeholder="telefone"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].telefone"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="CPF"
                        placeholder="CPF"
                        input-classes="form-control-alternative"
                        v-model="usuario[0].nu_cpf"
                      />
                    </div>
                    <div class="col-lg-6">
                      <p class="text-gray-700 h5 mr-1">Cargo</p>
                      <select
                        name="cargo"
                        v-model="usuario[0].fk_cargo"
                        class="input-group-alternative mb-3 text-muted required capitalize"
                      >
                        <option @load="getCargos" selected hidden disabled value>Escolha um cargo</option>
                        <option
                          v-for="cargo in cargos"
                          :value="cargo.pk_cargo"
                          :key="cargo.pk_cargo"
                        >{{ cargo.no_cargo }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />

                <div class="col-12">
                  <base-button @click="updateUsuario(id)" type="primary" class="ml-3">Salvar</base-button>
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
      nome: "Usuário",
      id: null,
      cargos: {
        cargos: []
      },
      mensagens: []
    };
  },
  methods: {
    getUsuario() {
      this.$http.get(`/usuario?id=6`).then(async res => {
        this.usuario = await res.data;
        const name = await this.usuario[0].no_usuario;
        const firstName = name.split(" ");
        this.nome = firstName[0];
      });
    },
    getCargos() {
      this.$http("/cargos").then(res => {
        this.cargos = res.data;
      });
    },

    updateUsuario(id) {
      this.id = this.usuario[0].pk_usuario;
      this.$http
        .put(`/usuario?id=${id}`, this.usuario[0])
        .then(resp => {
          this.mensagens = [];
          console.log(resp.data);
          this.mensagens.push({
            texto: "Atualização realizada com sucesso",
            tipo: "success"
          });
          this.getUsuario(id);
        })
        .catch(err => {
          this.mensagens.push({
            texto: "Erro ao atualizar. Confira os seus dados e tente novamente",
            tipo: "danger"
          });
          //console.log(err.resp);
        });
    }
  },
  mounted() {
    this.mensagens = [];
    this.getUsuario();
    this.getCargos();
  }
};
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
.text-gray-700 {
  color: #525f7f;
}
</style>

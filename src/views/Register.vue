<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary pb-0 shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <base-alert
            show
            dismissible
            v-for="mensagem in mensagens"
            :key="mensagem.texto"
            :type="mensagem.tipo"
          >{{mensagem.texto}}</base-alert>
          <div class="text-center text-muted mb-4">
            <big>Informe seus dados</big>
          </div>
          <form method="post" role="form">
            <base-input
              class="input-group-alternative mb-3 required"
              placeholder="Nome"
              addon-left-icon="fa fa-user"
              v-model="usuario.no_usuario"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3 required"
              placeholder="CPF"
              addon-left-icon="fa fa-id-card"
              v-model="usuario.nu_cpf"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3 required"
              placeholder="Telefone"
              addon-left-icon="fa fa-phone-square"
              v-model="usuario.telefone"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3 required"
              placeholder="E-mail"
              addon-left-icon="ni ni-email-83"
              v-model="usuario.email"
            ></base-input>

            <base-input
              class="input-group-alternative required"
              placeholder="Senha"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="usuario.senha"
            ></base-input>
            <span class="ml-2 mr-5 text-muted">Cargo:</span>
            <select
              name="cargo"
              v-model="usuario.fk_cargo"
              class="input-group-alternative mb-3 text-muted required capitalize"
            >
              <option @load="getCargos" selected hidden disabled value>Escolha um cargo</option>
              <option
                v-for="cargo in cargos"
                :value="cargo.pk_cargo"
                :key="cargo.pk_cargo"
              >{{ cargo.no_cargo }}</option>
              <!-- <option value selected disabled>Escolha o seu cargo</option>
              <option value="1">Administrador</option>
              <option value="2">Dentista</option>
              <option value="3">Auxiliar</option>
              <option value="4">Funcionario</option>-->
            </select>

            <!-- <div class="text-muted font-italic required">
              <small>
                senha:
                <span class="text-success font-weight-700">{{ message }}</span>
              </small>
            </div>-->

            <!-- <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted">
                    Concordo com os
                    <a href="#!">Termos de Uso</a>
                  </span>
                </base-checkbox>
              </div>
            </div>-->
            <div class="text-center">
              <base-button @click="registrar" class="bg-primary text-light my-1">Criar Conta</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <router-link to="/login" class="text-light">
            <p class="text-gray">
              <u>Já possuo conta</u>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      usuario: {
        no_usuario: "",
        nu_cpf: "",
        telefone: "",
        email: "",
        senha: "",
        fk_cargo: ""
      },
      cargos: {
        cargos: []
      },
      mensagens: []
    };
  },
  methods: {
    limpar() {
      this.usuario = {};
      this.mensagens = [];
    },

    registrar() {
      this.$http
        .post("/registrar", this.usuario)
        .then(resp => {
          this.limpar();
          this.mensagens.push({
            texto: "Cadastro Efetuado Com Sucesso",
            tipo: "success"
          });
        })
        .catch(_ => {
          this.mensagens.push({
            texto: "Erro ao cadastrar. Confira os seus dados e tente novamente",
            tipo: "danger"
          });
        });
      // eslint-disable-next-line
      console.log(this.usuario);
    },

    getCargos() {
      this.$http("/cargos").then(res => {
        this.cargos = res.data;
      });
    }
  },
  mounted() {
    this.getCargos();
  }
};
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
</style>

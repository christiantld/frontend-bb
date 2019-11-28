<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-3">
          <div class="text-muted text-center mt-2 mb-1">
            <big>Entrar</big>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form">
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
            <div class="text-center">
              <base-button type="primary" class="my-5">Entrar</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <p class="text-gray">
            Novo por aqui?
            <router-link to="/register" class="text-primary h4">
              <strong>Cadastre-se</strong>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      usuario: {
        email: "",
        senha: ""
      }
    };
  }
};
</script>
<style>
</style>

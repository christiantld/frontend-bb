<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6"></div>
      </div>
    </base-header>

    <!--Form-->
    <div class="container-fluid mt--7">
      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col-xl-12 order-xl-1">
            <card shadow type="secondary">
              <div slot="header" class="bg-white border-0">
                <div class="row align-fornecedors-center">
                  <base-alert
                    class="col-xl-12"
                    show
                    dismissible
                    v-for="mensagem in mensagens"
                    :key="mensagem.texto"
                    :type="mensagem.tipo"
                  >{{mensagem.texto}}</base-alert>
                  <div class="col-8">
                    <h3 class="mb-0">Inserir Fornecedor</h3>
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
                          label="Nome"
                          placeholder="Nome do fornecedor"
                          input-classes="form-control-alternative"
                          v-model="fornecedor.no_fornecedor"
                        />
                      </div>
                      <div class="col-lg-6">
                        <base-input
                          alternative
                          label="Email"
                          placeholder="email@exemplo.com.br"
                          input-classes="form-control-alternative"
                          v-model="fornecedor.email"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="text-gray-700 h5 mr-1">Telefone</p>
                        <the-mask
                          placeholder="(00) 00000-0000"
                          mask="(##) #####-####"
                          v-model="fornecedor.telefone"
                          class="input-group-alternative mb-3 py-2 rounded text-muted col-xl-12 required"
                        />
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />

                  <div class="col-12">
                    <base-button @click="salvar()" type="primary" class="ml-3">Salvar</base-button>
                  </div>
                </form>
              </template>
            </card>
          </div>
        </div>
      </div>
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header border-0">
              <div class="row align-fornecedors-center">
                <div class="col">
                  <h3 class="mb-0">Estoque</h3>
                </div>
              </div>
            </div>

            <div class="table-responsive text-center">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Fornecedor</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th colspan="2">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="fornecedor in fornecedores" :key="fornecedor.pk_fornecedor">
                    <th class="capitalize">{{fornecedor.no_fornecedor}}</th>
                    <td>{{fornecedor.email}}</td>
                    <td>{{fornecedor.telefone}}</td>

                    <td>
                      <base-button
                        @click="editar(fornecedor)"
                        type="warning"
                        size="sm"
                        class
                      >Alterar</base-button>
                      <base-button
                        @click="excluir(fornecedor)"
                        type="danger"
                        size="sm"
                        class
                      >Excluir</base-button>
                    </td>
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
      //tableData: [],
      fornecedor: {
        no_fornecedor: null,
        email: null,
        telefone: null
      },
      fornecedores: [],

      id: null,
      mensagens: []
    };
  },
  methods: {
    limpar() {
      this.fornecedor.no_fornecedor = "";
      this.fornecedor.email = null;
      this.fornecedor.telefone = null;

      this.mensagens = [];
      this.id = null;
    },

    editar(fornecedor) {
      this.fornecedor = fornecedor;
      this.id = fornecedor.pk_fornecedor;
      console.log(this.fornecedor);
    },

    salvar() {
      if (!this.id) {
        this.$http.post("/fornecedor", this.fornecedor).then(resp => {
          this.getFornecedores();
          this.limpar();
        });
      } else {
        this.$http.put("/fornecedor", this.fornecedor).then(resp => {
          this.getFornecedores();
          this.limpar();
        });
      }
    },

    excluir(fornecedor) {
      this.id = fornecedor.pk_fornecedor;
      if (
        confirm("Esta operaçāo é irreversível. Deseja apagar o fornecedor?")
      ) {
        this.$http.delete(`/fornecedor?id=${this.id}`).then(resp => {
          this.getFornecedores();
          this.limpar();
        });
      }
    },

    getCategoria() {
      this.$http("/categorias").then(res => {
        this.categorias = res.data;
      });
    },
    getFornecedores() {
      this.$http("/fornecedores").then(res => {
        this.fornecedores = res.data;
      });
    }
  },
  mounted() {
    this.getCategoria();
    this.getFornecedores();
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

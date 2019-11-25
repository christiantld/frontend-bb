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
                <div class="row align-saidas-center">
                  <base-alert
                    class="col-xl-12"
                    show
                    dismissible
                    v-for="mensagem in mensagens"
                    :key="mensagem.texto"
                    :type="mensagem.tipo"
                  >{{mensagem.texto}}</base-alert>
                  <div class="col-8">
                    <h3 class="mb-0">Inserir saída</h3>
                  </div>
                </div>
              </div>
              <template>
                <form @submit.prevent>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="text-gray-700 h5 mr-1">Item</p>
                        <select
                          @load="getProdutos()"
                          name="cargo"
                          v-model="saida.fk_produto"
                          class="input-group-alternative mb-3 text-muted required capitalize"
                        >
                          <option selected disabled value>Escolha um produto</option>
                          <option
                            v-for="produto in produtos"
                            :value="produto.pk_produto"
                            :key="produto.pk_produto"
                          >{{ produto.no_produto}} - {{produto.marca}}</option>
                        </select>
                      </div>
                      <div class="col-lg-6">
                        <p class="text-gray-700 h5 mr-1">Quantidade</p>
                        <the-mask
                          placeholder="Quantidade"
                          mask="####"
                          v-model="saida.qtd_item"
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
              <div class="row align-saidas-center">
                <div class="col">
                  <h3 class="mb-0">Estoque</h3>
                </div>
              </div>
            </div>

            <div class="table-responsive text-center">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Fornecedor</th>
                    <th>Quantidade</th>
                    <th>Data de saida</th>
                    <th>Usuário</th>

                    <th colspan="2">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="saida in saidas" :key="saida.pk_saida">
                    <th class="capitalize">{{saida.no_produto}}</th>
                    <td class="capitalize">{{saida.no_fornecedor}}</td>
                    <td>{{saida.qtd_item}}</td>
                    <td>{{saida.data_saida}}</td>
                    <td>{{saida.no_usuario}}</td>
                    <td>
                      <base-button @click="editar(saida)" type="warning" size="sm" class>Alterar</base-button>
                      <base-button @click="excluir(saida)" type="danger" size="sm" class>Excluir</base-button>
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
      saida: {
        data_saida: "",
        qtd_saida: "",
        valor_item: "",
        fk_produto: "",
        fk_usuario: 1,
        fk_fornecedor: ""
      },
      saidas: [],
      produtos: {
        produtos: []
      },
      fornecedores: {
        fornecedores: []
      },
      usuario: {},
      id_user: null,
      id: null,
      mensagens: []
    };
  },
  methods: {
    // getUsuario() {
    //   const id = this.saida.fk_usuario;
    //   this.$http.get(`/usuario?id=${id}`).then(resp => {
    //     console.log(resp.data);
    //     this.usuario = resp.data;
    //     this.id_user = this.usuario.fk_cargo;
    //   });
    // },

    limpar() {
      this.saida.data_saida = "";
      this.saida.qtd_item = "";
      this.saida.fk_saida = "";
      this.saida.fk_usuario = 1;
      this.saida.fk_fornecedor = "";
      this.mensagens = [];
      this.id = null;
      this.id_user = null;
    },

    editar(saida) {
      this.saida = saida;
      this.saida.qtd_minima = parseInt(this.saida.qtd_item);
      this.id = saida.pk_saida;
      console.log(this.saida);
    },

    salvar() {
      this.getTime();
      if (!this.id) {
        this.$http.post("/saida", this.saida).then(resp => {
          this.getSaidas();
          this.limpar();
        });
      } else {
        this.$http.put("/saida", this.saida).then(resp => {
          this.getSaidas();
          this.limpar();
        });
      }
      console.log(this.saida);
    },

    excluir(saida) {
      this.id = saida.pk_saida;

      console.log(this.id_user);

      if (confirm("Esta operaçāo é irreversível. Deseja apagar a saida?")) {
        this.$http.delete(`/saida?id=${this.id}`).then(resp => {
          this.getSaidas();
          this.limpar();
        });
      }
    },

    getProdutos() {
      this.$http("/produtos").then(res => {
        this.produtos = res.data;
      });
    },
    getFornecedores() {
      this.$http("/fornecedores").then(res => {
        this.fornecedores = res.data;
      });
    },
    getSaidas() {
      this.$http("/saidas").then(res => {
        this.saidas = res.data;
      });
    },
    getTime() {
      let data = new Date();
      this.saida.data_saida = new Date(
        data.valueOf() - data.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      return this.saida.data_saida;
    }
  },
  mounted() {
    this.getProdutos();
    this.getSaidas();
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
.reverse {
  direction: rtl;
}
</style>

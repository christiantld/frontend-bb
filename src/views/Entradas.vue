<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="entrada">
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
                <div class="entrada align-entradas-center">
                  <base-alert
                    class="col-xl-12"
                    show
                    dismissible
                    v-for="mensagem in mensagens"
                    :key="mensagem.texto"
                    :type="mensagem.tipo"
                  >{{mensagem.texto}}</base-alert>
                  <div class="col-8">
                    <h3 class="mb-0">Inserir entrada</h3>
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
                          v-model="entrada.fk_produto"
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
                          v-model="entrada.qtd_item"
                          class="input-group-alternative mb-3 py-2 rounded text-muted col-xl-12 required"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="text-gray-700 h5 mr-1">Fornecedor</p>
                        <select
                          name="cargo"
                          v-model="entrada.fk_fornecedor"
                          class="input-group-alternative mb-3 text-muted required capitalize"
                        >
                          <option selected disabled value>Escolha um Fornecedor</option>
                          <option
                            v-for="fornecedor in fornecedores"
                            :value="fornecedor.pk_fornecedor"
                            :key="fornecedor.pk_fornecedor"
                          >{{ fornecedor.no_fornecedor }}</option>
                        </select>
                      </div>
                      <div class="col-lg-6">
                        <base-input
                          alternative
                          label="Valor do item"
                          v-model="entrada.valor_item"
                          required
                          input-classes="form-control-alternative"
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
      <div class="entrada mt-5">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header border-0">
              <div class="entrada align-entradas-center">
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
                    <th>Valor do Item</th>
                    <th>Fornecedor</th>
                    <th>Quantidade</th>
                    <th>Data de Entrada</th>
                    <th>Usuário</th>

                    <th colspan="2">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="entrada in entradas" :key="entrada.pk_entrada">
                    <th class="capitalize">{{entrada.no_produto}}</th>
                    <td class="capitalize">{{entrada.valor_item}}</td>
                    <td class="capitalize">{{entrada.no_fornecedor}}</td>
                    <td>{{entrada.qtd_item}}</td>
                    <td>{{entrada.data_entrada}}</td>
                    <td>{{entrada.no_usuario}}</td>
                    <td>
                      <base-button @click="editar(entrada)" type="warning" size="sm" class>Alterar</base-button>
                      <base-button @click="excluir(entrada)" type="danger" size="sm" class>Excluir</base-button>
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
      entrada: {
        data_entrada: "",
        qtd_entrada: "",
        valor_item: "",
        fk_produto: "",
        fk_usuario: 1,
        fk_fornecedor: ""
      },
      entradas: [],
      produtos: {
        produtos: []
      },
      fornecedores: {
        fornecedores: []
      },
      id: null,
      mensagens: []
    };
  },
  methods: {
    limpar() {
      this.entrada.data_entrada = "";
      this.entrada.qtd_item = "";
      this.entrada.valor_item = null;
      this.entrada.fk_entrada = "";
      this.entrada.fk_usuario = 1;
      this.entrada.fk_fornecedor = "";
      this.mensagens = [];
      this.id = null;
    },

    editar(entrada) {
      this.entrada = entrada;
      this.entrada.qtd_minima = parseInt(this.entrada.qtd_item);
      this.id = entrada.pk_entrada;
    },

    salvar() {
      this.getTime();
      this.getValor();
      if (!this.id) {
        this.$http.post("/entrada", this.entrada).then(resp => {
          this.getEntradas();
          this.limpar();
        });
      } else {
        this.$http.put("/entrada", this.entrada).then(resp => {
          this.getEntradas();
          this.limpar();
        });
      }
    },

    excluir(entrada) {
      this.id = entrada.pk_entrada;
      if (confirm("Esta operaçāo é irreversível. Deseja apagar a entrada?")) {
        this.$http.delete(`/entrada?id=${this.id}`).then(resp => {
          this.getEntradas();
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
    getEntradas() {
      this.$http("/entradas").then(res => {
        this.tableData = res.data;
        this.entradas = res.data;
      });
    },
    getTime() {
      let data = new Date();
      this.entrada.data_entrada = new Date(
        data.valueOf() - data.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      return this.entrada.data_entrada;
    },

    getValor() {
      let valor = this.entrada.valor_item;
      console.log("1 = ", valor);
      valor = parseFloat(valor.replace(".", ","));
      console.log("2 = ", valor);
    }
  },
  mounted() {
    this.getProdutos();
    this.getEntradas();
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

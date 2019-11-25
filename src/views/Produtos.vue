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
                    <h3 class="mb-0">Inserir Item</h3>
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
                          label="Item"
                          placeholder="Item"
                          input-classes="form-control-alternative"
                          v-model="item.no_produto"
                        />
                      </div>
                      <div class="col-lg-6">
                        <base-input
                          alternative
                          label="Marca"
                          placeholder="Marca"
                          input-classes="form-control-alternative"
                          v-model="item.marca"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <p class="text-gray-700 h5 mr-1">Quantidade Mínima</p>
                        <the-mask
                          placeholder="Quantidade Mínima"
                          mask="####"
                          v-model="item.qtd_minima"
                          class="input-group-alternative mb-3 py-2 rounded text-muted col-xl-12 required"
                        />
                      </div>
                      <div class="col-lg-6">
                        <p class="text-gray-700 h5 mr-1">Quantidade Máxima</p>
                        <the-mask
                          placeholder="Quantidade Máxima"
                          mask="####"
                          v-model="item.qtd_max"
                          required
                          class="input-group-alternative mb-3 py-2 rounded text-muted col-xl-12 required"
                        />
                      </div>
                      <div class="col-lg-6">
                        <p class="text-gray-700 h5 mr-1">Categoria</p>
                        <select
                          name="cargo"
                          v-model="item.fk_categoria"
                          class="input-group-alternative mb-3 text-muted required capitalize"
                        >
                          <option
                            @load="getCategoria"
                            selected
                            hidden
                            disabled
                            value
                          >Escolha uma categoria</option>
                          <option
                            v-for="categoria in categorias"
                            :value="categoria.pk_categoria"
                            :key="categoria.pk_categoria"
                          >{{ categoria.no_categoria}}</option>
                        </select>
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
              <div class="row align-items-center">
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
                    <th>Marca</th>
                    <th>Categoria</th>
                    <th>Quantidade Disponível</th>
                    <th>Mínimo</th>
                    <th>Máximo</th>
                    <th colspan="2">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in items" :key="item.pk_produto">
                    <th class="capitalize">{{item.no_produto}}</th>
                    <td class="capitalize">{{item.marca}}</td>
                    <td class="capitalize">{{item.no_categoria}}</td>
                    <td>{{item.qtd_total}}</td>
                    <td>{{item.qtd_minima}}</td>
                    <td>{{item.qtd_max}}</td>
                    <td>
                      <base-button @click="editar(item)" type="warning" size="sm" class>Alterar</base-button>
                      <base-button @click="excluir(item)" type="danger" size="sm" class>Excluir</base-button>
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
      item: {
        no_produto: "",
        marca: "",
        descricao: null,
        qtd_minima: "",
        qtd_max: "",
        qtd_total: "0",
        fk_categoria: ""
      },
      items: [],
      categorias: {
        categorias: []
      },
      id: null,
      mensagens: []
    };
  },
  methods: {
    limpar() {
      this.item.no_produto = "";
      this.item.marca = "";
      this.item.descricao = null;
      this.item.qtd_minima = "";
      this.item.qtd_max = "";
      this.item.qtd_total = "0";
      this.item.fk_categoria = "";
      this.mensagens = [];
      this.id = null;
    },

    editar(item) {
      this.item = item;
      this.item.qtd_minima = parseInt(this.item.qtd_minima);
      this.item.qtd_max = parseInt(this.item.qtd_max);
      this.id = item.pk_produto;
    },

    salvar() {
      if (!this.id) {
        this.$http.post("/produto", this.item).then(resp => {
          this.getProdutos();
          this.limpar();
        });
      } else {
        this.$http.put("/produto", this.item).then(resp => {
          this.getProdutos();
          this.limpar();
        });
      }
    },

    excluir(item) {
      this.id = item.pk_produto;
      if (confirm("Esta operaçāo é irreversível. Deseja apagar o produto?")) {
        this.$http.delete(`/produto?id=${this.id}`).then(resp => {
          this.getProdutos();
          this.limpar();
        });
      }
    },

    getCategoria() {
      this.$http("/categorias").then(res => {
        this.categorias = res.data;
      });
    },
    getProdutos() {
      this.$http("/produtos").then(res => {
        this.tableData = res.data;
        this.items = res.data;
      });
    }
  },
  mounted() {
    this.getCategoria();
    this.getProdutos();
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

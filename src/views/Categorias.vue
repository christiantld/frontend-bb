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
          <div class="col-xl-5 order-xl-0">
            <card shadow type="secondary">
              <div slot="header" class="bg-white border-0">
                <div class="row align-categorias-center">
                  <div class="col-8">
                    <h3 class="mb-0">Adiconar Categoria</h3>
                  </div>
                </div>
              </div>
              <template>
                <form @submit.prevent>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <base-input
                          alternative
                          label="Categoria"
                          placeholder="Categoria"
                          input-classes="form-control-alternative"
                          v-model="categoria.no_categoria"
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
          <div class="col-xl-5">
            <div class="card">
              <div class="card-header border-0">
                <div class="row align-categorias-center">
                  <div class="col">
                    <h3 class="mb-0">Categorias</h3>
                  </div>
                </div>
              </div>

              <div class="table-responsive text-center">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th colspan="2">Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="categoria in categorias" :key="categoria.pk_categoria">
                      <th class="capitalize">{{categoria.no_categoria}}</th>
                      <td>
                        <base-button
                          @click="editar(categoria)"
                          type="warning"
                          size="sm"
                          class
                        >Alterar</base-button>
                        <base-button
                          @click="excluir(categoria)"
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
      </div>

      <!--Tables-->
      <div class="row mt-5"></div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoria: {
        no_categoria: ""
      },
      categorias: [],
      id: null,
      mensagens: []
    };
  },
  methods: {
    limpar() {
      this.categoria.no_categoria = "";
      this.mensagens = [];
      this.id = null;
    },

    editar(categoria) {
      this.categoria = categoria;
      this.id = categoria.pk_categoria;
    },

    salvar() {
      if (!this.id) {
        this.$http.post("/categoria", this.categoria).then(resp => {
          this.getCategorias();
          this.limpar();
        });
      } else {
        this.$http.put("/categoria", this.categoria).then(resp => {
          this.getCategorias();
          this.limpar();
        });
      }
    },

    excluir(categoria) {
      this.id = categoria.pk_categoria;
      if (confirm("Esta operaçāo é irreversível. Deseja apagar a Categoria?")) {
        this.$http.delete(`/categoria?id=${this.id}`).then(resp => {
          this.getCategorias();
          this.limpar();
        });
      }
    },

    getCategorias() {
      this.$http("/categorias").then(res => {
        this.categorias = res.data;
      });
    }
  },
  mounted() {
    this.getCategorias();
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

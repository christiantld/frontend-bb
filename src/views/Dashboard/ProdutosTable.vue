<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Estoque</h3>
        </div>
        <div class="col text-right">
          <base-button size="sm" type="primary">Ver mais</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive text-center">
      <base-table thead-classes="thead-light" :data="tableData">
        <template slot="columns">
          <th>Item</th>
          <th>Marca</th>
          <th>Quantidade</th>
          <th>Categoria</th>
          <th colspan="2">Ações</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row" class="capitalize">{{row.no_produto}}</th>
          <td class="capitalize">{{row.marca}}</td>
          <td>{{row.qtd_total}}</td>
          <td class="capitalize">{{row.no_categoria}}</td>
          <td>
            <base-button type="warning" size="sm" class>Alterar</base-button>
            <base-button type="danger" size="sm" class>Excluir</base-button>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "produtos-table",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getProdutos() {
      this.$http("/produtos").then(res => {
        this.tableData = res.data;
        console.log(this.tableData);
      });
    }
  },

  mounted() {
    this.getProdutos();
  }
};
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
</style>

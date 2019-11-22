<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Entradas</h3>
        </div>
        <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">Ver mais</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="tableData">
        <template slot="columns">
          <th>Item</th>
          <th>Quantidade</th>
          <th>Usuario</th>
          <th>Data Movimentação</th>
          <th colspan="2">Ações</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">{{row.page}}</th>
          <td>{{row.visitors}}</td>
          <td>{{row.unique}}</td>
          <td>
            <i
              class="fas fa-arrow-up text-success mr-3"
              :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'"
            ></i>
            {{row.bounceRate}}
          </td>
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
  name: "entradas-table",
  data() {
    return {
      tableData: []
    };
  }
};
</script>
<style>
</style>

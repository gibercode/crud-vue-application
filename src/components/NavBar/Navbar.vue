<script setup> 

const filterArray = [
  { name: 'Estado' , value: 'state' },
  { name: 'Nombre' , value: 'name' },
  { name: 'Documento', value: 'document'},
  { name: 'Concesionario', value: 'concessionaire'}
]

import { defineProps, reactive, watch, getCurrentInstance} from 'vue'

const state = reactive({ search: '', filter: 'state'})
const app = getCurrentInstance()

defineProps({
  email: String,
  method: Function,
  filterMethod: Function
})

  watch(
    () => state.search,
    (searchParam, prevSearch) => {
     app.props.method(searchParam)
    }
  )

   watch(
    () => state.filter,
    (filterParam, prevfilterParam) => {
     app.props.filterMethod(filterParam)
    }
  )

</script>

<template>
  <div class='_parent'>
    <div class='_navbarParent'>
      <div>
        <input type="text" class='_searchInput' v-model="state.search" placeholder='Buscar...'> 
        <select name="filter" v-model="state.filter"  class='_select' >
          <option :value="item.value" v-for="(item, index) in filterArray" :key="index" selected> {{ item.name }} </option>
        </select>
      </div>
      <div>
        <p>usuario: {{ email }} </p>
      </div>

    </div>
  </div>
</template>

<style lang='scss' src='./styles.scss' scoped>

</style>
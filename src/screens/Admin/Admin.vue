
<script setup>
  import { reactive, onMounted, toRefs, computed, watch, watchEffect } from 'vue'
  import { Sidebar, Navbar, Modal } from '../../components';
  import { getStorage, updateStorage } from '../../utils/localStorageService';
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'

  const state = reactive({ data: [], name: '', document: '', state: '', concessionaire: '', flag: false, currenIndex: null, filter: 'state', show: false})

  onMounted(() => {
     if(localStorage.length) state.data = getStorage();
  })

  const create = () => { 
    const array = state.data.data;
    const formData = {
      name: state.name,
      document: state.document,
      state: state.state,
      concessionaire: state.concessionaire
    }

    if(!state.flag) {
      array.push(formData)
      updateStorage(array)
      resetForm()
      return
    }

    array[state.currentIndex].name = state.name;
    array[state.currentIndex].document = state.document;
    array[state.currentIndex].state = state.state;
    array[state.currentIndex].concessionaire = state.concessionaire;
    state.flag = false;
    resetForm()
    updateStorage(array)
  }

  const editItem = (item, index) => {
    state.name = item.name;
    state.document = item.document;
    state.state = item.state;
    state.concessionaire = item.concessionaire;

    state.currentIndex = index;
    state.flag = true;
  }

  const deleteItem = (index) => {
    const array = state.data.data;
    array.splice(state.currentIndex, 1);
    updateStorage(array)
  }

  const showModal = (index) => {
    state.show = !state.show
    state.currentIndex = index
  }

  const resetForm = () => {
    state.name = ''
    state.document = ''
    state.state = ''
    state.concessionaire = ''
  }

   watch(
    () => state.search,
    (searchParam, prevSearch) => {
      searching(searchParam)
    }
  )

  const searching = (param) => {
    const value = param.toLowerCase();
    const { filter } = state;
    if(!param.length) return state.data = getStorage();
     const copyArray = getStorage().data;
     const filterArray = copyArray.filter(element => element[filter].toLowerCase().includes(value));
     state.data = { data: filterArray }
  } 

  const setFilter = (filter) => state.filter = filter

  const exportDocument = () => {
    const document = new jsPDF()
    document.autoTable({ html: '#data'})
    document.save('report.pdf')
  }

</script>

<template>
  <Navbar :email="state.data.email" :method="searching" :filterMethod="setFilter" />
  <Modal :show="state.show" :hideModal="showModal" :deleteItem="deleteItem" />
    <div class='_structure'>
    <sidebar /> 
    <div class='_content'>
      <table class="_table" id="data">
        <thead>
          <tr class='_headers' >
            <th>#</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Estado</th>
            <th>Concesionario</th>
            <th>Operaciones</th> 
          </tr>
        </thead>
        <tbody v-for="(item, index) in state.data.data" :key="index" >
          <tr>
            <th>{{ index + 1}}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.document }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.concessionaire }}</td>
            <td>
              <button class='_editBtn' @click="() => editItem(item, index)"> Editar </button>
              <button class='_deleteBtn' @click="() => showModal(index)"> Eliminar </button>
            </td>
          </tr>
        </tbody>
      </table>

      <form class='_inputsParent' id="form">
        <input placeholder="Nombre" v-model="state.name" type='text' class='_input'/>
        <input placeholder="Documento" v-model="state.document" type='text' class='_input'/>
        <input placeholder="Estado" v-model="state.state" type='text' class='_input'/>
        <input placeholder="Concesionario" v-model="state.concessionaire" type='text' class='_input'/>
      </form>

      <button @click="create" class="_button"> {{ !state.flag ? 'CREAR' : 'EDITAR' }}  </button>
      <button @click="exportDocument" class="_export"> Exportar </button>
      
    </div>
  </div>

  
</template>

<style lang='scss' scoped src='./styles.scss' />



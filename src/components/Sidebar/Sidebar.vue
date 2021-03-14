<script setup>
import { reactive, onMounted, watch, getCurrentInstance } from 'vue'
import { clearStorage } from '../../utils/localStorageService'

  const app = getCurrentInstance()
  const instance = app.appContext.config.globalProperties.$router;

  const logout = () => {
    clearStorage()
    instance.push('/');
  }
</script>

<template>
  <div class='_sidebar'>
    <h2 class='_title'> Power motors </h2>
    <ul class='_list'>
      <li>Usuarios</li>
      <li>Concesionarios</li>
      <li>Estadisticas</li>
      <li>Opciones</li>
      <li @click="logout">logout</li>
    </ul>
  </div>
</template>

<style lans='scss' src='./styles.scss' scoped />


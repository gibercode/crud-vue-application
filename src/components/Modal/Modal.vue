<script setup>
  import { defineProps, reactive, watch, getCurrentInstance} from 'vue'
  const app = getCurrentInstance()

  defineProps({
    show: Boolean,
    hideModal: Function,
    deleteItem: Function
  })

  const deleteAndHide = () => {
    const { props } = app;
    props.deleteItem()
    props.hideModal()
  }

</script>

<template>
  <div :class="[show ? '_main' : '_hidden']">
    <div class='_modal'>
      <div class='_content'>
        <p>¿Está seguro de que desea eliminar este registro? </p>
        <div class='_buttonsParent'>
          <button class='_yesBtn'  @click="deleteAndHide"> Si </button>
          <button class='_noBtn' @click="hideModal"> No </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss' src='./styles.scss'>

</style>

<script setup>
  import { reactive, onMounted, watch, getCurrentInstance } from 'vue'
  import { setStorage } from '../../utils/localStorageService'

  const state = reactive({ email: '', password: '', isValid: { email: 0, password: 0 } }) 

  const app = getCurrentInstance()
  const instance = app.appContext.config.globalProperties.$router;

  watch(
    () => state.email,
    (email, prevEmail) => {
      validateEmail(email);
    }
  )

  watch(
    () => state.password,
    (password, prevPassword) => {
      validatePassword(password);
    }
  )

  function login () {
    const { email } = state;
    const userData = { email }
    if(!localStorage.length) setStorage(userData);
    instance.push('/dashboard');
  }

  const validateEmail = (value) => {
    const regex = new RegExp(/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/)
    const isValid = regex.test(value)
    if(isValid) return state.isValid.email = 1
    state.isValid.email = 2
  }

  const validatePassword = (value) => {
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)
    const isValid = regex.test(value)
    if(isValid && state.password.length > 6) return state.isValid.password = 1
    state.isValid.password = 2
  }
  
</script>
<template>
  <div class='_general'>
    <div class='_formParent'>
      <div class='_formLeft'>
        <div class='_form'>
          <div>
            <h1 class='_title'> Sign in </h1>
            <form class="_inputsParent">
              <input 
                placeholder="Email" 
                type="email" v-model="state.email"  
                :class="[state.isValid.email == 0 || state.isValid.email == 1 ? '_input' : '_inputError']"/>
              <input 
                placeholder="Password" 
                type="password" 
                v-model="state.password" 
                :class="[state.isValid.password == 0 || state.isValid.password == 1 ? '_input' : '_inputError']"
                 />
            </form>
            <p> ¿olvidaste tu contraseña? </p>

            <button 
              @click="login"
              :class="[state.isValid.email === 1 && state.isValid.password === 1  ? '_signBtn' : '_disabledBtn']"
              :disabled="state.isValid.email === 1 && state.isValid.password === 1 ? false : true">SIGN IN</button>
          </div> 
        </div>
      </div>
      <div class='_formRight'>
        <div>
          <p> Si aún no te has registrado en power motors, hazlo ahora! </p>
          <button class='_registerBtn' > SIGN UP </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss' src='./styles.scss' />


  

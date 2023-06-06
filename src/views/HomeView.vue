<template>
  <div class="home">
    <div class="alert alert-info" v-if="alert_msg!==''" role="alert">
       {{ alert_msg }}
</div>
    <div class="search-profile">
        <img src="@/assets/github.png" alt="github" class="github">
        <h4>Enter a GitHub user name</h4>
        <form @submit.prevent="userName()">
            <input type="text" v-model="user_name" name="user_name" id="user_name">
        </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data(){
    return {
      user_name:'',
      alert_msg:'',
    }
  },
  methods:{
  async userName(){
    try{
     const res = await axios.get(`https://api.github.com/users/${this.user_name}`);
     if(res.data){
      localStorage.setItem('user_name',this.user_name);
      this.$router.push({path:`/${this.user_name}`});
    }
     }
    catch(err){
      this.alert_msg = "oops! user is not found";
    }

    }
  }
}
</script>

<style scoped>

.search-profile{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
    
.search-profile .github{
    width: 10rem;
    margin: 1rem;
}
.search-profile h4{
    font-family: 'Inter', sans-serif;
    font-size: 2rem;
    font-weight: 500;
}

.search-profile form {
    margin: 1rem;

}
.search-profile form input {
    height: 3rem;
    outline: none;
    border: none;
    padding: 1rem;
    width: 30rem;
    background: #1e2226;
    font-weight: 400;
    font-size: 32px;
    color: #5c6bc0;
}
</style>
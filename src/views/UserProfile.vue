<template>
    <div class="userview">
  <aside class="sidebar">
    <div class="profile-info">
      <img :src="user.avatar_url" alt="Profile Image" class="profile-image">
      <h2>{{ user.name }}</h2>
    <a target="_blank" :href="user.html_url">@{{ user.login }}</a>
    </div>
    <nav class="sidebar-nav">
      <div class="basic-info">
        <div class=" count-div repo-count">
            <p>{{ user.public_repos }}</p>
            <p> Repositories</p>
        </div>
        <div class=" count-div followers-count">
            <p>{{ user.followers }}</p>
            <p>Followers</p>
        </div>
        <div class=" count-div followings-count">
            <p>{{ user.following }}</p>
            <p>Following</p>
        </div>
    
      </div>
      <div class="user-info">
        <div class="company">
            <i class='bx bxs-briefcase-alt-2'></i> <p>{{ user.company }}</p>
        </div>
        <div class="joining-date-div">
            <i class='bx bx-calendar'></i> <p>{{ user.created_at }}</p>
        </div>
      </div>
    </nav>
  </aside>

  <section class="main-content">
    <nav>
        <ul>
            <li><button @click="changeComponent('OverViewComVue')" class="component-btn1">Overview</button></li>
            <li><button @click="changeComponent('RepoAnalyticsCom')" class="component-btn2">Analytics</button></li>

        </ul>
    </nav>
    
    <component :is="component"></component>
  </section>


    </div>
</template>

<script>
import axios from 'axios';
import OverViewComVue from '@/components/OverViewCom.vue';
import RepoAnalyticsCom from '@/components/RepoAnalyticsCom.vue';
export default {
    name:'UserProfile',
    components:{
        OverViewComVue,
        RepoAnalyticsCom
    },
    data(){
        return {
            component:'OverViewComVue',
            user:{},
        }
    },
    methods:{
      async fetch_user(){
        let user_name= localStorage.getItem('user_name')
        const res = await axios.get(`https://api.github.com/users/${user_name}`);
        if(res.data){
            this.user = res.data;
          
        }
       
       
       },
       changeComponent(component_name){
        this.component = component_name;
 
       }

    },
    mounted(){
        this.fetch_user();
    }
    
}
</script>

<style scoped>
.userview{
    display: flex;
}
.sidebar {
    width: 335px;
    background-color: #2D3035;
    color: #fff;
    height: 100vh;
    position: fixed;
}

.profile-info {
  text-align: center;
  padding: 10px;
}

.profile-info h2{
    font-size: 20px;
    margin:0 !important;
}
.profile-info a{
    font-size: 14px;
}
.profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
    margin: 18px 0;
    outline: none;
    border: 10px solid #0b192b;
}

.basic-info{
    display: flex;
    justify-content: space-between;
}

.basic-info p,.user-info p{
    font-weight: 400;
    font-size: 12px;
    line-height: 21px;
    font-family: 'Roboto Mono', monospace;
}
.user-info{
    margin: 10px 0;
    padding: 10px 0;
}
.user-info div {
    display: flex;
    margin: 10px 0;
    padding: 10px 0;
}
.user-info p{
    text-align: left;
    margin-left: 10px;
    font-size: 12px;
}
.main-content {
    flex: 1;
    background-color: #22252A;
    position: absolute;
    top: 0;
    left: 335px;
    width: 77%;
}

.main-content nav{
    background-color: #2D3035;
    height: 69px;
    padding: 10px;
}
.main-content nav ul {
    display: flex;
    height: 100%;
    align-items: flex-end;
}
.main-content nav ul li{
    padding-right: 50px;
    list-style: none;
}
.main-content nav ul li button{
    text-decoration: none;
    background: transparent;
    border: none;
    outline: none;
    color: #6a42bc;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    cursor: pointer;
    
}
.main-content nav ul li button:hover{
   color: #0b192b;
}
</style>
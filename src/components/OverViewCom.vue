<template>
  <div class="overview">
    <div class="sub_nav">
      <div class="heading"><h4>Top Repositories</h4></div>
      <div class="sorting-viewchanger">
        <div class="sorting">
          <select class="form-select" aria-label="Default select example">
            <option value="stars" selected>stars</option>
            <option value="forks">forks</option>
            <option value="size">size</option>
          </select>
        </div>
        <div class="view-change">
          <button><i class="bx bx-list-ul"></i></button>
          <button><i class="bx bxs-grid"></i></button>
        </div>
      </div>
    </div>
    <div class="main-menu">
      <div class="repo-card" v-for="repo in repos" :key="repo.id">
        <div class="repo-name">
          <i class="bx bx-folder-open"></i>
          <a target="_blank" :href="repo.html_url">{{ repo.name }}</a>
        </div>
      
        <div class="repo-footer">
          <div class="footer-left">
            <div class="repo-language">
              <span class="circle"></span>
              <p>{{ repo.language }}</p>
            </div>
            <div class="repo-stars">
              <i class="bx bxs-star"></i>
              <p>{{ repo.stargazers_count }}</p>
            </div>
            <div class="repo-forks">
              <i class="bx bx-git-repo-forked"></i>
              <p>{{ repo.forks_count }}</p>
            </div>
          </div>
          <div class="footer-right">
            <div class="repo-size">
              <p>{{ repo.size }} KB</p>
            </div>
          </div>
        </div>
      </div>

    

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "OverViewCom",
  data() {
    return {
      repos:[],
    };
  },
  methods: {
    async fetch_repos(){
        let user_name= localStorage.getItem('user_name')
        
        const res = await axios.get(`https://api.github.com/users/${user_name}/repos`);
        if(res.data){
            this.repos = res.data;
           
        }
       
       
       },
  },
  mounted(){
    this.fetch_repos();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.overview {
  padding: 30px;
}
.main-menu{
  display: grid;
  grid-template-columns: repeat(3,1fr);
    grid-gap: 20px;
    margin-top: 20px;
}
.sub_nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sub_nav .sorting-viewchanger {
  display: flex;
  /* background: red; */
  width: 30%;
  justify-content: space-evenly;
}
.form-select {
  width: 100px !important;
  border: 2px solid #5c6bc0;
}
.form-select option {
  color: #5c6bc0;
}
.view-change {
  width: 75px;
  height: 38px;
  border: 1.5px solid #5c6bc0;
  display: flex;
}
.view-change button {
  width: 38px;
  height: 36px;
  background: transparent;
  border: none;
  outline: none;
}

.view-change button:hover {
  background-color: #5c6bc0;
}
.repo-card {
  background-color: #5c6bc0;
    height: 7rem;
    width: 18.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.repo-card .repo-name {
  padding: 20px;
    display: flex;
    background-color: #2D3035;
    height: 60%;
    width: 100%;
    align-items: flex-start;
}
.repo-card .repo-name a {
  padding-left: 5px;
  font-size: 14px;
  line-height: 19px;
  font-weight: 400;
  font-family: 'Roboto Mono', monospace;
  text-align: left;
}
.bx-folder-open {
  font-size: larger !important;
}
.repo-card .repo-footer {
  padding: 20px;
  display: flex;
  background: #2C2E33;
  height: 40%;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #26282c;
}
.repo-card .repo-footer p {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding-left: 5px;
}
.repo-card .repo-footer .footer-left {
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: space-between;
}
.repo-card .repo-footer .footer-left .repo-language,
.repo-stars,
.repo-forks {
  display: flex;
  align-items: center;
}
.repo-card .repo-footer .footer-left .repo-language .circle {
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 50%;
}
</style>

<template>
  <div>
    <div class="most-used-language">
        <h3>Most used Language</h3>
      <canvas id="usedLang"></canvas>
    </div>
    <div class="top-language">
        <h3>Top Language</h3>
      <canvas id="topLang"></canvas>
    </div>
    <div class="most-starred-repos">
        <h3>Most Starred Repos</h3>
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";
export default {
  name: "RepoAnalyticsCom",
  data() {
    return {
      repos: [],
      language_store:{},
      language_store_total:0,
      language_percentage_store:{},
      num_language:0,
      num_language_store:{},
    };
  },
  methods: {
    async fetch_repos(labels, data,usedLang_labels,usedLang_data,topLang_labels,topLang_data) {
      let user_name = localStorage.getItem("user_name");
      const res = await axios.get(
        `https://api.github.com/users/${user_name}/repos`
      );
      if (res.data) {
        this.repos=res.data;
        for (let repo of res.data){
        const language_response = await axios.get(repo.languages_url);
        for(let language in language_response.data){

            if(!this.language_store[language]){
                this.language_store[language]=language_response.data[language];
            }else{
                this.language_store[language]+=language_response.data[language];
            }
            if(!this.num_language_store[language]){
                this.num_language_store[language]=1;
            }else{
                this.num_language_store[language]+=1;
            }
            this.num_language++;
        }
          if (repo.stargazers_count > 20) {
            labels.push(repo.name);
            data.push(Math.max(repo.stargazers_count));
          }
        }
        for(let language in this.num_language_store){
           if(this.num_language_store[language]>1){
            topLang_labels.push(language);
            topLang_data.push(this.num_language_store[language]);
           }
        }
        for(let elem in this.language_store){
         this.language_store_total+=this.language_store[elem];
        }
        for(let language in this.language_store){
            let percentage_language = (this.language_store[language]/this.language_store_total)*100;
            if(percentage_language>=1){
                this.language_percentage_store[language]= (this.language_store[language]/this.language_store_total)*100;
           usedLang_labels.push(language);
           usedLang_data.push(Math.ceil(percentage_language));
            }
          
        }
    
      }
    },
  },
 async mounted() {
    const ctx = document.getElementById("myChart");
    const usedLang = document.getElementById("usedLang");
    const topLang = document.getElementById("topLang");
    let labels = [];
    let data = [];
    let usedLang_labels=[];
    let usedLang_data=[];
    let topLang_labels=[];
    let topLang_data=[];
    await this.fetch_repos(labels, data,usedLang_labels,usedLang_data,topLang_labels,topLang_data);
    new Chart(usedLang, {
        type: 'polarArea',
      data :{
  labels: usedLang_labels,
  datasets: [{
    label: 'My First Dataset',
    data: usedLang_data,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
  }]
},
     
    });

    new Chart(topLang, {
        type: 'doughnut',
      data :{
  labels:topLang_labels,
  datasets: [{
    label: 'My First Dataset',
    data: topLang_data,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 96)',
      'rgb(255, 99, 142)',
      'rgb(54, 162, 145)',
      'rgb(255, 305, 86)'
    ],
    hoverOffset: 4
  }]
},
     
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Most starred repos",
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

   
  },
};
</script>

<style scoped>
.most-used-language,.most-starred-repos,.top-language{
    height: 40rem;
    padding: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
canvas{
    background: whitesmoke;
}
</style>

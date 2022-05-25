function about(){
    cleaner();
    CONTAINER.innerHTML= `
    <section class="d-flex justify-content-center align-items-center w-100">
        <div class="container container-fluid col-lg-4 p-3 w-100 about1">
          <h3 class="p-2 mb-3">CREATED WITH</h3>
          <img class="logos2 rounded m-3" style="height:112px"src="https://cdn.iconscout.com/icon/free/png-256/bootstrap-226077.png" alt="bootstrap logo">
          <img class="logos rounded m-3" style="height:110px"src="https://www.tel.computerservice.ie/wp-content/uploads/2020/04/1417589451_html-256.png" alt="html5 logo">
          <img class="rounded m-1 logos" style="height:110px"src="/images/css.jpg" alt="css logo">
          <br>
          <img class=" logos2 rounded m-3" style="height:115px"src="https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg" alt="the movie database api logo">
          <img class=" logos2 rounded m-3" style="height:120px"src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png">
          <img class="logos rounded m-3" style="height:115px"src="https://images.squarespace-cdn.com/content/v1/57c649658419c2380d1947be/1534825375055-OA4431YN1BZ93RTAEIZF/postman-tile.png?format=1500w">
      </div>
      <div class="container container-fluid col-4 p-3 w-100 about2 d-flex flex-column">
        <h3 class="p-2 mb-3">CREATED BY</h3>
        <div class="container d-flex justify-content-around text-center">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <h4 class="text-center mb-2">Gizem Haspolat</h4>
            <img style= "height:150px" class ="rounded-circle m-2"src="https://media-exp1.licdn.com/dms/image/C5603AQEW2FlGcGHerA/profile-displayphoto-shrink_800_800/0/1637622044999?e=1658966400&v=beta&t=A-V0EfCW9DTOHpH6xdtpBk0fNuriHqh1HNeYe2NmxUE">
            <h6><a href="https://github.com/gizemhaspolat?tab=repositories"><i class="fa fa-github" style="font-size:24px"></i> GitHub</a></h6>
            <h6><a href="https://www.linkedin.com/in/gizemhaspolat/"><i class="fa fa-linkedin-square" style="font-size:24px"></i> LinkedIn</a></h6>
            <h6><a href="mailto:gizemhaspolat@gmail.com"><i class="fa fa-envelope" style="font-size:24px"></i> e-mail me</a></h6>
            
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <h4 class="text-center mb-2">Selin Su Varol</h4>
            <img style= "height:150px"class ="rounded-circle m-2"src="/images/avatar.jpg">
            <h6><a href="https://github.com/selinsuvarol?tab=repositories"><i class="fa fa-github" style="font-size:24px"></i> GitHub</a></h6>
            <h6><a href="https://www.linkedin.com/in/selin-su-varol-664936a3/"><i class="fa fa-linkedin-square" style="font-size:24px"></i> LinkedIn</a></h6>
            <h6><a href="mailto:selinsuvarol@gmail.com"><i class="fa fa-envelope" style="font-size:24px"></i> e-mail me</a></h6>
          </div>
        </div>
    </div>
      </section>
      `
}
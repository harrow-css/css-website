<template>
  <div>
  <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Wordle Challenge</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Spring Term Computing Challenge
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4 mt-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column" style="color:white"
        >

          <h1>Build a wordle game using any method or programming language, on any topic and submit to the society heads before the end of term.</h1>
          
          <div class="my-3"></div>

          <h1>Rules</h1>
          <ul>
            <li>You can work as individuals, or as a team</li>
            <li>You can use any programming language or method</li>
            <li>You can use any topic of wordle, such as with <a href="https://www.wordle.net/">Wordle.net</a>, <a href="https://www.subwaydle.com/">Subwaydle</a>, <a href="https://london.subwaydle.com/">Roundle</a> or <a href="https://nerdlegame.com/">Nerdle</a></li>
            <li>You can use any libraries</li>
            <li>You can use any word list</li>

          </ul>

          <p>We're letting you decide the scope. You can build something simple using the Python I/O or scale it up to a full web service in JS, the sky's the limit</p>

          <h1>Deadline</h1>
          <p>Email to the society heads before the end of term on the 25th March </p>
          <p>That's {{ 

            // count days till 25th March
            Math.floor((new Date(2023, 2, 25) - new Date()) / (1000 * 60 * 60 * 24))
          }} days from now</p>

        </div>
      </div>
    </div>

    
  </div>
</template>

<style scoped>
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  border:0
}
/* a tags in white */
a {
  color: #fff;
}
</style>

<style scoped>
.secondarystyledcard > h1 {
  font-size: 2rem;
}

.secondarystyledcard > p {
  font-size: 1rem;
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
</style>

<template>
  <div>
  <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Electric Dream Challenge</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Summer Term Computing Challenge
            </p>
          </div>
        </div>
      </div>
    </div>

  <div class="row row-cols-2 g-4">
      <div class="col" style="height: 400px">
 
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(' +
              require(`~/assets/images/prusamini.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              
            </div>
          </div>
      </div>
      <div class="col" style="height: 400px">

          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(' +
              require(`~/assets/images/revopoint.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              
            </div>
          </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4 mt-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column" style="color:white"
        >

          <h1>Scan your head utilising Harrow's new 3D scanner and print it off using one of Harrow's 3d printers in DT. </h1>
          
          <div class="my-3"></div>

          <h1>Guidance</h1>
          <ul>
            <li>You can work as individuals, you can do it together, but not in teams.</li>
            <li>You can use 3d editing software to retouch your face digitally</li>
            <li>You must use the REVOPOINT 3d Scanner available in the Physics Department, Contact CMC for access</li>
            <li>You must use a PRUSA 3d printer available in the DT department, Contact the technician (Pender, L E) or a beak for help and permission</li>
            <li>Present your work to CMC before the end of term to be eligible for a prize!</li>
            <li>Try to ensure your bust has a stand, you may have to edit one in</li>
          </ul>

          <h1>Deadline</h1>
          <p>That's {{ 

            // count days till 1st July
            Math.floor((new Date(2023, 6, 1) - new Date()) / (1000 * 60 * 60 * 24))
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

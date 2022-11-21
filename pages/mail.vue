<template>
<div>

 <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Mail</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Catch up on society mail
            </p>
          </div>
        </div>
      </div>
    </div>

<div class="row align-items-md-stretch mb-4 mt-4">
      <div class="col-md-12 mb-4">

      
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >   

            <h1>Join our mailing list</h1>
          <p>
            Keep in the loop with all things about the society through our
            mailing list
          </p>

         <form method="post" action="https://listmonk.services.dylankainth.com/subscription/form" class="listmonk-form">
    <div>
        <input type="hidden" name="nonce" />
        <p><input class="form-control" type="email" name="email" required placeholder="E-mail" /></p>
        <p><input class="form-control" type="text" name="name" placeholder="Name (optional)" /></p>
      
        <p class="d-none">
          <input id="4bba4" type="checkbox" name="l" checked value="4bba4380-94ea-47be-9227-a870d1cefe95" />
          <label for="4bba4">CSS Society List</label>
        </p>
        <button class="btn btn-outline-light mt-auto" type="submit" value="Subscribe">Submit</button>
    </div>
</form>

        </div>
        


      </div>
    </div>

<div class="row align-items-md-stretch mb-4 mt-4" v-for="email in mail" v-bind:key="mail._id">
      <div class="col-md-12 mb-4">

      
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >   

            <h1>{{new Date(email.timestamp).getDate()}}/{{new Date(email.timestamp).getMonth()}}/{{new Date(email.timestamp).getFullYear()}}</h1>
            <span v-html="email.body"></span>

        </div>
        


      </div>
    </div>



</div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  async asyncData(context) {
    const mail = await context.$axios.$get(
      'getMail'
    )

    return {
      mail: mail
    }
  },
}
</script>

<style>



.secondarystyledcard > h1 {
  font-size:2rem
}

.secondarystyledcard > p {
  font-size:1rem
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7A7D7D;
  color: #fffbfe;
}
</style>
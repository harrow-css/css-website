<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Form</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Form 02: Apply for a Lecture
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
          <h1>
            <i
              >You're submiting this form as
              <u
                >{{ this.$auth.$storage.getUniversal('jwt_decoded').name }}
                {{
                  this.$auth.$storage.getUniversal('jwt_decoded').family_name
                }}</u
              ></i
            >
          </h1>

          <br />

          <h1>About You</h1>
          <h3>What year group are you in?</h3>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="U6"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Upper Sixth
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="L6"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Lower Sixth
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="Fifth"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Fifth Form
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="Remove"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Remove
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="Shell"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup"> Shell </label>
          </div>

          <h3>What house are you in?</h3>
          <div class="form-check" v-for="(initial, house) in houselist">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioHouse"
              id="RadioHouse"
              :value="initial"
              v-model="RadioHouse"
            />
            <label class="form-check-label" for="RadioHouse">
              {{ house }}
            </label>
          </div>
          



        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  transition: 0.3s;
}
</style>

<script>
export default {
  data() {
    return {
        textAreaComments: "",
        commitmentsPicked: [],
        switchGithub: false,
        timeCommitments: ["In a house/school play","doing Greenpower", "doing FTC Robotics","doing F1 in Schools", "in Choir", "in Concert Band", "in Orchestra", "part of the Maths Team","part of the Debating Team", "part of the Inter-School Trading Competition", "studying an OTT langauge" ],
        subjectsPicked: [],
        SwitchAdmaths: false,
        alvlSubjects:["Ancient History", "Fine Art","Biology","Chemistry", "Design Technology and Engineering", "Drama and Theatre", "Economics", "Business", "English Literature", "Geography", "History", "History of Art", "Latin", "Classical Greek", "Mathematics", "Further Mathematics", "Music", "Music Technology", "Photography","Physics","Politics", "Sports Science","TP"] ,
    gcseSubjects: ["Ancient History", "Art","Astronomy", "Biology", "Chemistry","Classical Greek", "Computer Science", "Design and Technology", "Drama","Geography","History", "Latin", "Music", "PE", "Physics","TP", ],
      SliderSkills: [
        {Skill:"Programming with Python", Ability:"5"},
        {Skill:"Programming with C++", Ability: "5"},
        {Skill:"Programming with Java", Ability: "5"},
        {Skill:"Programming with JavaScript", Ability: "5"},
        {Skill:"Using HTML", Ability: "5"},
        {Skill:"Styling with CSS", Ability: "5"},
        {Skill:"CAD with Onshape/Solidworks", Ability: "5"},
        {Skill:"Using Visual Studio Code", Ability: "5"},
        {Skill:"Using Microsoft Office", Ability: "5"},
        {Skill:"Using Markdown", Ability: "5"},
        {Skill:"Using LaTeX", Ability: "5"},
        {Skill:"Using Arduino", Ability: "5"},
        {Skill:"Using Raspberry Pi", Ability: "5"},
        {Skill:"Using Linux Terminals", Ability: "5"},
      ],
      SliderAspirations: [
        {Skill:"AI: Basics of Modern AI", Aspiration:"5"},
        {Skill:"AI: Neural Network Architectures", Aspiration: "5"},
        {Skill:"AI: Optimisation Algorithms", Aspiration: "5"},
        {Skill:"AI: Computer Vision", Aspiration: "5"},
        {Skill:"AI: Natural Language Processing", Aspiration: "5"},
        {Skill:"AI: Reinforcement Learning", Aspiration: "5"},
        {Skill:"AI: Applications of AI", Aspiration: "5"},

        {Skill:"DEV: Building Websites", Aspiration: "5"},
        {Skill:"DEV: Building Apps", Aspiration: "5"},
        {Skill:"DEV: Building Automation Scripts", Aspiration: "5"},   
        {Skill:"DEV: Building Games", Aspiration: "5"},
        {Skill:"DEV: Building Servers", Aspiration: "5"},

        {Skill:"HARDWARE: building PCs", Aspiration: "5"},
        {Skill:"HARDWARE: setting up/overclocking PCs", Aspiration: "5"},
        {Skill:"HARDWARE: building PCs", Aspiration: "5"},

        {Skill:"ELECTRONICS: building PCBs", Aspiration: "5"},

        {Skill:"OTHER: testing VR/AR (virtual reality)", Aspiration: "5"},
      ],
      InputMathDiv: 5,
      RadioYearGroup: this.$auth.$storage
        .getUniversal('jwt_decoded')
        .name.split('(')[1]
        .split(')')[0]
        .split('-')[1],
      houselist: {
        'West Acre': 'W',
        Newlands: 'N',
        Bradbys: 'B',
        'The Park': 'P',
        Moretons: 'M',
        Druries: 'D',
        "The Headmaster's": 'H',
        'The Grove': 'G',
        Rendalls: 'R',
        'The Knoll': 'K',
        Elmfield: 'E',
        Lyons: 'L',
      },
      RadioHouse: this.$auth.$storage
        .getUniversal('jwt_decoded')
        .name.split('(')[1]
        .split(')')[0]
        .split('-')[0],
    }
  },
  mounted() {
    console.log(
      this.$auth.$storage
        .getUniversal('jwt_decoded')
        .name.split('(')[1]
        .split(')')[0]
    )
  },
  middleware: 'isAuthenticated'
}
</script>

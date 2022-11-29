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
              Form 01: Apply for a Project
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

          <h1 class="mt-5">Your Skills</h1>

          <h3>On a scale of 1-10, how good are you at the following?</h3>
          0 is not confident, 10 is very confident

          <table class="table" style="color:inherit;">
            <thead>
              <tr>
                <th>Skill</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sliderskill in SliderSkills">
                <th style="font-weight:lighter">{{sliderskill['Skill']}}</th>
                <td>
                  <input
                    type="range"
                    class="form-range"
                    min="0"
                    max="10"
                    step="1"
                    id="SliderSkill"
                    v-model="sliderskill['Ability']"
                  />
                  
                </td>
                <td>
                {{sliderskill['Ability']}}/10
                </td>
              </tr>
            </tbody>
          </table>

          <h1 class="mt-5">A grasp of your ability</h1>
          <div v-if="RadioYearGroup=='Shell' || RadioYearGroup=='Remove' || RadioYearGroup=='Fifth'">
            <h3 class="mt-2">What Maths division are you currently in?</h3>
              <input type="number" class="form-control" placeholder="" max="9" min="1" style="width:60px" v-model="InputMathDiv">
            
            <div v-if="RadioYearGroup=='Fifth' || RadioYearGroup=='Remove'">
                <h3 class="mt-2">What GCSE's did you pick from this list?</h3>

                <div class="form-check" v-for="subject in gcseSubjects.sort()">
                    <input class="form-check-input" type="checkbox" :value="subject" id="flexCheckDefault" v-model="subjectsPicked">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{subject}}
                    </label>
                </div>

                <h3 class="mt-2">Are you planning to take FSMQ AdMaths?</h3>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="SwitchAdmaths">
                    <label class="form-check-label" for="flexSwitchCheckChecked"><span v-if="!SwitchAdmaths">No</span><span v-if="SwitchAdmaths">Yes</span></label>
                </div>
            </div>
   

          </div>

          <div v-if="RadioYearGroup=='U6' || RadioYearGroup=='L6'">

            <h3 class="mt-2">What A-Levels did you pick from this list?</h3>

                <div class="form-check" v-for="subject in alvlSubjects.sort()">
                    <input class="form-check-input" type="checkbox" :value="subject" id="flexCheckDefault" v-model="subjectsPicked">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{subject}}
                    </label>
                </div>

            <div v-if="subjectsPicked.includes('Mathematics')">
            <h3 class="mt-2">What Maths division are you currently in?</h3>
              <input type="number" class="form-control" placeholder="" max="9" min="1" style="width:60px" v-model="InputMathDiv">
              </div>

          </div>

          <h1 class="mt-5">Your existing time commitments</h1>
          <h3>Are you currently...</h3>
          <div class="form-check" v-for="commitment in timeCommitments">
            <input class="form-check-input" type="checkbox" :value="commitment" id="flexCheckDefault" v-model="commitmentsPicked">
            <label class="form-check-label" for="flexCheckDefault">
                {{commitment}}
            </label>
        </div>

        <h1 class="mt-5">Your Interests</h1>
          <h3>On a scale of 1-10, how interested are you in the following?</h3>
          0 is not interested, 10 is very interested

          <table class="table" style="color:inherit;">
            <thead>
              <tr>
                <th>Interest</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="aspiration in SliderAspirations">
                <th style="font-weight:lighter">{{aspiration['Skill']}}</th>
                <td>
                  <input
                    type="range"
                    class="form-range"
                    min="0"
                    max="10"
                    step="1"
                    id="SliderSkill"
                    v-model="aspiration['Aspiration']"
                  />
                  
                </td>
                <td>
                {{aspiration['Aspiration']}}/10
                </td>
              </tr>
            </tbody>
          </table>

            <h1 class="mt-5">Wrapping up</h1>
            <h3>Do you have a Github account?</h3>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="switchGithub">
                <label class="form-check-label" for="flexSwitchCheckChecked"><span v-if="!switchGithub">No</span><span v-if="switchGithub">Yes</span></label>
            </div>

            <h3>Any Further Comments?</h3>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="textAreaComments"></textarea>


            <button class="my-3 btn btn-primary" style="width:10vw">Submit</button>

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

<template>
  <div>
    <div class="submit-result">
      <h1>Interview Review</h1>
      <br>
      <div class="row">
        <div class="col-sm-10 offset-sm-1">
          <router-link to="/" style="float: right; background: blue; color: white" tag="button"><b>Go Back</b></router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-10 offset-sm-1">
          <b-card class="mt-2" border-variant="primary" header="Interview Form" header-bg-variant="primary" header-text-variant="white" header-class="header">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                  id="input-group-1"
                  label="Interview Type:"
                  label-for="input-1"
                  label-align="left"
              >
                <b-form-select v-model="form.interviewType" :options="interviewType" required :disabled="operation"></b-form-select>
              </b-form-group>

              <b-form-group id="input-group-2" label="Phase:" label-for="input-2" label-align="left">
                <b-form-select v-model="form.phase" :options="phase" required :disabled="operation"></b-form-select>
              </b-form-group>

              <b-form-group id="input-group-3" label="Interview Date:" label-for="input-3" label-align="left">
                <b-form-datepicker id="example-datepicker" v-model="form.interviewDate" class="mb-2" style="text-align: left" required :disabled="operation"></b-form-datepicker>
              </b-form-group>

              <b-form-group id="input-group-3" label="Interviewee:" label-for="input-3" label-align="left">
                <b-form-select v-model="form.interViewee" :options="interviewee" required :disabled="operation"></b-form-select>
              </b-form-group>

              <b-form-group id="input-group-3" label="Interviewee:" label-for="input-3" label-align="left">
                <b-form-select v-model="form.chosenInterviewer" :options="interviewer" multiple :select-size="4" ></b-form-select>
                <div class="mt-3" v-if="!operation">Selected Interviewers: <strong>{{ form.chosenInterviewer.map(item => item['name']) }}</strong></div>
              </b-form-group>

              <b-form-group id="input-group-2" label="Score:" label-for="input-2" label-align="left">
                <b-form-input
                    id="input-2"
                    v-model="form.score"
                    type="text"
                    placeholder="Enter Score"
                    required
                    :disabled="resultAndScoreDisable"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Result:" label-for="input-2" label-align="left">
                <b-form-select v-model="form.result" :options="interviewResult" required :disabled="resultAndScoreDisable"></b-form-select>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import axios from "axios";

@Component
export default class SubmitResult extends Vue{
  interviewee = []
  interviewer = []
  phase = [
    { value: null, text: 'Select a phase'},
    { value: '1st phase', text: '1ST PHASE'},
    { value: '2nd phase', text: '2ND PHASE'},
    { value: 'final phase', text: 'FINAL PHASE'},
  ]
  interviewType = [
    { value: null, text: 'Select a type'},
    { value: 'technical', text: 'Technical'},
    { value: 'hr', text: 'HR'},
  ]
  interviewResult = [
    { value: null, text: 'Select result'},
    { value: true, text: 'Passed'},
    { value: false, text: 'Failed'},
  ]
  form = {
    id: null,
    interviewType: null,
    phase: null,
    interviewDate: null,
    interViewee: null,
    chosenInterviewer: [],
    score: null,
    result: null,
  }
  operation = true;
  resultAndScoreDisable = false
  show = true
  async created() {
    try {
      const interviewDetails = await axios.get('http://localhost:8087/api/interview/' + this.$route.params.id.split('&')[0])
      if (this.$route.params.id.split('&')[1] === 'S') {
        this.operation = true;
        this.setInterviewerAndInterviewee(interviewDetails)
      } else if (this.$route.params.id.split('&')[1] === 'E') {
        this.operation = false
        const interviewee = await axios.get('http://localhost:8087/api/interviewee')
        const interviewer = await axios.get('http://localhost:8087/api/interviewer')
        this.interviewee = interviewee.data.map(item => {
          return {
            value: { id: item['id']},
            text: item['name'],
          }
        })
        this.interviewer = interviewer.data.map(item => {
          return {
            value: { id: item['id'], name: item['name'] },
            text: item['name']
          }
        })
        this.interviewee.unshift({value: null, text: 'Select an interviewee'})
        this.resultAndScoreDisable = true
      } else {
        this.operation = true
        this.setInterviewerAndInterviewee(interviewDetails)
      }
      this.patchData(interviewDetails);
    } catch (e) {
      console.error(e)
    }
  }
  onSubmit(event) {
    event.preventDefault()
    if (this.form.score > 10) {
      this.showError('Score cannot exceed 10')
    } else {
      const res = axios.put('http://127.0.0.1:8087/api/interview', this.form);
      res.then(value => {
        if (value.status === 200) {
          this.$bvToast.toast(`Successfully Saved`, {
            title: 'Interviewee',
            autoHideDelay: 5000,
            variant: 'success',
            appendToast: true
          })
          setTimeout(() => {
            this.$router.push('/');
          }, 3000)

        }
      }).catch((error) => {
        this.showError('Failed to Submit')
      })
    }
  }
  onReset(event) {
    event.preventDefault()
    if (this.$route.params.id.split('&')[1] === 'E') {
      this.form.score = null
      this.form.result = null
      this.form.chosenInterviewer = []
      this.form.interViewee = null
      this.form.interviewDate = null
      this.form.phase = null
      this.form.interviewType = null
    }
    this.form.score = null
    this.form.result = null
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }
  patchData(data) {
    this.form.id = data.data.id
    this.form.interviewType = data.data.interviewType
    this.form.phase = data.data.phase
    this.form.interviewDate = data.data.interviewDate
    this.form.score = data.data.score
    this.form.result = data.data.result
    this.form.interViewee = { id: data.data.interViewee.id }
    this.form.chosenInterviewer = data.data.chosenInterviewer.map(item => {
      return {
       id: item['id'],
        name: item['name']
      }
    })
    console.log(this.form)
  }

  setInterviewerAndInterviewee(interviewee) {
    this.interviewee = [
      { value: {id: interviewee.data.interViewee.id}, text: interviewee.data.interViewee.name},
    ]
    this.interviewer = interviewee.data.chosenInterviewer.map(item => {
      return {
        value: { id: item['id'], name: item['name'] },
        text: item['name']
      }
    })
  }

  showError(message) {
    this.$bvToast.toast(message, {
      title: 'Interview',
      autoHideDelay: 5000,
      variant: 'danger',
      appendToast: true
    })
  }
}
</script>

<style scoped>

</style>

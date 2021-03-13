<template>
  <div class="create-interviewee">
    <h1>Create Interview</h1>
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
              <b-form-select v-model="form.interviewType" :options="interviewType" required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-2" label="Phase:" label-for="input-2" label-align="left">
              <b-form-select v-model="form.phase" :options="phase" required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="Interview Date:" label-for="input-3" label-align="left">
              <b-form-datepicker id="example-datepicker" v-model="form.interviewDate" class="mb-2" style="text-align: left" required></b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-3" label="Interviewee:" label-for="input-3" label-align="left">
              <b-form-select v-model="form.interViewee" :options="interviewee" required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="Interviewer:" label-for="input-3" label-align="left">
              <b-form-select v-model="form.chosenInterviewer" :options="interviewer" multiple :select-size="4" required></b-form-select>
              <div class="mt-3">Selected Interviewers: <strong>{{ form.chosenInterviewer.map(item => item['name']) }}</strong></div>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>

import { Component, Vue } from "vue-property-decorator";
import axios from "axios";


@Component
export default class CreateInterview extends Vue {
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
  form = {
    interviewType: null,
    phase: null,
    interviewDate: null,
    interViewee: null,
    chosenInterviewer: [],
  }
  show = true
  async created() {
    try {
      const interviewee = await axios.get('http://localhost:8087/api/interviewee');
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
    } catch (e) {
      console.error(e)
    }
  }
  onSubmit(event) {
    event.preventDefault()
    const res = axios.post('http://127.0.0.1:8087/api/interview', this.form);
    res.then(value => {
      if (value.status === 200) {
        this.$bvToast.toast(`Successfully Created`, {
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
      this.$bvToast.toast(`Failed to create`, {
        title: 'Interviewee',
        autoHideDelay: 5000,
        variant: 'danger',
        appendToast: true
      })
    })
  }
  onReset(event) {
    event.preventDefault()
    this.form.interviewType = null
    this.form.chosenInterviewer = []
    this.form.interViewee = null
    this.form.interviewDate = null
    this.form.phase = null
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }
}
</script>

<style scoped>
.header{
  font-size: 25px;
}
</style>

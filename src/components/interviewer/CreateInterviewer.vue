<template>
  <div class="interviewer">
    <h1>Create Interviewer</h1>
    <br>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <router-link to="/show-interviewer" style="float: right; background: blue; color: white" tag="button"><b>Go Back</b></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <b-card class="mt-2" border-variant="primary" header="Interviewer Form" header-bg-variant="primary" header-text-variant="white" header-class="header">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Interviewer Name:"
                label-for="input-1"
                label-align="left"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter Interviewer Name"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Employee ID:" label-for="input-2" label-align="left">
              <b-form-input
                  id="input-2"
                  v-model="form.employeeId"
                  type="text"
                  placeholder="Enter Employee ID"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Position:" label-for="input-2" label-align="left">
              <b-form-input
                  id="input-2"
                  v-model="form.position"
                  type="text"
                  placeholder="Enter Employee Position"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Experience Period:" label-for="input-3" label-align="left">
              <b-form-input
                  id="input-3"
                  v-model="form.experiencePeriod"
                  type="text"
                  placeholder="Enter Experience Period"
                  required
              ></b-form-input>
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
export default class CreateInterviewer extends Vue {
  form = {
    employeeId: '',
    name: '',
    position: '',
    experiencePeriod: '',
  }
  show = true
  onSubmit(event) {
    event.preventDefault()
    if (this.form.name.length > 20) {
      this.showError('Interviewer Name cannot exceed 20 charecters')
    } else if (this.form.experiencePeriod > 100) {
      this.showError('Experience cannot exceed 100 years')
    } else if (this.form.position.length > 30) {
      this.showError('Position cannot exceed 30 characters')
    }  else if (this.form.employeeId.length > 10) {
      this.showError('Employee ID cannot exceed 10 characters')
    } else {
      const res = axios.post('http://127.0.0.1:8087/api/interviewer', this.form);
      res.then(value => {
        if (value.status === 200) {
          this.$bvToast.toast(`Successfully Created`, {
            title: 'Interviewee',
            autoHideDelay: 5000,
            variant: 'success',
            appendToast: true
          })
          setTimeout(() => {
            this.$router.push('/show-interviewer');
          }, 3000)
        }
      }).catch((error) => {
        this.showError('Failed to create')
      })
    }
  }
  onReset(event) {
    event.preventDefault()
    this.form.position = ''
    this.form.name = ''
    this.form.experiencePeriod = ''
    this.form.employeeId = ''
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }

  showError(message) {
    this.$bvToast.toast(message, {
      title: 'Interviewer',
      autoHideDelay: 5000,
      variant: 'danger',
      appendToast: true
    })
  }
}
</script>

<style scoped>
.header{
  font-size: 25px;
}
</style>

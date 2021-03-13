<template>
  <div class="edit-interviewee">
    <h1>Edit Interviewee</h1>
    <br>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <router-link to="/show-interviewee" style="float: right; background: blue; color: white" tag="button"><b>Go Back</b></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <b-card class="mt-2" border-variant="primary" header="Interviewee Form" header-bg-variant="primary" header-text-variant="white" header-class="header">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Interviewee Name:"
                label-for="input-1"
                label-align="left"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter Interviewee Name"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="University:" label-for="input-2" label-align="left">
              <b-form-input
                  id="input-2"
                  v-model="form.versityName"
                  type="text"
                  placeholder="Enter University Name"
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
import {Component, Vue} from "vue-property-decorator";
import axios from "axios";

@Component
export default class EditInterviewee extends Vue{
  form = {
    id: '',
    versityName: '',
    name: '',
    experiencePeriod: '',
    intervieweeId: ''
  }
  show = true

  async created() {
    try {
      const res = await axios.get('http://localhost:8087/api/interviewee/' + this.$route.params.id);
      this.patchData(res)
    } catch (e) {
      console.error(e);
    }
  }
  onSubmit(event) {
    event.preventDefault()
    if (this.form.name.length > 20) {
      this.showError('Interviewee Name cannot exceed 20 charecters')
    } else if (this.form.experiencePeriod > 100) {
      this.showError('Experience cannot exceed 100 years')
    } else if (this.form.versityName.length > 50) {
      this.showError('University Name cannot exceed 30 characters')
    } else {
      const res = axios.put('http://localhost:8087/api/interviewee', this.form);
      res.then(value => {
        if (value.status === 200) {
          this.$bvToast.toast(`Successfully Updated`, {
            title: 'Interviewee',
            autoHideDelay: 5000,
            variant: 'success',
            appendToast: true
          })
          setTimeout(() => {
            this.$router.push('/show-interviewee');
          }, 3000)
        }
      }).catch((error) => {
        this.showError('Failed to update')
      })
    }
  }
  onReset(event) {
    event.preventDefault()
    // Reset our form values
    this.form.versityName = ''
    this.form.name = ''
    this.form.experiencePeriod = ''
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }

  patchData(data) {
    this.form.id = data.data.id
    this.form.versityName = data.data.versityName
    this.form.name = data.data.name
    this.form.experiencePeriod = data.data.experiencePeriod
    this.form.intervieweeId = data.data.intervieweeId
  }

  showError(message) {
    this.$bvToast.toast(message, {
      title: 'Interviewee',
      autoHideDelay: 5000,
      variant: 'danger',
      appendToast: true
    })
  }
}
</script>

<style scoped>

</style>

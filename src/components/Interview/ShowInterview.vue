<template>
  <div class="interview">
    <h2>Interview List</h2>
    <br>
    <div class="row">
      <div class="col-sm-3 offset-sm-1">
        <router-link to="/show-interviewer" style="float: left; background: chartreuse" tag="button"><b>Manage Interviewer</b></router-link>
      </div>
      <div class="col-sm-4">
        <router-link to="/create-interview" style=" background: crimson" tag="button"><b>Create Interview</b></router-link>
      </div>
      <div class="col-sm-3">
        <router-link to="/show-interviewee" style="float: right; background: cornflowerblue" tag="button"><b>Manage Interviewee</b></router-link>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-11">
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
                label="Filter"
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                ></b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
                v-model="sortDirection"
                label="Filter On"
                description="Leave all unchecked to filter on all data"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
                v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                  v-model="filterOn"
                  :aria-describedby="ariaDescribedby"
                  class="mt-1"
              >
                <b-form-checkbox value="interviewee">Interviewee</b-form-checkbox>
                <b-form-checkbox value="interviewType">Interview Type</b-form-checkbox>
                <b-form-checkbox value="phase">Phase</b-form-checkbox>
                <b-form-checkbox value="result">Result</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <b-table striped head-variant="dark" :filter="filter" :filter-included-fields="filterOn" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" bordered hover :items="interviewList" responsive="sm">
          <template #cell(actions)="row">
            <b-button v-if="row.item.action.res !== null" size="sm" v-bind:to="'/update-interview/' + row.item.action.id + '&R'">
              Review Result
            </b-button>&nbsp;&nbsp;
            <b-button v-if="row.item.action.res === null" size="sm" v-bind:to="'/update-interview/' + row.item.action.id + '&E'">
              Edit
            </b-button>&nbsp;&nbsp;
            <b-button v-if="row.item.action.res === null" size="sm" v-bind:to="'/update-interview/' + row.item.action.id + '&S  '">
              Submit Result
            </b-button>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from "axios";
import moment from 'moment';

@Component
export default class ShowInterview extends Vue {
  @Prop() private msg!: string;
  interviewList = [];
  sortBy = 'sl'
  sortDesc = false
  id = ''
  sortDirection = 'asc'
  filterOn = []
  filter = null
  fields = [
    { key: 'sl', sortable: true },
    { key: 'interviewee', sortable: true },
    { key: 'interviewType', sortable: false },
    { key: 'interviewers', sortable: false },
    { key: 'interviewDate', sortable: true },
    { key: 'phase', sortable: false },
    { key: 'score', sortable: true },
    { key: 'result', sortable: false },
    { key: 'actions', label: 'Actions' }
  ]
  async created() {
    try {
      const res = await axios.get('http://localhost:8087/api/interview');

      this.interviewList = res.data.map((item: any, index: number) => {
        this.id = item['id'];
        return {
          sl: index + 1,
          interviewee: item['interViewee'].name,
          interviewType: item['interviewType'],
          interviewers: item['chosenInterviewer'].map((iterviewer: any) => {
            return iterviewer['name']
          }),
          interviewDate: item['interviewDate'] ? this.formatDate(item['interviewDate']) : '-',
          phase: item['phase'],
          score: item['score'] ? item['score'] : '-',
          result: item['result'] ? 'Passed' : item['result'] === false ? 'Failed' : 'Not Published',
          action: { id: item['id'], res: item['result'] }
        }
      });

    } catch (e) {
      console.error(e);
    }
  }

  formatDate(value: any) {
    if (value) {
      return moment(String(value)).format('DD/MM/YYYY hh:mm')
    }
  }

  createInterview(): void {
    alert("button clicked")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

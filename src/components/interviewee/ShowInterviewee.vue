<template>
  <div class="interviewee">
    <h2>Interviewee List</h2>
    <div class="row">
      <div class="offset-1 col-sm-3">
        <router-link to="/create-interviewee" style="float: left; background: cornflowerblue" tag="button"><b>Create Interviewee</b></router-link>
      </div>
      <div class="col-sm-7">
        <router-link to="/" style="float: right; background: cornflowerblue" tag="button"><b>Go Home</b></router-link>
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
                <b-form-checkbox value="intervieweeName">Interviewee Name</b-form-checkbox>
                <b-form-checkbox value="intervieweeId">Interviewee ID</b-form-checkbox>
                <b-form-checkbox value="universityName">University</b-form-checkbox>
                <b-form-checkbox value="experiencePeriod">Experience</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <b-table striped head-variant="dark" :filter="filter" :filter-included-fields="filterOn" bordered hover :items="intervieweeList" :fields="fields" :sort-by.sync="sortBy">
          <template #cell(actions)="row">
            <b-button size="sm" v-bind:to="'/update-interviewee/' + row.item.action.id">
              Edit
            </b-button>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>

import {Component, Vue} from "vue-property-decorator";
import axios from "axios";
import moment from 'moment';

@Component
export default class ShowInterviewee extends Vue{
  intervieweeList = [];
  sortDirection = 'asc'
  filterOn = []
  filter = null
  sortBy = 'sl'
  fields = [
    { key: 'sl', sortable: true },
    { key: 'intervieweeName', sortable: true },
    { key: 'intervieweeId', sortable: false },
    { key: 'universityName', sortable: false },
    { key: 'experiencePeriod', sortable: true },
    { key: 'actions', label: 'Actions' }
  ]
  async created() {
    try {
      const res = await axios.get('http://localhost:8087/api/interviewee');
      this.intervieweeList = res.data.map((item, index) => {
        return {
          sl: index + 1,
          intervieweeName: item['name'],
          intervieweeId: item['intervieweeId'],
          universityName: item['versityName'],
          experiencePeriod: item['experiencePeriod'] + ' Yrs',
          action: { id: item['id']}
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped>

</style>

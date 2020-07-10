<template>
    <v-layout class="align-center layout px-4" >
      <v-tabs dark show-arrows background-color="primary darken-1" v-model="tab" :height="46">
        <v-tabs-slider color="primary lighten-3" />
        
        <v-tab to="/system/dict">Item One</v-tab>
        <v-btn x-small circle tile text dark size="24" class="mt-3" style="margin-left: -24px;">
          <v-icon left size="16" class="ma-0 pa-0">fa-close</v-icon>
        </v-btn>
        <v-tab to="/system/param">Item Two</v-tab>
        <v-btn x-small circle tile text dark size="10" class="mt-3" style="margin-left: -20px;">
          <v-icon left size="16" class="ma-0 pa-0">fa-close</v-icon>
        </v-btn>
        <v-tab to="/system/user">Item Three</v-tab>
        <v-btn x-small circle tile text dark size="10" class="mt-3" style="margin-left: -20px;">
          <v-icon left size="16" class="ma-0 pa-0">fa-close</v-icon>
        </v-btn>

        <v-tab href="#tab-4">Item Four</v-tab>
        <v-tab href="#tab-5">Item Five</v-tab>
        <v-tab href="#tab-6">Item Six</v-tab>

        <v-tab>Item 1</v-tab>
        <v-tab>Item 2</v-tab>
        <v-tab>Item 3</v-tab>
        <v-tab>Item 4</v-tab>
        <v-tab>Item 5</v-tab>
        <v-tab>Item 6</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-4">
          <v-card flat>
            <v-card-text>
              <h2>tab-4</h2>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-5">
          <v-card flat>
            <v-card-text>
              <h2>tab-5</h2>
              bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-6">
          <v-card flat>
            <v-card-text>
              <h2>tab-6</h2>
              vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-layout>
</template>

<script>
export default {
  name: 'AppTabs',
  data() {
    return {
      tab: 'tab-5',
    }
  },
  watch: {
    '$route.path': function (newVal) {
    },
  },
  methods: {
    
  },
  created () {
    
  },
}
</script>

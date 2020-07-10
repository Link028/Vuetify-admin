<template>
 <v-container grid-list-lg fluid>
 <v-layout row wrap>
 <v-flex xs12>
  <sql-editor
    v-model="sqlText"
    placeholder=""
  />
  </v-flex>
  </v-layout>
 </v-container>
</template>

<script>
import SqlEditor from './editors/SqlEditor.vue';

export default {
  name: 'SqlEditorComponent',
  components: {
    SqlEditor,
  },
  data() {
    return {
      sqlText: 'CREATE UNIQUE INDEX index_name \nON table_name (column_name)',
    };
  },
};
</script>

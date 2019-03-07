<template>
    <v-dialog v-model="data.open" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>
          This will delete {{data.text}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                flat="flat"
                @click="close"
            >
                Cancel
            </v-btn>
          <v-btn flat color="green darken-1" :loading="data.loading" :disabled="data.loading" @click="onClick">
                Delete
                <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </template>
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['data', 'close', 'onClick']
}
</script>

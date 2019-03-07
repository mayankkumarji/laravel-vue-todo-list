<template>
    <v-snackbar
        v-model="data.show"
        :color="data.color"
        :timeout=6000
    >
      {{ data.text }}
      <v-btn
        dark
        flat
        @click="close"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props: ['data', 'close']
}
</script>

<template>
    <v-dialog v-model="data.open" persistent max-width="500px">
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{data.title}}</div>
                </div>
            </v-card-title>
            <v-card-text>
                <v-text-field :label="data.label" v-model="data.value"></v-text-field>
                <small class="red--text">* field is required</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="error" @click="close">close</v-btn>                
                <v-btn flat color="primary" :loading="data.loading" :disabled="data.loading || !data.value" @click="onClick">
                    {{data.buttonText}}
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
    props: ['data', 'onClick', 'close']
}
</script>

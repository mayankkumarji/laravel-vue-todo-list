<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn
                fab
                small
                color="primary accent-2"
                bottom
                left
                absolute
                @click="onClick"
                v-on="on"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </template>
        <span>{{toolTipText}}</span>
    </v-tooltip>
</template>

<script>
export default {
    props: ['onClick', 'toolTipText']
}
</script>


<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 lg12 mb-3>
                <v-list two-line subheader>
                    <v-expansion-panel popout focusable>
                        <v-expansion-panel-content
                            v-for="category in categories"
                            :key="category.id"
                        >
                            <template v-slot:header>
                                <v-list-tile-action class="list-button" v-on:click.stop="() => updateCategory(category)">
                                    <v-btn fab dark small color="primary">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                                <v-list-tile-action class="list-button" v-on:click.stop="() => deleteCategory(category)">
                                    <v-btn fab dark small color="red">
                                        <v-icon>delete</v-icon>
                                    </v-btn>    
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title class="text-capitalize">{{category.name}}</v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <span class="text-uppercase primary--text"> total: {{total(category.task_list)}} </span> | 
                                        <span class="text-uppercase success--text"> Completed: {{completed(category.task_list)}} </span> | <span class="text-uppercase red--text"> Todo: {{total(category.task_list) - completed(category.task_list)}} </span>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </template>
                            <v-card>
                                <task :tasks="category.task_list"
                                :category="category" :openUpdateDialog="openUpdateDialog" :openConfirmBox="openConfirmBox" :addEditTask="addEditTask"/>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Task from '../Task'

export default {
    data() {
        return {
            defaultUpdateData: {
                open: true,
                buttonText: "Update Category",
                title: "Update Category",
                label: "category name",
                loading: false,
                type: 'category'
            },
            defaultDeleteData: {
                open: true,
                type: 'category'
            }
        }
    },
    props: ['categories', 'openUpdateDialog', 'openConfirmBox', 'addEditTask'],
    components: {
        Task
    },
    methods: {
        total(tasks) {
            return tasks.length
        },
        completed(tasks) {
            return tasks.filter(task => task.is_completed).length
        },
        updateCategory (category) {
            this.openUpdateDialog({                
                id: category.id,
                value: category.name,
                ...this.defaultUpdateData
            })
        },
        deleteCategory (category) {
            this.openConfirmBox({
                id: category.id,
                text: `${category.name} category!`,
                ...this.defaultDeleteData
            })
        }
    }
}
</script>

<style>
    .list-button {
        flex: 0!important
    }
</style>

<template>
    <v-list
        subheader
        two-line
    >
   <v-list-tile v-if="!tasks.length">
            <v-list-tile-content >
                <v-list-tile-title>No task found</v-list-tile-title>
            </v-list-tile-content>
   </v-list-tile>
    <div v-for="task in tasks" :key="task.id" v-else>
        <circular-progress v-show="task.loading"/>
        <v-list-tile @click="() => updateTaskStatus(task)">
            <v-list-tile-action>
                <v-checkbox v-model="task.is_completed"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="task.is_completed = !task.is_completed">
                <v-list-tile-title>{{task.title}}</v-list-tile-title>
            </v-list-tile-content>
             <v-list-tile-action class="list-button" v-on:click.stop="() => addUpdateTask(defaultUpdateData, task)">
                <v-btn fab dark small color="primary">
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-list-tile-action>
            <v-list-tile-action class="list-button" v-on:click.stop="() => deleteTask(task)">
                <v-btn fab dark small color="red">
                    <v-icon>delete</v-icon>
                </v-btn>    
            </v-list-tile-action>
        </v-list-tile>
    </div>
    <div class="fab-button">
        <icon-button :onClick="() => addUpdateTask(defaultData)" toolTipText="Add Task"/>
    </div>
    </v-list>
</template>

<script>
import CircularProgress from '../share/CircularProgress'
import IconButton from '../share/IconButton'

export default {
    props: ['tasks', 'openUpdateDialog', 'openConfirmBox', 'category', 'addEditTask'],
    data () {
        return {
            defaultData: {
                open: true,
                value: null,
                buttonText: "Add Task",
                title: "Add New Task",
                label: "Task name",
                loading: false,
                type: 'task'
            },
            defaultUpdateData: {
                open: true,
                buttonText: "Update Task",
                title: "Update Task",
                label: "Task name",
                loading: false,
                type: 'task'
            },
            defaultDeleteData: {
                open: true,
                type: 'task'
            }
        }
    },
    components: {
        CircularProgress,
        IconButton
    },
    methods: {
        addUpdateTask(data, task) {
            if (task) {
                data = {...data, id: task.id, value: task.title, is_completed: task.is_completed}
            }
            this.openUpdateDialog({...data, categoryId: this.category.id})
        },
        deleteTask(task) {
             this.openConfirmBox({
                id: task.id,
                text: `${task.title} task of ${this.category.name} category!`,
                categoryId: this.category.id,
                ...this.defaultDeleteData
            })
        },
        updateTaskStatus (task) {
            this.addEditTask({...task, value: task.title, categoryId: this.category.id})
        }
    }
}
</script>

<style scoped lang="scss">
    .fab-button {
        position: relative;
        height: 25px;
        margin-top: 20px;
    }
</style>

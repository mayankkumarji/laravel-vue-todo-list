<template>
  <v-card flat>
    <v-toolbar
      color="primary"
      dark
      extended
      flat
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{appName}}</v-toolbar-title>
    </v-toolbar>

    <v-layout row pb-2>
      <v-flex xs8 offset-xs2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">{{title}}</v-toolbar-title>

            <v-spacer></v-spacer>
                <icon-button :onClick="() => openUpdateDialog({...this.defaultDialogData(), open: true})" toolTipText="Add Category"/>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            </v-toolbar>

            <v-divider></v-divider>

            <v-card-text>
                <categories :categories="categories" :openUpdateDialog="openUpdateDialog" :openConfirmBox="openConfirmBox" :addEditTask="addEditTask" />
            </v-card-text>
            <template>
                <div class="text-xs-center">
                    <v-pagination
                    v-model="pagination.currentPage"
                    :length="pagination.length"
                    :total-visible="7"
                    @input="getCategories"
                    ></v-pagination>
                </div>
            </template>
        </v-card>
      </v-flex>
    </v-layout>
    <add-dialog 
        :onClick="onAddEdit"
        :close="closeDialog"
        :data="dialog"
    />
    <snackbar
        :close="closeSnackbar"
        :data="snackbar"
    />
    <confirm-box
        :onClick="onDelete"
        :close="closeConfirmBox"
        :data="confirmBox"
    />
  </v-card>
</template>

<script>
import Categories from '../Categories'
import AddDialog from '../share/Dialog'
import Snackbar from '../share/Snackbar'
import ConfirmBox from '../share/ConfirmBox'
import IconButton from '../share/IconButton'

import {request} from '../../utils'

export default {
    data () {
        return {
            appName: 'TODO Laravel Vue App',
            title: 'TODO List',
            categories: [],
            dialog: this.defaultDialogData(),
            snackbar: this.defaultSnackbarData(),
            confirmBox: this.defaultConfirmBoxData(),
            pagination: {
                currentPage: 1,
                length: 1
            }
        }
    },
    components: {
        Categories,
        AddDialog,
        Snackbar,
        ConfirmBox,
        IconButton
    },
    created() {
         this.getCategories(1)
    },
    methods: {
        getCategories (page) {
            request.get('/api/categories', {page})
            .then(res => {
                this.pagination = {
                    currentPage: res.current_page,
                    length: res.last_page
                }
                this.categories = res.data
            } )
        },
        defaultDialogData () {
            return {
                open: false,
                value: null,
                buttonText: "Add Category",
                title: "Add New Category",
                label: "category name",
                loading: false,
                type: 'category'
            }
        },
        defaultSnackbarData () {
            return {
                show: false,
                text: null,
                color: 'info'    
            }
        },
        defaultConfirmBoxData () {
            return {
                id: null,
                text: '',
                open: false
            }
        },
        closeDialog() {
            this.dialog = this.defaultDialogData()
        },
        closeSnackbar() {
            this.snackbar = this.defaultSnackbarData()
        },
        closeConfirmBox() {
            this.confirmBox = this.defaultConfirmBoxData()
        },
        onAddEdit() {
            const {type} = this.dialog
            if (type === 'category') this.addEditCategory()
            if (type === 'task') this.addEditTask()
        },
        onDelete() {
            const {type} = this.confirmBox
            if (type === 'category') this.deleteCategory()
            if (type === 'task') this.deleteTask()
        },
        addEditCategory() {
            const {value: name, id} = this.dialog
            this.dialog.loading = true
            if (id) {
                this.handleRequest('put', [`/api/categories/${id}`, {name}])
                .then(data => {
                    const index = _.findIndex(this.categories, category => category.id == id)
                    if (index > -1) {
                        this.categories[index].name = name
                    }
                    this.handleSnackbar(data.message, 'success')
                    this.closeDialog()
                })
                .catch(this.handleError)
            } else {
                this.handleRequest('post', ['/api/categories', {name}])
                .then(data => {
                    this.getCategories(this.pagination.currentPage)
                    this.handleSnackbar(data.message, 'success')
                    this.closeDialog()
                })
                .catch(this.handleError)
            }
        },
        deleteCategory() {
            const {id} = this.confirmBox
            this.confirmBox.loading = true
            this.handleRequest('del', [`/api/categories/${id}`])
            .then(data => {
                this.getCategories(this.pagination.currentPage)                
                this.handleSnackbar(data.message, 'success')
                this.closeConfirmBox()
            })
            .catch(this.handleError)
        },
        addEditTask (data = this.dialog) {
            const {value: title, id, categoryId, is_completed} = data
            this.dialog.loading = true
            const categoryIndex = _.findIndex(this.categories, category => category.id == categoryId)
            if (id) {
                this.handleRequest('put', [`/api/category/${categoryId}/tasks/${id}`, {title, isCompleted: Number(is_completed)}])
                .then(data => {
                    const taskIndex = _.findIndex(this.categories[categoryIndex].task_list, task => task.id == id)
                    if (taskIndex > -1) {
                        this.categories[categoryIndex].task_list[taskIndex].title = title
                    }
                    this.handleSnackbar(data.message, 'success')
                    this.closeDialog()
                })
                .catch(this.handleError)
            } else {
                this.handleRequest('post', [`/api/category/${categoryId}/tasks`, {title}])
                .then(data => {
                    this.categories[categoryIndex].task_list.push(data.task)
                    this.handleSnackbar(data.message, 'success')
                    this.closeDialog()
                })
                .catch(this.handleError)
            }
        },
        deleteTask() {
            const {id, categoryId} = this.confirmBox
            this.confirmBox.loading = true
            const categoryIndex = _.findIndex(this.categories, category => category.id == categoryId)
            this.handleRequest('del', [`/api/category/${categoryId}/tasks/${id}`])
            .then(data => {
               const taskIndex = _.findIndex(this.categories[categoryIndex].task_list, task => task.id == id)
                if (taskIndex > -1) {
                    this.categories[categoryIndex].task_list.splice(taskIndex, 1)
                }
                this.handleSnackbar(data.message, 'success')
                this.closeConfirmBox()
            })
            .catch(this.handleError)
        },
        openUpdateDialog(data) {
            this.dialog = data
        },
        openConfirmBox(data) {
            this.confirmBox = data
        },
        handleRequest(type, options) {
            return request[type](...options) 
        },
        handleError(error) {
            this.handleSnackbar((error.response && error.response.data.name) || error, 'error')
            this.closeDialog()
            this.closeConfirmBox()
        },
        handleSnackbar(text, color) {
            this.snackbar = {
                show: true,
                text,
                color
            }
        }
    }
}
</script>

<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
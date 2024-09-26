/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, onWillStart } from "@odoo/owl";

export class TodoList extends Component {
    setup() {
        this.orm = useService("orm");
        this.model = "owl.todo.list";
        this.state = useState({
            task: { name: "", completed: false, color: "#FF0000" },
            taskList: [],
            debounceTimeout: null,
            // activeId: false,
            // isEditing: false,
        });

        onWillStart(async () => await this.getAllTasks());
    }

    async getAllTasks() {
        this.state.taskList = await this.orm.call(this.model, "search_read", [
            [],
            ["name", "completed", "color"],
        ]);
    }

    _openTaskForm(params) {
        this.env.services.action.doAction(
            {
                type: "ir.actions.act_window",
                res_model: "owl.todo.list",
                views: [[false, "form"]],
                target: "new",
                ...params,
            },
            {
                props: {
                    onSave: async (record, params) => {
                        await this.getAllTasks();
                        this.env.services.action.doAction({
                            type: "ir.actions.act_window_close",
                        });
                    }
                }
            }
        );
    }

    addTask() {
        this._openTaskForm({});
    }

    editTask(event, currentTask) {
        this._openTaskForm({ res_id: currentTask.id });
    }

    // addTask(){
    //     this.resetForm()
    //     this.state.activeId = false
    //     this.state.isEdit = false
    // }

    // editTask(task){
    //     this.state.activeId = task.id
    //     this.state.isEdit = true
    //     this.state.task = {...task}
    // }

    // resetForm() {
    //     this.state.task = { name: "", completed: false, color: "#FF0000" };
    // }

    // async saveTask() {
    //     if (this.state.isEditing) {
    //         await this.orm.call(this.model, "write", [[this.state.activeId], this.state.task]);
    //     }
    //     else {
    //         await this.orm.call(this.model, "create", [this.state.task]);
    //     }
    //     await this.getAllTasks();
    // }


    async toggleTask(event, task) {
        await this.orm.call(this.model, "write", [[task.id], { completed: !task.completed }]);
        await this.getAllTasks();
    }

    async updateColorTask(event, task) {
        await this.orm.call(this.model, "write", [[task.id], { color: event.target.value }]);
        await this.getAllTasks();
    }

    async deleteTask(task) {
        await this.orm.call(this.model, "unlink", [[task.id]]);
        await this.getAllTasks();
    }

    async searchTasks(event) {
        clearTimeout(this.state.debounceTimeout);

        this.state.debounceTimeout = setTimeout(async () => {
            this.state.taskList = await this.orm.searchRead(this.model,
                [["name", "ilike", event.target.value]],
                ["name", "completed", "color"],
            );
        }, 500);
    }
}

TodoList.template = "cml_todo.TodoList";
registry.category("actions").add("cml_todo.action_todo_list_js", TodoList);

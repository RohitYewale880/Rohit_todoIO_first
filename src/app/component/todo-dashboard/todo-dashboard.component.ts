import { Component, OnInit } from '@angular/core';
import { todoArr } from 'src/app/consts/todo';
import { Itodo } from 'src/app/modals/todo';
import { SnakbarService } from 'src/app/service/snakbar.service';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {

  constructor(
    private _snakbar : SnakbarService
  ) { }
  tododata !: Array<Itodo>
  getEditedtodo !:Itodo
  ngOnInit(): void {
    this.tododata = todoArr
  }

  onChecked(todo: Itodo) {
    let getindex = this.tododata.findIndex((ele) => ele.todoId === todo.todoId)
    this.tododata[getindex] = todo
    console.log(this.tododata);
  }

  AddTodo(todo:Itodo){
    this.tododata.push(todo)

    this._snakbar.Opensnakbar(`The todo item with id ${todo.todoId} is added successfully!!!`)
  }

  onRemovetodo(id:number){
    let getindex = this.tododata.findIndex((ele) => ele.todoId === id)
    let item = this.tododata.splice(getindex, 1)

    this._snakbar.Opensnakbar(`The todo item with id ${item[0].todoId} is removed successfully!!!`)

  }

  geteditobj(todo : Itodo){
    this.getEditedtodo = todo
  }

  UpdateTodo(todo:Itodo){
    let getindex = this.tododata.findIndex((ele) => ele.todoId === todo.todoId)
    this.tododata[getindex] = todo

    this._snakbar.Opensnakbar(`The todo item with id ${todo.todoId} is updated successfully!!!`)

  }
}

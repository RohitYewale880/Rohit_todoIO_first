import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from 'src/app/modals/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges{

  isineditmode : boolean = false
  @ViewChild('todoform') todoform !: NgForm
  @Output() emitnewobj : EventEmitter<Itodo> = new EventEmitter<Itodo>()
  @Output() emitupdatedObj : EventEmitter<Itodo> = new EventEmitter<Itodo>()
  @Input() getedittodo! : Itodo
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['getedittodo'].currentValue){
      this.isineditmode = true
      this.todoform.form.patchValue(this.getedittodo)
    }
  }

  ngOnInit(): void {
  }

  onAddtodo(){
    if(this.todoform.valid){
      let newObj : Itodo= {
        ...this.todoform.value, todoId : Date.now().toString()
      }

      this.emitnewobj.emit(newObj)
      this.todoform.reset()
    }
  }

  onUpdate(){
    let updatedObj : Itodo = {
      ...this.todoform.value , todoId: this.getedittodo.todoId
    }
    this.emitupdatedObj.emit(updatedObj)

    this.isineditmode = false
    this.todoform.reset()
   }
}

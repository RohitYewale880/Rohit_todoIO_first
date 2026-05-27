import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Itodo } from 'src/app/modals/todo';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todoarray !: Array<Itodo>
  @Output() emitcheckedobj: EventEmitter<Itodo> = new EventEmitter<Itodo>()
  @Output() emiteditObj: EventEmitter<Itodo> = new EventEmitter<Itodo>()
  @Output() emitremoveid: EventEmitter<number> = new EventEmitter<number>()
  constructor(
    private _matdilog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  trackbyfun(index: number, item: Itodo) {
    return item.todoId
  }

  onChecked(event: any, todo: Itodo) {
    todo.isConfirm = event.checked;

    this.emitcheckedobj.emit(todo)
  }

  onRemove(id: number) {
    this._matdilog.open(GetconfirmComponent, {
      width: '500px',
      disableClose: true,
      data: `Are you sure do you want to remove this todo item with id ${id}`
    }).afterClosed().subscribe({
      next:res => {
        if(res === true){
          this.emitremoveid.emit(id)
        }
      },
      error : err => {
        console.log(err)
      }
    })
  }

  onEdit(todo:Itodo){
    this.emiteditObj.emit(todo)
  }
}

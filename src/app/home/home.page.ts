import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  todosRef: AngularFireList<any>;
  todos: Observable<any[]>;
  // input value
  newTodo = { task: '', isChecked: false };

  constructor(public db: AngularFireDatabase) {
    this.todosRef = db.list('/todo');

    this.todos = this.todosRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  addTask(newTodo) {
    this.todosRef.push(newTodo);
    // empty the input
    this.newTodo = { task: '', isChecked: false };
  }
  deleteTask(todoKey) {
    this.todosRef.remove(todoKey);
  }
  updateTask(key, task) {
    this.todosRef.update(key, {task: task});
  }
  toggleTask(key, check){
    if (check === false){
      this.todosRef.update(key, {isChecked: true});
    } else {
      this.todosRef.update(key, {isChecked: false});
    }

  }
}

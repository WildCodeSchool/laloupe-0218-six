import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'SiX';
  items: Observable<any[]>;
  objObservable: Observable<any>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
    this.objObservable = db.doc('items/oPAbAsBtCQQYzD7zjEg4').valueChanges();

    this.generatePawns();
  }
  generatePawns() {
    const pawnsCollection = this.db.doc('pawns');
    pawnsCollection.valueChanges().take(1).subscribe();
  }
}  

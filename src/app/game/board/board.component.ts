import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Board } from "../interfaces/board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() i = 0;
  @Input() player = 0;
  @Input() canPlay = false;
  @Output() coordinates = new EventEmitter<{row: number, col: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  emitCoordinates(e) {
    const cellId = e.target.id;
    this.coordinates.emit({
      row: cellId.substring(2,3),
      col: cellId.substring(3,4)
    });
  }

  isSeaHit(col) {
    return (col.value !== 'ship' && col.hit);
  }

  isShipHit(col) {
    return (col.value === 'ship' && col.hit);
  }

}

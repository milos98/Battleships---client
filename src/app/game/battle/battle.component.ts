import { Component, Input, OnInit } from '@angular/core';

import { Board } from '../interfaces/board';
import { BoardService } from '../services/board.service';
import { WebSocketService } from '../services/web-socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() reuiredNumberOfPlayersForGame = 2;

  player = 0;
  points: number;
  boards: Board[];

  constructor(private boardService: BoardService, private webSocketService: WebSocketService, private router: Router) { }

  ngOnInit(): void {
    this.boards = this.boardService.getBoards();
    this.webSocketService.listen('update').subscribe((data: any) => {
        this.boardService.setOnTurn(data.turn);
        this.boardService.setPoints(data.points);
        //console.log(data.grid.ships);
        for (let i = 0; i < 100; i++){
          const col = Math.floor(i / 10);
          const row = i % 10;
          const cellValue = data.grid.shots[i];
          let cellName;
          switch (cellValue) {
            case 0 : cellName = 'sea';
                     break;
            case 1 : cellName = 'lock';
                     break;
            case 2 : cellName = 'ship';
          }
          if (data.gridIndex !== 0) {
            if(this.boardService.boards[data.gridIndex].cells[col][row].value == 'sea') {
              this.boardService.boards[data.gridIndex].cells[col][row].value = cellName;
            }
          } else {
            this.boardService.boards[data.gridIndex].cells[col][row].hit = (cellValue !== 0);
          }
          if (data.grid.ship !== undefined){
            this.boardService.setShip(data.grid.ship);
          }
        }
        if(data.gridIndex == 1){
         for(let i=0;i<data.grid.ships.length;i++){
           this.boardService.setShip(data.grid.ships[i], 1);
         }

        }
        this.boards = this.boardService.getBoards();
    });

    this.webSocketService.listen('gameover').subscribe( (win) => {
          this.boardService.setOutcome(win);
          this.router.navigate(['/game/outcome']);
      });
  }

  fireTorpedo(data){
    //console.log(data);
    this.webSocketService.emit('torpedo', [this.webSocketService.getRoomOwner(), {x: data.col, y: data.row}]);
  }

}

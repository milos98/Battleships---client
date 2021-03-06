import { Injectable } from '@angular/core';
import { Ship } from '../interfaces/ship';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  availableShips = [
    {
      length: 4,
      quantity: 1
    },
    {
      length: 3,
      quantity: 2
    },
    {
      length: 2,
      quantity: 3
    },
    {
      length: 1,
      quantity: 4
    },
  ];

  ships = [];
  placedShips = [];
  numberOfShipCategories: number = this.availableShips.length;

  constructor() {
  }

  createShips() {
    for (let i = 0; i < this.numberOfShipCategories; i++) {
      this.ships[i] = [];
      const newShip: Ship = {
        x: this.availableShips[i].length,
        y: 1,
        length: this.availableShips[i].length,
        hits: 0,
        horizontal: true
      };

      for (let j = 0; j < this.availableShips[i].quantity; j++) {
        this.ships[i].push(newShip);
      }
    }
  }

  placeShip(ship: Ship): Ship {
    let temp: Ship;
    let placed = false;

    for (let i = 0; i < this.numberOfShipCategories; i++) {
      if (this.ships[i][0].length === ship.length) {
        this.ships[i].splice(0, 1);

        if (this.ships[i].length === 0) {
          this.ships.splice(i, 1);
        }

        if (this.ships[i] === undefined){
          if (this.ships.length === 0){
            temp = null;
          }
          else {
            temp = this.ships[i - 1][0];
          }
        }
        else {
          temp = this.ships[i][0];
        }
        break;
      }
    }

    for (const placedShip of this.placedShips) {
      if (placedShip[0].length === ship.length) {
        placedShip.push(ship);
        placed = true;
        break;
      }
    }

    if (!placed) {
      this.placedShips.push([ship]);
    }

    return temp;
  }

  rotateShip(i, j) {
    const temp = this.ships[i][j].x;
    this.ships[i][j].x = this.ships[i][j].y;
    this.ships[i][j].y = temp;
    this.ships[i][j].horizontal = !this.ships[i][j].horizontal;
  }

  getShips() {
    return this.ships;
  }

  getPlacedShips() {
    return [...this.placedShips];
  }

}

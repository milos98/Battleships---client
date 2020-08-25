import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { BattleComponent } from './game/battle/battle.component';
import { WaitingComponent } from "./game/battle/waiting/waiting.component";
import { StrategyComponent } from './game/strategy/strategy.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    BattleComponent,
    WaitingComponent,
    StrategyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

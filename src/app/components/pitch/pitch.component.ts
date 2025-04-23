import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import{ FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pitch',
  imports: [FormsModule],
  templateUrl: './pitch.component.html',
  styleUrls: ['./pitch.component.scss']
})
export class PitchComponent implements AfterViewInit {
  @ViewChild('footballCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('timebar', { static: false }) timebarRef!: ElementRef<HTMLInputElement>;

  private ctx!: CanvasRenderingContext2D | null;
  public currentTime: number = 0;
  private animationFrame: any;

  players = [
    [
      { id: 1, name: 'Player 1', x: 100, y: 250, color: 'blue'  },
      { id: 2, name: 'Player 2', x: 300, y: 200, color: 'red' },
      { id: 3, name: 'Player 3', x: 200, y: 150, color: 'yellow'},
      { id: 4, name: 'Player 4', x: 250, y: 350, color: 'green' }
    ],
    [
      { id: 1, name: 'Player 1', x: 150, y: 250, color: 'blue'},
      { id: 2, name: 'Player 2', x: 220, y: 200, color: 'red' },
      { id: 3, name: 'Player 3', x: 210, y: 180, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 270, y: 330, color: 'green' }
    ],
    [
      { id: 1, name: 'Player 1', x: 180, y: 250, color: 'blue' },
      { id: 2, name: 'Player 2', x: 250, y: 180, color: 'red'},
      { id: 3, name: 'Player 3', x: 230, y: 160, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 300, y: 310, color: 'green' }
    ],
    [
      { id: 1, name: 'Player 1', x: 100, y: 250, color: 'blue' },
      { id: 2, name: 'Player 2', x: 300, y: 200, color: 'red'},
      { id: 3, name: 'Player 3', x: 200, y: 150, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 250, y: 350, color: 'green'}
    ],
    [
      { id: 1, name: 'Player 1', x: 150, y: 250, color: 'blue' },
      { id: 2, name: 'Player 2', x: 220, y: 200, color: 'red'},
      { id: 3, name: 'Player 3', x: 210, y: 180, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 270, y: 330, color: 'green'}
    ],
    [
      { id: 1, name: 'Player 1', x: 180, y: 250, color: 'blue' },
      { id: 2, name: 'Player 2', x: 250, y: 180, color: 'red'},
      { id: 3, name: 'Player 3', x: 230, y: 160, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 300, y: 310, color: 'green' }
    ],
    [
      { id: 1, name: 'Player 1', x: 100, y: 250, color: 'blue' },
      { id: 2, name: 'Player 2', x: 300, y: 200, color: 'red' },
      { id: 3, name: 'Player 3', x: 200, y: 150, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 250, y: 350, color: 'green' }
    ],
    [
      { id: 1, name: 'Player 1', x: 150, y: 250, color: 'blue'},
      { id: 2, name: 'Player 2', x: 220, y: 200, color: 'red' },
      { id: 3, name: 'Player 3', x: 210, y: 180, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 270, y: 330, color: 'green' }
    ],
    [
      { id: 1, name: 'Player 1', x: 180, y: 250, color: 'blue' },
      { id: 2, name: 'Player 2', x: 122, y: 180, color: 'red'},
      { id: 3, name: 'Player 3', x: 230, y: 160, color: 'yellow' },
      { id: 4, name: 'Player 4', x: 300, y: 310, color: 'green' }
    ]
  ];
  
  ballPositions = [
    { x: 400, y: 250, color: 'white' },
    { x: 420, y: 260, color: 'white' },
    { x: 440, y: 270, color: 'white' },
    { x: 460, y: 280, color: 'white'},
    { x: 480, y: 290, color: 'white' },
    { x: 120, y: 435, color: 'white'},
    { x: 123, y: 120, color: 'white'}
  ];
  

  currentPlayers = this.players[0];	
  currentBall = this.ballPositions[0];

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.ctx = this.canvasRef?.nativeElement?.getContext('2d');
      if (this.ctx) {
        this.drawPitch();
        this.drawPlayers();
        this.drawBall();
      }
    }
  }

  startAnimation() {
    this.currentTime = 0;
    this.animate();
  }

  animate() {
    this.animationFrame = requestAnimationFrame(() => this.animate());
    const canvas = this.canvasRef.nativeElement;
    
    this.ctx?.clearRect(0, 0, canvas.width, canvas.height);
    this.drawPitch();

    this.interpolatePositions();
    this.currentTime += 0.03;

    this.drawPlayers();
    this.drawBall();
  }

  interpolatePositions() {
    const timeIndex = Math.floor(this.currentTime);
    const nextIndex = Math.min(timeIndex + 1, this.players.length - 1);
    const t = this.currentTime - timeIndex;

    this.currentPlayers = this.players[timeIndex].map((player: any, i: number) => ({
      ...player,
      x: player.x + (this.players[nextIndex][i].x - player.x) * t,
      y: player.y + (this.players[nextIndex][i].y - player.y) * t
    }));

    this.currentBall = {
      x: this.ballPositions[timeIndex].x + (this.ballPositions[nextIndex].x - this.ballPositions[timeIndex].x) * t,
      y: this.ballPositions[timeIndex].y + (this.ballPositions[nextIndex].y - this.ballPositions[timeIndex].y) * t,
      color: 'white'
    };
  }
  
  
  drawPitch() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;

    ctx.beginPath();
      ctx.rect(0,0, canvas.width, canvas.height);
      ctx.fillStyle = "#060";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#FFF";
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = "#FFF";
      
      // Mid line
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.closePath();
      
      //Mid circle
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2*(Math.PI), false);
      ctx.stroke();
      ctx.closePath();
      //Mid point
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2*Math.PI, false);
      ctx.fill();
      ctx.closePath();
      
      //Home penalty box
      ctx.beginPath();
      ctx.rect(0, (canvas.height - 322) / 2, 132, 322);
      ctx.stroke();
      ctx.closePath();
      //Home goal box
      ctx.beginPath();
      ctx.rect(0, (canvas.height - 146) / 2, 44, 146);
      ctx.stroke();
      ctx.closePath();
      //Home goal 
      ctx.beginPath();
      ctx.moveTo(1, (canvas.height / 2) - 22);
      ctx.lineTo(1, (canvas.height / 2) + 22);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.lineWidth = 1;

      //Home penalty point
      ctx.beginPath()
      ctx.arc(88, canvas.height / 2, 1, 0, 2*Math.PI, true);
      ctx.fill();
      ctx.closePath();
      //Home half circle
      ctx.beginPath()
      ctx.arc(88, canvas.height / 2, 73, 0.29*Math.PI, 1.71*Math.PI, true);
      ctx.stroke();
      ctx.closePath();
      
      //Away penalty box
      ctx.beginPath();
      ctx.rect(canvas.width-132, (canvas.height - 322) / 2, 132, 322);
      ctx.stroke();
      ctx.closePath();
      //Away goal box
      ctx.beginPath();
      ctx.rect(canvas.width-44, (canvas.height - 146) / 2, 44, 146);
      ctx.stroke();
      ctx.closePath();      
      //Away goal 
      ctx.beginPath();
      ctx.moveTo(canvas.width-1, (canvas.height / 2) - 22);
      ctx.lineTo(canvas.width-1, (canvas.height / 2) + 22);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.lineWidth = 1;
      //Away penalty point
      ctx.beginPath()
      ctx.arc(canvas.width-88, canvas.height / 2, 1, 0, 2*Math.PI, true);
      ctx.fill();
      ctx.closePath();
      //Away half circle
      ctx.beginPath()
      ctx.arc(canvas.width-88, canvas.height / 2, 73, 0.71*Math.PI, 1.29*Math.PI, false);
      ctx.stroke();
      ctx.closePath();
            
      //Home L corner
      ctx.beginPath()
      ctx.arc(0, 0, 8, 0, 0.5*Math.PI, false);
      ctx.stroke();
      ctx.closePath();
      //Home R corner
      ctx.beginPath()
      ctx.arc(0, canvas.height, 8, 0, 2*Math.PI, true);
      ctx.stroke();
      ctx.closePath();
      //Away R corner
      ctx.beginPath()
      ctx.arc(canvas.width, 0, 8, 0.5*Math.PI, 1*Math.PI, false);
      ctx.stroke();
      ctx.closePath();
      //Away L corner
      ctx.beginPath()
      ctx.arc(canvas.width, canvas.height, 8, 1*Math.PI, 1.5*Math.PI, false);
      ctx.stroke();
      ctx.closePath();
    
  }

  drawPlayers() {
    if (!this.ctx) return;
    this.currentPlayers.forEach(player => this.drawCircle(player.x, player.y, 10, player.color));
  }

  drawBall() {
    if (!this.ctx) return;
    this.drawCircle(this.currentBall.x, this.currentBall.y, 8, this.currentBall.color);
  }

  drawCircle(x: number, y: number, radius: number, color: string) {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

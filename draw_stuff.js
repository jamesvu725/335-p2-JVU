// James Vu
// james.vu725@csu.fullerton.edu
// Contains functions to draw stuff on canvas

// Draw text
function draw_text(ctx, text, xpos, ypos) {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.font = "20px Lucida Console";
  ctx.textAlign = 'center';
  ctx.fillText(text, xpos, ypos+10);
  ctx.restore();
}

// Draw rectangle
function draw_rect(ctx, xpos, ypos, clr) {
  ctx.save();
  ctx.fillStyle = clr;
  ctx.fillRect(xpos, ypos, 100, 100);
  ctx.restore();
}

// Draw rectangle and text
function draw_rect_with_text(ctx, text, xpos, ypos, clr) {
  draw_rect(ctx, xpos, ypos, clr);
  draw_text(ctx, text, xpos + 50, ypos+40);
}

// draws circle for connection
function draw_circle(ctx, xpos, ypos) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(xpos, ypos, 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.restore();
}

//draws line and circle to connect rooms
function draw_connection(ctx, rmcnt) {
  ctx.save();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(150, rmcnt*200);
  ctx.lineTo(150, rmcnt*200+100);
  ctx.stroke();
  draw_circle(ctx, 150, rmcnt*200+90);
  ctx.restore();
}

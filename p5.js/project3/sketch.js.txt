function setup() {
  createCanvas(600, 400);
  background(235, 230, 220); // 따뜻한 종이 질감 배경
  noStroke();

  // 얼굴 배경
  fill(255, 220, 180);
  beginShape();
  vertex(250, 120);
  bezierVertex(450, 100, 420, 300, 290, 320);
  bezierVertex(200, 300, 180, 180, 250, 120);
  endShape(CLOSE);

  // 색 구역 분할
  fill(255, 225, 140); // 노란 반쪽
  beginShape();
  vertex(250, 120);
  bezierVertex(330, 140, 380, 260, 290, 320);
  bezierVertex(240, 260, 230, 180, 250, 120);
  endShape(CLOSE);

  fill(180, 230, 250); // 파란 반쪽
  beginShape();
  vertex(300, 120);
  bezierVertex(430, 180, 420, 310, 310, 320);
  bezierVertex(300, 240, 290, 180, 300, 120);
  endShape(CLOSE);

  // 눈 (좌우 다른 형태)
  // 왼쪽 눈
  fill(255);
  ellipse(260, 200, 50, 25);
  fill(0);
  ellipse(265, 200, 9, 9);

  // 오른쪽 눈
  fill(255);
  rect(330, 190, 45, 25, 5);
  fill(0);
  ellipse(350, 202, 17, 17);

  // 눈썹(선 강조)
  stroke(50);
  strokeWeight(17);
  noFill();
  arc(260, 180, 60, 20, PI, TWO_PI);
  line(330, 185, 380, 178);
  noStroke();

  // 코
  fill(250, 180, 150);
  beginShape();
  vertex(300, 220);
  bezierVertex(290, 210, 310, 250, 310, 250);
  bezierVertex(315, 260, 320, 230, 300, 180);
  endShape(CLOSE);

  // 입
  fill(220, 100, 120);
  arc(300, 255, 70, 35, 0, PI, CHORD);

  // 왼쪽 귀
  fill(255, 210, 160);
  ellipse(223, 230, 25, 45);

  // 오른쪽 귀
  fill(255, 100, 90, 180);
  ellipse(398, 240, 40, 60);
  
  // 머리카락
  fill(45, 45, 70);
  beginShape();
  vertex(190, 130);
  vertex(410, 110);
  vertex(430, 150);
  vertex(200, 150);
  endShape(CLOSE);
  fill(50, 50, 90);
  rect(200, 135, 230, 30, 20);

  // 목 + 의상
  fill(50, 70, 130);
  rect(270, 313, 60, 15);
  fill(50, 70, 130);
  rect(220, 320, 160, 100, 30);

  // 라인 포인트
  stroke(40, 40, 40, 200);
  strokeWeight(2);
  noFill();
  bezier(295, 160, 310, 190, 285, 240, 310, 270); // 콧대 윤곽
  line(245, 120, 390, 110); // 헤어라인 포인트
}

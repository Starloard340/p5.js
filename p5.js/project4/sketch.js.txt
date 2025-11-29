let characterX;
let characterY;
let eyeOffset = 0;
let mouthOpen = false;
let pupilSize = 9;
let rightPupilSize = 17;



// 캐릭터 색상 변화
let faceBaseColor; // 얼굴 기본 색상
let faceTargetColor; // 얼굴 목표 색상
let yellowHalfBaseColor; // 노란 반쪽 기본 색상
let yellowHalfTargetColor; // 노란 반쪽 목표 색상
let lerpFactor = 0;

// 배경색 전환
let bgColor1, bgColor2, bgColor3, bgColor4;

// 물결 효과
let waveOffset = 0;

// 물고기 떼 효과
let numFish = 15; // 물고기 개수
let fishSpeed = 1; // 물고기 이동 속도



function setup() {
  createCanvas(600, 400);
  characterX = width / 2;
  characterY = height / 2;
  frameRate(30);

  // 캐릭터 얼굴 색상 초기화
  faceBaseColor = color(255, 220, 180);
  faceTargetColor = color(255, 150, 100);

  yellowHalfBaseColor = color(255, 225, 140);
  yellowHalfTargetColor = color(200, 150, 80);

  // 배경색 초기화
  bgColor1 = color(235, 230, 220);
  bgColor2 = color(150, 200, 255);
  bgColor3 = color(80, 50, 120);
  bgColor4 = color(255, 180, 100);
}



function draw() {
  // 캐릭터 전체 이동(마우스 위치에 따라)
  characterX = lerp(characterX, mouseX, 0.05);
  characterY = lerp(characterY, mouseY, 0.05);

  // 캐릭터 얼굴 색상 변화('s' 클릭)
  if (keyIsDown(83)) {
    lerpFactor += 0.02;
    if (lerpFactor > 1) {
      lerpFactor = 1;
    }
  } else {
    lerpFactor -= 0.02;
    if (lerpFactor < 0) {
      lerpFactor = 0;
    }
  }

  // 캐릭터 얼굴 색상 보간
  let currentFaceColor = lerpColor(faceBaseColor, faceTargetColor, lerpFactor);
  let currentYellowHalfColor = lerpColor(yellowHalfBaseColor, yellowHalfTargetColor, lerpFactor);

  // 배경색 전환
  let timeIn2Secs = floor(millis() / 2000) % 4;
  let transitionProgress = (millis() % 2000) / 2000;

  let currentBgColor;
  let nextBgColor;

  if (timeIn2Secs === 0) {
    currentBgColor = bgColor1;
    nextBgColor = bgColor2;
  } else if (timeIn2Secs === 1) {
    currentBgColor = bgColor2;
    nextBgColor = bgColor3;
  } else if (timeIn2Secs === 2) {
    currentBgColor = bgColor3;
    nextBgColor = bgColor4;
  } else { // timeIn2Secs === 3
    currentBgColor = bgColor4;
    nextBgColor = bgColor1;
  }

  background(lerpColor(currentBgColor, nextBgColor, transitionProgress));

  push();
  translate(characterX - width / 2, characterY - height / 2);

  // 좌우 눈동자 움직임('a', 'd' 클릭)
  if (keyIsDown(65)) { // 'a' 키
    eyeOffset = -5;
  } else if (keyIsDown(68)) { // 'd' 키
    eyeOffset = 5;
  } else {
    eyeOffset = 0;
  }

  // 입 모양 변경(마우스 클릭)
  if (mouseIsPressed) {
    mouthOpen = true;
  } else {
    mouthOpen = false;
  }

  // 눈동자 크기 변화
  let timeFactor = millis() * 0.002;
  pupilSize = map(sin(timeFactor), -1, 1, 7, 13);
  rightPupilSize = map(cos(timeFactor), -1, 1, 12, 22);

  noStroke();

  // 얼굴 색상 변화
  fill(currentFaceColor);
  beginShape();
  vertex(250, 120);
  bezierVertex(450, 100, 420, 300, 290, 320);
  bezierVertex(200, 300, 180, 180, 250, 120);
  endShape(CLOSE);

  // 얼굴색 구역
  fill(currentYellowHalfColor); // 노란 반쪽(변화)
  beginShape();
  vertex(250, 120);
  bezierVertex(330, 140, 380, 260, 290, 320);
  bezierVertex(240, 260, 230, 180, 250, 120);
  endShape(CLOSE);

  fill(180, 230, 250); // 파란 반쪽(고정)
  beginShape();
  vertex(300, 120);
  bezierVertex(430, 180, 420, 310, 310, 320);
  bezierVertex(300, 240, 290, 180, 300, 120);
  endShape(CLOSE);
  
  // 왼쪽 눈
  fill(255);
  ellipse(260, 200, 50, 25);
  fill(0);
  ellipse(265 + eyeOffset, 200, pupilSize, pupilSize);

  // 오른쪽 눈
  fill(255);
  rect(330, 190, 45, 25, 5);
  fill(0);
  ellipse(350 + eyeOffset, 202, rightPupilSize, rightPupilSize);

  // 눈썹
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
  if (mouthOpen) {
    arc(300, 255, 70, 45, 0, PI); // 입 벌림
  } else {
    arc(300, 255, 70, 35, 0, PI, CHORD); // 기본 입 모양
  }

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
  bezier(295, 160, 310, 190, 285, 240, 310, 270); // 코에 붙은 머리카락 라인
  line(245, 120, 390, 110); // 머리카락 윗부분 라인



  // 물결(마우스가 화면 상단 1/2에 있을 때)
  if (mouseY < height / 2) {
    noFill();
    stroke(100, 150, 250, 100);
    strokeWeight(3);
    waveOffset += 0.05;

    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = map(sin((x + waveOffset * 20) * 0.02), -1, 1, height / 2 - 40, height / 2 + 40);
      vertex(x, y);
    }
    endShape();
  }



  // 물고기 떼(마우스가 화면 하단 1/2에 있을 때)
  if (mouseY >= height / 2) {
    noStroke();
    fill(255, 150, 100, 180); // 주황색

    for (let i = 0; i < numFish; i++) {
      let fishX = (millis() * fishSpeed + i * 50) % (width + 100) - 50;
      let fishY = map(sin(millis() * 0.001 + i * 0.5), -1, 1, height / 2 + 30, height - 30);

      // 물고기 몸통(타원)
      ellipse(fishX, fishY, 30, 15);
      // 물고기 꼬리(삼각형)
      triangle(fishX - 15, fishY, fishX - 30, fishY - 10, fishX - 30, fishY + 10);
      // 물고기 눈(작은 원)
      fill(0);
      ellipse(fishX + 8, fishY, 4, 4);
      fill(255, 150, 100, 180);
    }
  }

  pop();
}



// 10초 gif 저장('w' 클릭)
function keyPressed() {
  if (key === 'w') {
    saveGif('20241606 김선우_과제3', 10);
  }
}

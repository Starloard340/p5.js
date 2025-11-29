let StartTime;
let ColorPalette = [];
let pulse = 0;
let RotationAngle = 0;
let EyeMovement = 0;
let particles1 = [];
let particles2 = [];
let particles3 = [];



function setup() {
  createCanvas(600, 400);
  StartTime = millis();


  
  // 색상 팔레트(보라색)
  colorMode(HSB, 360, 100, 100, 100);
  ColorPalette = [
    color(280, 80, 60),  // 진한 보라
    color(300, 70, 80),  // 그냥 보라
    color(320, 60, 90),  // 연한 보라
    color(340, 50, 95)   // 핑크 보라
  ];
  

  
  // 안쪽 원 입자들(원1,반지름180)
  for (let i = 0; i < 8; i++) {
    particles1.push({
      angle: random(TWO_PI),
      speed: random(0.3, 0.7),
      size: random(4, 8),
      hue: (280 + random(20)) % 360
    });
  }
  
  

  // 중간 원 입자들(원2,반지름220)
  for (let i = 0; i < 10; i++) {
    particles2.push({
      angle: random(TWO_PI),
      speed: random(0.2, 0.5),
      size: random(6, 10),
      hue: (300 + random(20)) % 360
    });
  }
  
  

  // 바깥쪽 원 입자들(원3,반지름260)
  for (let i = 0; i < 12; i++) {
    particles3.push({
      angle: random(TWO_PI),
      speed: random(0.1, 0.4),
      size: random(8, 12),
      hue: (320 + random(20)) % 360
    });
  }

  

  frameRate(30);
}



function draw() {
  let elapsed = millis() - StartTime;
  let timeScale = elapsed / 1000;


  
  // 배경
  let bgHue = (280 + sin(timeScale * 0.2) * 20) % 360;
  background(bgHue, 90, 10);
  
  // 펄스
  pulse = sin(timeScale * 2) * 0.2 + 0.8;
  
  // 회전 각도
  RotationAngle = sin(timeScale * 0.5) * 0.1;
  
  // 눈 움직임
  EyeMovement = sin(timeScale * 3) * 5;
  
  // 전체 캔버스를 중심으로 회전
  push();
  translate(width/2, height/2);
  rotate(RotationAngle);




  // 1. 조개 껍데기의 타원과 원(몸체) - 크기 변화
  noStroke();
  
  // 보라색 계열 그라데이션 - 색상 변화
  let colorIndex = int((timeScale * 0.5) % ColorPalette.length);
  let nextColorIndex = (colorIndex + 1) % ColorPalette.length;
  let lerpAmount = (timeScale * 0.5) % 1;
  
  let shellColor1 = lerpColor(ColorPalette[colorIndex], ColorPalette[nextColorIndex], lerpAmount);
  let shellColor2 = lerpColor(
    ColorPalette[(colorIndex + 1) % ColorPalette.length], 
    ColorPalette[(colorIndex + 2) % ColorPalette.length], 
    lerpAmount
  );
  let shellColor3 = lerpColor(
    ColorPalette[(colorIndex + 2) % ColorPalette.length], 
    ColorPalette[(colorIndex + 3) % ColorPalette.length], 
    lerpAmount
  );
  
  // 큰 타원
  fill(shellColor1);
  ellipse(0, 0, 250 * pulse, 150 * pulse);
  
  // 중간 타원
  fill(shellColor2);
  ellipse(0, 0, 200 * (1 + sin(timeScale * 2.5) * 0.1), 120 * pulse);
  
  // 작은 타원
  fill(shellColor3);
  ellipse(0, 0, 150 * (1 + sin(timeScale * 3) * 0.1), 90 * pulse);




  // 2. 조개 껍데기 선과 삼각형(무늬) - 위치 변화
  strokeWeight(2);
  let lineHue = (320 + sin(timeScale * 4) * 40) % 360;
  stroke(lineHue, 80, 90, 80);
  
  // 겹쳐진 삼각형 - 회전
  push();
  rotate(sin(timeScale * 1.5) * 0.05);
  triangle(0, -80 * pulse, -50, 0, 50, 0);
  triangle(0, 80 * pulse, -50, 0, 50, 0);
  pop();
  
  // 겹쳐진 사변형 - 크기 변화
  quad(-100, -50, 100, -50, 50, 0, -50, 0);




  // 3. 조개의 호와 선(입구) - 움직임
  noFill();
  strokeWeight(5);
  let arcHue = (300 + cos(timeScale * 3) * 60) % 360;
  stroke(arcHue, 90, 90, 90);
  
  // 조개 입구 호 - 열리고 닫힘
  let arcOpenness = map(sin(timeScale * 1.8), -1, 1, 0.3, 1);
  arc(0, 0, 200 * arcOpenness, 200 * arcOpenness, radians(0), radians(180));
  
  // 조개 입구 선 - 호 따라감
  let lineOffset = sin(timeScale * 2) * 10;
  line(-100 * arcOpenness, lineOffset, 100 * arcOpenness, lineOffset);




  // 4. 조개의 눈 - 움직임,깜빡임
  fill(0, 0, 0, 80 + sin(timeScale * 5) * 20);
  noStroke();
  
  // 눈 깜빡임
  let eyeSize = 20 * (0.7 + abs(sin(timeScale * 4)) * 0.3);
  
  ellipse(-20 + EyeMovement, -25, eyeSize, eyeSize); // 왼쪽 눈
  ellipse(20 + EyeMovement, -25, eyeSize, eyeSize); // 오른쪽 눈

  pop();
  



  // 5. 원1,2,3 모두에 입자
  SwirlingBackground(timeScale);





  // 10초 후 애니메이션 루프 재시작
  if (elapsed > 10000) {
    StartTime = millis();
  }
}



// 원1,2,3 입자들
function SwirlingBackground(timeScale) {
  strokeWeight(1);
  noFill();
  
  let circleRadii = [180, 220, 260];
  for (let i = 0; i < 3; i++) {
    let radius = circleRadii[i];
    let hue = (300 + i * 30) % 360;
    
    stroke(hue, 40, 80, 30);
    ellipse(width/2, height/2, radius * 2, radius * 2);
  }
  

  
  // 원1 입자들(반지름180)
  noStroke();
  for (let i = 0; i < particles1.length; i++) {
    let p = particles1[i];
    p.angle += p.speed * 0.02;
    
    let x = width/2 + cos(p.angle) * 180;
    let y = height/2 + sin(p.angle) * 180;
    
    // 깜빡임
    let alpha = 40 + sin(timeScale * 3 + i) * 20;
    fill(p.hue, 60, 80, alpha);
    ellipse(x, y, p.size, p.size);
  }
  


  // 원2 입자들(반지름220)
  for (let i = 0; i < particles2.length; i++) {
    let p = particles2[i];
    p.angle += p.speed * 0.02;
    
    let x = width/2 + cos(p.angle) * 220;
    let y = height/2 + sin(p.angle) * 220;
    
    // 깜빡임
    let alpha = 50 + cos(timeScale * 2 + i * 0.5) * 25;
    fill(p.hue, 70, 85, alpha);
    ellipse(x, y, p.size, p.size);
  }
  


  // 원3 입자들(반지름260)
  for (let i = 0; i < particles3.length; i++) {
    let p = particles3[i];
    p.angle += p.speed * 0.02;
    
    let x = width/2 + cos(p.angle) * 260;
    let y = height/2 + sin(p.angle) * 260;
    
    // 깜빡임
    let alpha = 60 + sin(timeScale * 4 + i * 0.3) * 30;
    fill(p.hue, 80, 90, alpha);
    ellipse(x, y, p.size, p.size);
  }
}



// GIF 저장
function keyPressed() {
  if (key === 'w') {
    saveGif('20241606 김선우_과제4', 10);
  }
}

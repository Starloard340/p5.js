function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(0);

  // 1. 조개 껍데기의 타원과 원(몸체 역할)
  noStroke();
  
  // 보라색 계열의 그라데이션
  fill('#800080'); // 보라색
  ellipse(300, 200, 250, 150); // 큰 타원

  fill('#9932CC'); // 연한 보라색
  ellipse(300, 200, 200, 120); // 좀 더 작은 타원

  fill('#BA55D3'); // 중간 보라색
  ellipse(300, 200, 150, 90); // 중간 크기 타원



  // 2. 조개 껍데기 선과 삼각형(무늬 표현)
  strokeWeight(2);
  stroke('#E6E6FA');
  
  // 삼각형을 여러 개 겹침(뾰족한 무늬 표현)
  triangle(300, 120, 250, 200, 350, 200);
  triangle(300, 280, 250, 200, 350, 200);

  // 사변형을 겹침
  quad(200, 150, 400, 150, 350, 200, 250, 200);



  // 3. 조개의 호와 선(입구를 표현)
  noFill();
  strokeWeight(5);
  stroke('#DA70D6');
  
  // 조개 입구 모양의 호
  arc(300, 200, 200, 200, radians(0), radians(180));

  // 조개 입구 모양을 따라가는 선
  line(200, 200, 400, 200);



  // 4.조개의 눈
  fill(0);
  noStroke();

  ellipse(280, 175, 20, 20); // 왼쪽 눈

  ellipse(320, 175, 20, 20); // 오른쪽 눈
}

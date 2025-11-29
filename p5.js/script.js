// 메인 페이지 인터랙션
document.addEventListener('DOMContentLoaded', function() {
    // 요소 존재 확인
    const projectCards = document.querySelectorAll('.project-card');
    const background = document.querySelector('.background-elements');
    
    if (projectCards.length === 0) {
        console.error('프로젝트 카드를 찾을 수 없습니다.');
        return;
    }
    
    // 프로젝트 카드 클릭 이벤트
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectNumber = this.getAttribute('data-project');
            if (projectNumber) {
                // GitHub Pages 호환성을 위한 경로 처리
                const basePath = window.location.hostname.includes('github.io') ? '' : './';
                window.location.href = `${basePath}project${projectNumber}/index.html`;
            }
        });
    });
    
    // 배경 요소가 있으면 인터랙티브 요소 생성
    if (background) {
        createInteractiveBackground();
    }
});

function createInteractiveBackground() {
    const background = document.querySelector('.background-elements');
    
    // 안전한 색상 배열 (CSS 변수 대체)
    const safeColors = ['#2a9d8f', '#e9c46a', '#e76f51']; // primary, secondary, accent
    
    // 추가적인 배경 입자 생성
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 랜덤 위치
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // 랜덤 색상 (안전한 색상 사용)
        const color = safeColors[Math.floor(Math.random() * safeColors.length)];
        
        particle.style.top = `${top}%`;
        particle.style.left = `${left}%`;
        particle.style.backgroundColor = color;
        particle.style.animationDelay = `-${Math.random() * 10}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        
        background.appendChild(particle);
    }
}

// 디버깅을 위한 로그 추가
console.log('script.js가 로드되었습니다.');
console.log('프로젝트 카드 개수:', document.querySelectorAll('.project-card').length);


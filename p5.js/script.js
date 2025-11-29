// 메인 페이지 인터랙션
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectNumber = this.getAttribute('data-project');
            window.location.href = `project${projectNumber}/index.html`;
        });
    });
    
    // 배경에 추가적인 인터랙티브 요소 생성
    createInteractiveBackground();
});

function createInteractiveBackground() {
    const background = document.querySelector('.background-elements');
    
    // 추가적인 배경 입자 생성
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 랜덤 위치
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // 랜덤 색상
        const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.top = `${top}%`;
        particle.style.left = `${left}%`;
        particle.style.backgroundColor = color;
        particle.style.animationDelay = `-${Math.random() * 10}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        
        background.appendChild(particle);
    }
}

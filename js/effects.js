// Функция для рисования вертикальных искр
window.drawVerticalSparks = function(ctx, x, y) {
    // TODO: Две жёлтые линии: вверх и вниз от точки
    // Толщина линий: 2px
    // 👇 Твой код здесь
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    
    // Вверх
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 20);
    ctx.stroke();
    
    // Вниз
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 20);
    ctx.stroke();
}

// Функция для рисования горизонтальных искр
window.drawHorizontalSparks = function(ctx, x, y) {
    // TODO: Две жёлтые линии: влево и вправо от точки
    // Толщина линий: 2px
    // 👇 Твой код здесь
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    
    // Влево
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 20, y);
    ctx.stroke();
    
    // Вправо
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y);
    ctx.stroke();
}
// Функция для полного эффекта подбора
window.drawPickupEffect = function(ctx, x, y) {
    // TODO: Вызвать обе функции искр
    window.drawVerticalSparks(ctx, x, y);
    window.drawHorizontalSparks(ctx, x, y);
    
    // Бонус: добавить маленькие кружки на концах
    ctx.fillStyle = 'yellow';
    for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI / 2);
        const sparkX = x + Math.cos(angle) * 20;
        const sparkY = y + Math.sin(angle) * 20;
        
        ctx.beginPath();
        ctx.arc(sparkX, sparkY, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

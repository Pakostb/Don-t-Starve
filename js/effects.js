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

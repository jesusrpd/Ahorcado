const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Base del ahorcado
ctx.fillStyle = "#34323C";
ctx.strokeStyle = "#34323C";
ctx.fillRect(0,0,20,500);
ctx.fillRect(0,0,400,20);
ctx.fillRect(380,0,20,100);

ctx.beginPath();
ctx.moveTo(0, 70);
ctx.lineTo(70,0);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(390, 100);
ctx.lineTo(390, 150);
ctx.stroke();
ctx.closePath();

// Soga
ctx.beginPath();
ctx.moveTo(390, 100);
ctx.lineTo(390, 150);
ctx.stroke();
ctx.closePath();

//cabeza del sujeto ahorcado
ctx.beginPath();
ctx.moveTo(390, 190);
ctx.arc(390,150,35, 0, 2*3.14);
ctx.fill();
ctx.closePath();

//cuerpo del sujeto ahorcado
ctx.beginPath();
ctx.fillRect(380,150,20,120,);
ctx.closePath();

//brazo izquierdo del sujeto ahorcado
ctx.beginPath();
ctx.moveTo(380,270);
ctx.lineTo(350,350);
ctx.stroke();
ctx.closePath();
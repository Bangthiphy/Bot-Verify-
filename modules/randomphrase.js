let e = module.exports

e.randomthing = function() {
function getRandomInt(max) {

  return Math.floor(Math.random() * Math.floor(max));
}

let x = "";
let y = "";

for (var i = 0; i < 12; i++) {
 x = x += getRandomInt(2)
if (x[i] == 0) {
  y += 'dog bruh '
}
else {
  y += 'cat bruh '
}
}

return y;
}




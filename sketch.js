var myMap;
var canvas;

var position;

var mappa = new Mappa('MapboxGL',
'pk.eyJ1Ijoia2FuZWRhbW4iLCJhIjoiY2sydDVmZm5jMTRrZzNkcWJkeGIzczdkeSJ9.sR1OjqoQxXbnNOQYdKa8rQ');

var options = {
  lat: 0,
  lng: 0,
  zoom: 5,
  studio: true,
  style: "mapbox://styles/kanedamn/ck2upik4000s21cmb9j7tyu3f"
}

var coordinates;

var fantasma1;
var fantasma2;
var fantasma3;

var imgKir;
var imgStar;

function preload() {
  position = getCurrentPosition();
  console.log(position);

  imgKir = loadImage("./assets/kirby.png");
  imgStar = loadImage("./assets/star.png");

}

function setup() {
  options.lat = position.latitude;
  options.lng = position.longitude;

  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fantasma1 = new Fantasma(48.8587741, 2.2069771, imgStar);
  fantasma2 = new Fantasma(41.9097289, 12.2551203, imgStar);
  fantasma3 = new Fantasma(40.853522, 14.1025778, imgStar);

}

function draw() {
  clear();
  coordinates = myMap.latLngToPixel(position.latitude, position.longitude);
  image(imgKir, coordinates.x, coordinates.y);

  fantasma1.display();
  fantasma2.display();
  fantasma3.display();

  var dist1 = calcGeoDistance(coordinates.x, coordinates.y, fantasma1.lat, fantasma1.lng, "km");
  dist1 = round(dist1);

  var dist2 = calcGeoDistance(coordinates.x, coordinates.y, fantasma2.lat, fantasma2.lng, "km");
  dist2 = round(dist2);

  var dist3 = calcGeoDistance(coordinates.x, coordinates.y, fantasma3.lat, fantasma3.lng, "km");
  dist3 = round(dist3);

  var rectX = windowWidth/2 + 500;
  var rectY = windowHeight/2 -320;

  rectMode(CENTER);
  noStroke();
  fill("white");
  rect(rectX, rectY, 550, 150);

  textFont('Roboto');
  textAlign(LEFT);
  textSize(20);
  fill(20);
  text("French Star is "+dist1+" baguettes away from you", rectX - 260, rectY - 40);
  text("Roman Star is "+dist2+" AOs away from you", rectX - 260, rectY);
  text("Neapolitan Star is "+dist3+" merendini's away from you", rectX - 260, rectY + 40);
}

function appearText(){
  fill("black");
  textSize(20);
  text("wewewe", windowWidth/2, windowHeight/2);
}

function Fantasma(_lat, _lng, _img, _text){
  this.lat = _lat;
  this.lng = _lng;
  this.img = _img;
  this.text = _text;

  this.display = function(){
    var pos = myMap.latLngToPixel(this.lat, this.lng);
    imageMode(CENTER);
    image(this.img, pos.x, pos.y);
  }
}

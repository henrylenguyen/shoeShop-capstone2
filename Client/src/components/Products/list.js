export function listProduct(name, price, img,quality,total){
  this.name = name,
  this.price = price,
  this.img = img,
  this.quality = quality,
  this.total = total,
  this.Total  = function(){
    return this.price * this.quality;
  }
}
class Drop {
  constructor() {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = random(width);      
      this.zz = this.z;
  }
  
  drip() {
 
  //create the streaking line to seem drop like

    let cirx = map(this.x/this.z, 0, 1, 0, width);
    let ciry = map(this.y/this.z, 0, 1, 0, height);
  let linx = map(this.x/this.zz, 0, 1, 0, width);
  let liny = map(this.y/this.zz, 0, 1, 0, height);
    this.zz = this.z;
    
    stroke(255);
    // strokeWeight(1)
    line(linx, liny, cirx, ciry);
  }
fall() {
    this.z = this.z + speed;
    if (this.z < 1) {
        this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.zz = this.z;
    }
  }}

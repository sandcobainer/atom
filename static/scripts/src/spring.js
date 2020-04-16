class Spring {
    constructor(M, K, D){
        this.pos = 0;
        this.vel = 0;
        this.acc = 0;
        this.f = 0;

        this.M = M; // Mass
        this.K = K; // Spring constant
        this.D = D;// Damping
        //this.R = 0; // Rest position
    }

    update() {
        this.f = -this.K * this.pos; // f=-ky
        this.acc = this.f / this.M;          // Set the acceleration, f=ma == a=f/m
        this.vel = this.D * (this.vel + this.acc);  // Set the velocity
        this.pos = this.pos + this.vel;        // Updated position

        if (abs(this.vel) < 0.1) {
            this.vel = 0.0;
        }
    }

    pull(distance) {
        this.pos += distance;
    }

    draw() {
        fill(0.2);
        circle(50, this.pos, 10);
    }
}

class PString {
    constructor(length, M, K, D) {
        this.length = length;
        this.array = Array(this.length);
        for (let i=0; i < this.length; i++) {
            this.array[i] = new Spring(M, K, D);
        }
    }

    pull(distance) {
        let middle_pos = this.length / 2;
        for (let i=0; i < this.length; i++) {
            this.array[i].pull(Math.sin(Math.PI/2*(1 + (i - middle_pos)/middle_pos))*distance);
        }
    }

    draw(x, y) {
        for (let i=0; i < this.length; i++) {
            stroke('purple'); // Change the color
            strokeWeight(3);
            point(x+i*1, y+this.array[i].pos);
        }
    }

    update() {
        for (let i=0; i < this.length; i++) {
            this.array[i].update();
        }
    }
}

module.exports = {
    Spring: Spring,
    PString: PString
}
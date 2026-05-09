"use client"
import React, { useEffect, useRef, useState } from 'react';

export default function TearableCover() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (isDestroyed) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDestroyed]);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    video.play().catch(e => console.log("Video auto-play prevented:", e));

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const gravity = 800;
    const spacing = Math.max(45, Math.floor(width / 40));
    const mouse_influence = spacing * 1.5;
    const mouse_cut = spacing * 0.8;
    const tear_distance = spacing * 2.5;

    const cloth_width = Math.floor(width / spacing) + 4;
    const cloth_height = Math.floor(height / spacing) + 4;
    const start_x = (width - cloth_width * spacing) / 2;
    const start_y = -spacing * 2; 

    interface IConstraint {
      p1: Point;
      p2: Point;
      length: number;
      resolve(): void;
    }

    let points: Point[] = [];
    let boundsx = width + spacing * 2;
    let boundsy = height + 500;

    let mouse = {
      down: false,
      button: 1,
      x: 0,
      y: 0,
      px: 0,
      py: 0
    };

    class Point {
      x: number;
      y: number;
      px: number;
      py: number;
      vx: number;
      vy: number;
      pin_x: number | null;
      pin_y: number | null;
      constraints: IConstraint[];

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
        this.pin_x = null;
        this.pin_y = null;
        this.constraints = [];
      }

      update(delta: number) {
        if (mouse.down) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (mouse.button === 1) { 
            if (dist < mouse_influence) {
              this.px = this.x - (mouse.x - mouse.px) * 1.8;
              this.py = this.y - (mouse.y - mouse.py) * 1.8;
            }
          } else if (dist < mouse_cut) { 
            this.constraints = [];
          }
        }

        this.vx = this.x - this.px;
        this.vy = this.y - this.py;

        this.px = this.x;
        this.py = this.y;

        this.vy += gravity * delta * delta;

        this.x += this.vx;
        this.y += this.vy;

        let i = this.constraints.length;
        while (i--) {
          this.constraints[i].resolve();
        }

        if (this.x > boundsx) {
          this.x = boundsx;
          this.px = this.x + this.vx * 0.5;
        } else if (this.x < -spacing * 2) {
          this.x = -spacing * 2;
          this.px = this.x + this.vx * 0.5;
        }

        if (this.pin_x != null && this.pin_y != null) {
          this.x = this.pin_x;
          this.y = this.pin_y;
        }
      }

      attach(point: Point) {
        this.constraints.push(new Constraint(this, point));
      }

      remove_constraint(constraint: IConstraint) {
        this.constraints.splice(this.constraints.indexOf(constraint), 1);
      }
    }

    class Constraint implements IConstraint {
      p1: Point;
      p2: Point;
      length: number;

      constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = spacing;
      }

      resolve() {
        let diff_x = this.p1.x - this.p2.x;
        let diff_y = this.p1.y - this.p2.y;
        let dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
        
        if (dist === 0) return;

        let diff = (this.length - dist) / dist;

        if (dist > tear_distance) {
          this.p1.remove_constraint(this);
          return;
        }

        let px = diff_x * diff * 0.5;
        let py = diff_y * diff * 0.5;

        this.p1.x += px;
        this.p1.y += py;
        this.p2.x -= px;
        this.p2.y -= py;
      }
    }

    for (let y = 0; y <= cloth_height; y++) {
      for (let x = 0; x <= cloth_width; x++) {
        let p = new Point(start_x + x * spacing, start_y + y * spacing);
        
        if (y === 0) {
          p.pin_x = p.x;
          p.pin_y = p.y;
        }
        if (x !== 0) {
          p.attach(points[points.length - 1]);
        }
        if (y !== 0) {
          p.attach(points[x + (y - 1) * (cloth_width + 1)]);
        }
        points.push(p);
      }
    }

    let animationFrameId: number;
    let lastTime = 0;
    let initialConstraints = 0;

    const update = (time: number) => {
      let delta = (time - lastTime) / 1000;
      if (delta > 0.05) delta = 0.05; 
      lastTime = time;
      
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      let p = points.length;
      while (p--) points[p].update(0.016);
      p = points.length;
      while (p--) points[p].update(0.016); 

      let videoReady = video.readyState >= 2;

      let drawWidth = width;
      let drawHeight = height;
      let drawX = 0;
      let drawY = 0;

      if (videoReady) {
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = width / height;

        if (videoAspect > canvasAspect) {
          drawWidth = height * videoAspect;
          drawX = -(drawWidth - width) / 2;
        } else {
          drawHeight = width / videoAspect;
          drawY = -(drawHeight - height) / 2;
        }
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; 
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(15, 15, 18, 0.98)"; 

      let currentConstraints = 0;

      for (let y = 0; y < cloth_height; y++) {
        for (let x = 0; x < cloth_width; x++) {
          let pTopLeft = points[x + y * (cloth_width + 1)];
          let pTopRight = points[(x + 1) + y * (cloth_width + 1)];
          let pBottomLeft = points[x + (y + 1) * (cloth_width + 1)];
          let pBottomRight = points[(x + 1) + (y + 1) * (cloth_width + 1)];

          if (!pTopRight || !pBottomLeft || !pBottomRight) continue;

          currentConstraints += pTopLeft.constraints.length;

          let rightConnected = pTopRight.constraints.some(c => c.p2 === pTopLeft);
          let downConnected = pBottomLeft.constraints.some(c => c.p2 === pTopLeft);
          let rightDownConnectedUp = pBottomRight.constraints.some(c => c.p2 === pTopRight);
          let rightDownConnectedLeft = pBottomRight.constraints.some(c => c.p2 === pBottomLeft);

          if (rightConnected && downConnected && rightDownConnectedUp && rightDownConnectedLeft) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(pTopLeft.x, pTopLeft.y);
            ctx.lineTo(pTopRight.x, pTopRight.y);
            ctx.lineTo(pBottomRight.x, pBottomRight.y);
            ctx.lineTo(pBottomLeft.x, pBottomLeft.y);
            ctx.closePath();
            
            if (videoReady) {
              ctx.clip();
              let orig_x = start_x + x * spacing;
              let orig_y = start_y + y * spacing;
              let dx = pTopLeft.x - orig_x;
              let dy = pTopLeft.y - orig_y;
              ctx.drawImage(video, drawX + dx, drawY + dy, drawWidth, drawHeight);
            } else {
              ctx.fill();
            }
            
            ctx.stroke(); 
            ctx.restore();
          }
        }
      }

      if (initialConstraints === 0 && currentConstraints > 0) {
        initialConstraints = currentConstraints;
      }

      let unbrokenPins = 0;
      for (let x = 0; x <= cloth_width; x++) {
        if (points[x].constraints.length > 0) unbrokenPins++;
      }
      const tearPercentage = 1 - (unbrokenPins / (cloth_width + 1));
      
      if (tearPercentage < 0.9) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, 0.4 - tearPercentage)})`;
          ctx.font = "900 8vw Inter";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("SAYUJYA Is Home", width / 2, height / 2 - 40);
          
          ctx.font = "bold 2vw Inter";
          ctx.fillStyle = `rgba(115, 177, 255, ${Math.max(0, 0.8 - tearPercentage * 2)})`;
          ctx.fillText("CLICK & DRAG TO TEAR", width / 2, height / 2 + 60);
      }

      // Drop the cover if they tear ANYWHERE (e.g. 5% of total constraints are broken)
      if (initialConstraints > 0 && currentConstraints < initialConstraints * 0.95) {
        setOpacity(prev => prev - 0.03); // Fast fade out
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.cancelable) e.preventDefault();
      let clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      let clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = clientX;
      mouse.y = clientY;
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      mouse.down = true;
      let button = 'button' in e ? (e as MouseEvent).button : 1;
      mouse.button = button === 2 ? 3 : 1;
      handleMouseMove(e);
    };

    const handleMouseUp = () => {
      mouse.down = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchmove', handleMouseMove, { passive: false });
    canvas.addEventListener('touchstart', handleMouseDown, { passive: false });
    window.addEventListener('touchend', handleMouseUp);
    canvas.addEventListener('contextmenu', e => e.preventDefault());

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    lastTime = performance.now();
    update(lastTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (opacity <= 0) {
      setTimeout(() => setIsDestroyed(true), 100);
    }
  }, [opacity]);

  if (isDestroyed) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${opacity < 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}
      style={{ opacity }}
    >
      <video
        ref={videoRef}
        src="src\the_boys.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-crosshair touch-none"
      />
    </div>
  );
}

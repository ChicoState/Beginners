'use client';
import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'
import './guitar.css';

neonCursor({
  el: document.getElementById('app'),
  shaderPoints: 16,
  curvePoints: 80,
  curveLerp: 0.5,
  radius1: 5,
  radius2: 30,
  velocityTreshold: 10,
  sleepRadiusX: 100,
  sleepRadiusY: 100,
  sleepTimeCoefX: 0.0025,
  sleepTimeCoefY: 0.0025
})

export default function Guitarpage() {
   <div id="app">
        <div id="hero">
            <h1>NEON<br/>CURSOR</h1>
            <a target="_blank" href="https://github.com/klevron/threejs-toys">github/threejs-toys</a>
            <h1>1.Buy a your favorite guiter</h1>
        </div>
    </div>
}

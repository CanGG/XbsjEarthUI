import MainUI from './managers/MainUI';

window.topZIndex = 1000;
window._wait = (msg)=>layer.msg(msg||"正在操作...", {
  icon: 16,
  shade: 0.01,
  time:0,
});

//console.log('XbsjEarthUI ' + VERSION);
let VERSION = VERSION;
export { MainUI, VERSION };

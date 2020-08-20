// const { init, errorCodes } = window.anylinejs;

// const entityMap = {
//   '&': '&amp;',
//   '<': '&lt;',
//   '>': '&gt;',
//   '"': '&quot;',
//   "'": '&#39;',
//   '/': '&#x2F;',
//   '`': '&#x60;',
//   '=': '&#x3D;',
// };

// function escapeHtml(string) {
//   return String(string).replace(/[&<>"'`=\/]/g, function(s) {
//     return entityMap[s];
//   });
// }

// function replaceVerticalBar(string) {
//   return String(string).replace(/[|]/g, function(s) {
//     return '\n';
//   });
// }

// const viewConfig = {
//   // captureResolution: '1080p',
//   outerColor: '000000',
//   outerAlpha: 0.5,
//   cutouts: [
//     {
//       cutoutConfig: {
//         // style: 'rect',
//         maxWidthPercent: '80%',
//         alignment: 'top_half',
//         ratioFromSize: {
//           width: 300,
//           height: 250,
//         },
//         width: 720,
//         strokeWidth: 2,
//         cornerRadius: 4,
//         strokeColor: 'FFFFFFFF',
//         feedbackStrokeColor: '0099FF',
//       },
//       // flash: {
//       //   mode: 'manual',
//       //   alignment: 'top_left',
//       // },
//       // cancelOnResult: false,
//       // "delayStartScanTime": 2000,
//       scanFeedback: {
//         style: 'contour_point',
//         strokeColor: '0099FF',
//         fillColor: '300099FF',
//         strokeWidth: 2,
//         cornerRadius: 4,
//         animationDuration: 150,
//         animation: 'NONE',
//         // beepOnResult: true,
//         // vibrateOnResult: true,
//         // blinkAnimationOnResult: true,
//       },
//     },
//   ],
// };


// const root = document.getElementById('root');
// let selectedPreset = undefined;

// function mountAnylineJS(preset) {
//   selectedPreset = preset;
//   const Anyline = init({
//     config: {},
//     preset: preset.value,
//     viewConfig,
//     license: demoLicense,
//     element: root,
//     debugAnyline: true,
//     anylinePath: '../anylinejs'
//   });

//   let modalOpen = false;

//   Anyline.onResult = result => {
//     console.log('Result: ', result);
//     if (modalOpen) return;
//     // Anyline.stopScanning();
//     window.Swal.fire({
//       title: 'Result',
//       html: `<div class="result">${result.result
//         .map(
//           resultEl =>
//             `
//         <div class="resultRow">
//           <div class="resultLabel">${resultEl.identifier}:</div>
//           <div>${escapeHtml(replaceVerticalBar(resultEl.text)) || 'kWh'}</div>
//         </div>`,
//         )
//         .join(' ')}
//       </div>`,
//       showCloseButton: true,
//       onBeforeOpen: () => {
//         modalOpen = true;
//       },
//       onAfterClose: () => {
//         modalOpen = false;
//         // Anyline.startScanning(); does not work right now when stopScanning before
//       },
//     });
//   };

//   Anyline.onReport = msg => {
//     console.log('Report: ', msg);
//   };

//   Anyline.onDebug = msg => {
//     alert(JSON.stringify(msg));
//   };

//   Anyline.onError = ({ code, message }) => {
//     if (code === errorCodes.WEBCAM_ERROR) {
//       console.error('webcam error: ', message);
//     }
//   };

//   Anyline.onLoad = () => {
//     console.log('ANYLINE LOADED on main thread');
//   };

//   Anyline.startScanning();

//   window.Anyline = Anyline;
// }

// function remountAnylineJS() {
//   Anyline.stopScanning();
//   Anyline.dispose();
//   mountAnylineJS(selectedPreset);
// }

// import anylinejs
const { init, errorCodes } = window.anylinejs;

// if copied into node_modules
// import { init, errorCodes } from 'anyline-js';

// anylinejs configuration
const config = {
    minConfidence: 30,
    charWhitelist: "ABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789"
}

// create a view configuration
const viewConfig = {
    outerColor: '000000',
    outerAlpha: 0.5,
    cutouts: [
        {
        cutoutConfig: {
            // style: 'rect',
            maxWidthPercent: '80%',
            alignment: 'top_half',
            ratioFromSize: {
                width: 300,
                height: 250,
            },
            width: 720,
            strokeWidth: 2,
            cornerRadius: 4,
            strokeColor: 'FFFFFFFF',
            feedbackStrokeColor: '0099FF',
        },
        scanFeedback: {
            style: 'contour_point',
            strokeColor: '0099FF',
            fillColor: '300099FF',
            strokeWidth: 2,
            cornerRadius: 4,
            animation: 'none',
        },
    },
    ],
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
      return entityMap[s];
    });
  }
  
function replaceVerticalBar(string) {
    return String(string).replace(/[|]/g, function(s) {
      return '\n';
    });
 }

const anylicense = 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjAtMDktMTkiLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvcHQtb3V0IiwidG9sZXJhbmNlRGF5cyI6NSwic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOnRydWUsImlvc0lkZW50aWZpZXIiOlsibWV0ZXJzY2FuLmhlcm9rdWFwcC5jb20iXSwiYW5kcm9pZElkZW50aWZpZXIiOlsibWV0ZXJzY2FuLmhlcm9rdWFwcC5jb20iXSwid2luZG93c0lkZW50aWZpZXIiOlsibWV0ZXJzY2FuLmhlcm9rdWFwcC5jb20iXSwid2ViSWRlbnRpZmllciI6WyJtZXRlcnNjYW4uaGVyb2t1YXBwLmNvbSJdLCJqc0lkZW50aWZpZXIiOlsibWV0ZXJzY2FuLmhlcm9rdWFwcC5jb20iXSwiaW1hZ2VSZXBvcnRDYWNoaW5nIjp0cnVlfQpIYWQxSCtlUGdEK3ZXT09xT1BZMU1vTXB2ZUpwN1hrbUJqakR2ZDJwUXBEdWV6K252MzJRTXdweGVOUFYyWWRwMXozczdnMzNPM3BZSjZUbHFzcDJ4ZllXV0RNa0ZNRTRxQlprQTg4c1o3VmhnaHRQM1hHOTJPSjA0K0tCOW9jSGZwYWQ0RVZGZk5pNEtQRnFBRXF0bXlCL3FxakVOK29UWXdjZGZkNnJ6cUxSd2FNMHZsUlhpK1FHQ2lsKzk4cFpHTW1NcndTSVc5WElZak9aZzRkQTZyOFo5UjdpVmZzOXAzVXUxTXhmRUJLRWpOcTY1Uk9jYjBuUHdCNHZqMFE5Q0dzalhDRjlBeU5jSUc0TWErdUdqTVNrR05pbDIzNzVtNkFZWXFFZWhmbWpzbmdlbHo3WjR3NWIyUHI4ODVUeXFoeUNpWXFMQkhXOXNJTjhhRG5EOUE9PQ==';

// access the container you want to mount anylinejs into
const root = document.getElementById('root');

// inititalize anylinejs with optional presets
// presets will override some dimension configuration of your viewConfig and modules in anylinejs config
const Anyline = init({
    preset: 'meter',
    viewConfig,
    license: anylicense,
    element: root,
    anylinePath: '../anylinejs', // path to the anylinejs folder from your html
});

Anyline.onResult = result => {
  console.log('Result: ', result);
  result.result.map(res => {
    document.getElementById("meterValue").innerHTML = escapeHtml(replaceVerticalBar(res.text)) + ' kWh' || 'kWh';
  });
 // window.location.reload(true);
};

Anyline.startScanning();

Anyline.onReport = (report) => {
    console.log('Anyline Reports: ', report);
};
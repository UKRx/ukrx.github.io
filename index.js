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

const anylicense = 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjAtMDktMTkiLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvcHQtb3V0IiwidG9sZXJhbmNlRGF5cyI6NSwic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOnRydWUsImlvc0lkZW50aWZpZXIiOlsiaW8uZ2l0aHViLnVrcngiXSwiYW5kcm9pZElkZW50aWZpZXIiOlsiaW8uZ2l0aHViLnVrcngiXSwid2luZG93c0lkZW50aWZpZXIiOlsiaW8uZ2l0aHViLnVrcngiXSwid2ViSWRlbnRpZmllciI6WyJpby5naXRodWIudWtyeCJdLCJqc0lkZW50aWZpZXIiOlsiaW8uZ2l0aHViLnVrcngiXSwiaW1hZ2VSZXBvcnRDYWNoaW5nIjp0cnVlfQpDVVBjbUlvc0dPalZXZzVrenExZ29vNGl5Z04vWXp1Qys3Zmp6NXIwRzhOcVdCeDBhczF4dWtIZXJKcUJtUWl6ZjE1TU5pM2R5QmZQdHBTS3U5M2RjK3F4MlU2LytrVmc5emxmTkpVaUtLZm5XTEtGeENZTHJVd29aVEhjSDVsd2sxRlpFbDNKTlZqcndKejkzWjlzUGFEa2REcWdYNmFNbDgwMXZvYVNURElUa29xRGlEOUNCdmRPRnd4T1VzamhETTVoL3Z4NGRMVUM0MkpNK0krZm5qeUNPMy9WTmh6NENpQnJ3V3NMSDNIT2dwTWF3NFRkNG9ldjhjbGJyeFdXMllKTFA5TXI1SUdzR01ady9qaXV0TzdwdFRiSmoyVmRNTHNGZkRhRzhoZXo5Y1g1Z3Z4UXVOMGt2Zis4TzJnZmxlWEExUUpXdjQ5SzNLRUpiVHRYa1E9PQ==';

// access the container you want to mount anylinejs into
const root = document.getElementById('root');

// inititalize anylinejs with optional presets
// presets will override some dimension configuration of your viewConfig and modules in anylinejs config
const Anyline = init({
    preset: 'meter',
    viewConfig,
    license: anylicense,
    element: root,
    anylinePath: '../../anylinejs', // path to the anylinejs folder from your html
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
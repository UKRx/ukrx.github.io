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

const anylicense = 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjAtMDEtMDciLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvcHQtb3V0IiwidG9sZXJhbmNlRGF5cyI6NSwic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOnRydWUsImlvc0lkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwiYW5kcm9pZElkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwid2luZG93c0lkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwid2ViSWRlbnRpZmllciI6WyJ1a3J4LmdpdGh1Yi5pbyJdLCJqc0lkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwiaW1hZ2VSZXBvcnRDYWNoaW5nIjp0cnVlfQoyNXBtL29Kb1JVbHpreDBnT2pRWGovQWozNURTZ3hwaG94WjlteFlnWWJMWWoyOUlmUkxpVE5ocUhqZzZZSG5EYjA4Y3kvbFIwRnd1N0NyWjVPTlp5Y3JQT3hPeG1NekFrdXZUam5NMno4TE4venlyMU01Tlg2MVl5VTlYTWJkZW1mWVNPNVBlMU5qb3p2N3NjZWZ0eTRrNmJpZHpIM3FpR0tEN01yanFGQzh0WEpsSkhlMEVPcE9wL3lnTCtLcWNiWnVObHhvWlhpaGxPZEIyeURQZHlpRlJnVTNmM28rTDMvUE1rSlhOSVhCcmxGZ1ZKaDBHUkZ3K1RqREUrM2xtREJlTVVZcmRHMXd4YzlQNHZoVnh3YkU2b2FON3JjZ1VsbHJ4TG13d1FFQzc4cmI5SS92YU0xUC9ZaVUwMDVjbDQ0eUw3L0t6bTdsRnFEcE1IRUR0VkE9PQ==';

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
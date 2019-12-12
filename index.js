const { init, errorCodes } = window.anylinejs;

const viewConfig = {
  // captureResolution: '1080p',
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
      // flash: {
      //   mode: 'manual',
      //   alignment: 'top_left',
      // },
      // cancelOnResult: false,
      // "delayStartScanTime": 2000,
      scanFeedback: {
        style: 'contour_point',
        strokeColor: '0099FF',
        fillColor: '300099FF',
        strokeWidth: 2,
        cornerRadius: 4,
        animationDuration: 150,
        animation: 'NONE',
        // beepOnResult: true,
        // vibrateOnResult: true,
        // blinkAnimationOnResult: true,
      },
    },
  ],
};

const anylicense =
  'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjAtMDEtMDciLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvcHQtb3V0IiwidG9sZXJhbmNlRGF5cyI6NSwic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOnRydWUsImlvc0lkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwiYW5kcm9pZElkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwid2luZG93c0lkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwid2ViSWRlbnRpZmllciI6WyJ1a3J4LmdpdGh1Yi5pbyJdLCJqc0lkZW50aWZpZXIiOlsidWtyeC5naXRodWIuaW8iXSwiaW1hZ2VSZXBvcnRDYWNoaW5nIjp0cnVlfQoyNXBtL29Kb1JVbHpreDBnT2pRWGovQWozNURTZ3hwaG94WjlteFlnWWJMWWoyOUlmUkxpVE5ocUhqZzZZSG5EYjA4Y3kvbFIwRnd1N0NyWjVPTlp5Y3JQT3hPeG1NekFrdXZUam5NMno4TE4venlyMU01Tlg2MVl5VTlYTWJkZW1mWVNPNVBlMU5qb3p2N3NjZWZ0eTRrNmJpZHpIM3FpR0tEN01yanFGQzh0WEpsSkhlMEVPcE9wL3lnTCtLcWNiWnVObHhvWlhpaGxPZEIyeURQZHlpRlJnVTNmM28rTDMvUE1rSlhOSVhCcmxGZ1ZKaDBHUkZ3K1RqREUrM2xtREJlTVVZcmRHMXd4YzlQNHZoVnh3YkU2b2FON3JjZ1VsbHJ4TG13d1FFQzc4cmI5SS92YU0xUC9ZaVUwMDVjbDQ0eUw3L0t6bTdsRnFEcE1IRUR0VkE9PQ==';

const root = document.getElementById('root');

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
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

function mountAnylineJS(preset) {
  const Anyline = init({
    preset: 'meter',
    viewConfig,
    license: anylicense,
    element: root,
    anylinePath: '../../anylinejs',
  });

  let modalOpen = false;

  Anyline.onResult = result => {
    console.log('Result: ', result);
    if (modalOpen) return;
    // Anyline.stopScanning();
    window.Swal.fire({
      title: 'Result',
      html: `<div class="result">${result.result
        .map(
          resultEl =>
            `
        <div class="resultRow">
          <div class="resultLabel">${resultEl.identifier}:</div>
          <div>${escapeHtml(replaceVerticalBar(resultEl.text)) || 'kA'}</div>
        </div>`,
        )
        .join(' ')}
      </div>`,
      showCloseButton: true,
      onBeforeOpen: () => {
        modalOpen = true;
      },
      onAfterClose: () => {
        modalOpen = false;
      },
    });
  };

  Anyline.onReport = msg => {
    console.log('Report: ', msg);
  };

  Anyline.onError = ({ code, message }) => {
    if (code === errorCodes.WEBCAM_ERROR) {
      console.error('webcam error: ', message);
    }
  };

  Anyline.onLoad = () => {
    console.log('ANYLINE LOADED on main thread');
  };

  Anyline.startScanning();

  window.Anyline = Anyline;
}

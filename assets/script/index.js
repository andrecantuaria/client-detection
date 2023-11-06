'use strict';
 
// Utility functions
function onEvent(event, selector, callback) {
 return selector.addEventListener(event, callback);
}
 
function select(selector, parent = document) {
 return parent.querySelector(selector);
}
 
function selectById(selector, parent = document) {
 return parent.getElementById(selector);
}
 
function print(...args) {
 console.log(args.join(', '));
}

// Main Code
// SYSTEM 
const operatingSystem = selectById('operating-system');
const systemLanguage = selectById('system-language');
const browserName = selectById('browser-name');


function getOperationSystem() {
    const userAgent = navigator.userAgent;
    let osName;
    
    switch (true) {
        case userAgent.includes('iOS'):
            osName = 'iOS';
            break;
        case userAgent.includes('Mac OS'):
            osName = 'Mac OS';
            break;
        case userAgent.includes('Linux'):
            osName = 'Linux';
            break;
        case userAgent.includes('Android'):
            osName = 'Android';
            break;
        case userAgent.includes('Windows'):
            osName = 'Windows';
            break;
        default:
            osName = 'Other';
    }
    
    operatingSystem.innerText = `OS: ${osName}`;
}

onEvent('load', window, () => {
    getOperationSystem();
})

// System Language
function getSystemLanguage() {
    systemLanguage.innerText = `Language: ${navigator.language}`;
}

onEvent('load', window, () => {
    getSystemLanguage();
})

// Browser
function getBrowserName() {
    function getOperatingSystem() {
        const userAgent = navigator.userAgent;
        let browser;
        
        switch (true) {
            case userAgent.includes('Edg'):
                browser = 'Microsoft Edge';
                break;
            case userAgent.includes('Firefox'):
                browser = 'Firefox';
                break;
            case userAgent.includes('Chrome'):
                browser = 'Chrome';
                break;
            case userAgent.includes('Safari'):
                browser = 'Safari';
                break;
            default:
                browser = 'Other';
        }
        
        return browser; 
    }

    const browser = getOperatingSystem();
    browserName.innerText = `Browser: ${browser}`;
}

onEvent('load', window, () => {
    getBrowserName();
});

// WINDOW 
//window width and height
const windowW = selectById('window-width');
const windowH = selectById('window-height');

function setWindowDimensions() {
    windowW.innerText = `Width: ${window.innerWidth}px`;
    windowH.innerText = `Height: ${window.innerHeight}px`;
}

onEvent('load', window, () => {
    setWindowDimensions();
})

onEvent('resize', window, () => {
    setWindowDimensions();
})

// window orientation
const windowOrientation = selectById('window-orientation');
function setWindowOrientation() {
    if (window.innerWidth > window.innerHeight) {
      return 'Orientation: landscape';
    } else {
      return 'Orientation: portrait';
    }
  }

  function updateOrientation() {
    const orientation = setWindowOrientation();
    windowOrientation.textContent = orientation;
  }

  onEvent('resize', window, updateOrientation);

  onEvent('load', window, () => {
    const orientation = setWindowOrientation();
    windowOrientation.textContent = orientation;
  });

  // BATTERY
  // Battery Level
  const batteryLevel = selectById('battery-level');
  const batteryStatus = selectById('battery-status');
  
  function getBatteryLevel() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(function(battery) {
        const batteryPercentage = (battery.level * 100).toFixed(2);
        batteryLevel.innerText = `Level: ${batteryPercentage}%`;
      });
    } else {
      batteryLevel.innerText = 'Level: Not Available';
    }
  }
  
  onEvent('load', window, () => {
    getBatteryLevel();
  });

  //Battery Status
  function getBatteryStatus() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(function(battery) {
        switch (battery.charging) {
          case true:
            batteryStatus.innerText = 'Status: Charging';
            break;
          case false:
            batteryStatus.innerText = 'Status: Idle';
            break;
          default:
            batteryStatus.innerText = 'Status: Undefined';
        }
      });
    } else {
      batteryStatus.innerText = 'Status: Not Available';
    }
  }
  
  onEvent('load', window, () => {
    getBatteryStatus();
  });

  // Network status
  const networkStatus = selectById('network-status');
  const statusCell = select('.status-cell');

  function changeStatusCellColor() {
    statusCell.style.backgroundColor = 'red';
  }

  function getNetworkStatus() {
      const online = window.navigator.onLine;
      if (online) {
        return 'ONLINE';
    } else {
        changeStatusCellColor();
        return 'OFFLINE'
    }
}
  
  onEvent('load', window, () => {
      const status = getNetworkStatus();
      networkStatus.textContent = status;
  });

// print tests
print(navigator.userAgent)



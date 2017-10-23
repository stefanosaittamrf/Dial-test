define(function(require) {
  'use strict';

  var MOCK_DATA_DELAY = 1000;

  // Radial Indicator Styles ----------------------------------------------------------------------------------

  var radialIndicator = require('radialIndicator');

  var revenueGraph = radialIndicator('#radialContainer1', {
    barColor: '#207a11',
    barBgColor: '#4bdb32',
    radius: 100,
    barWidth: 8,
    initValue: 0,
    frameTime: 0.1,
    interpolate: true,
    displayNumber: false
  });

  var impressionsGraph = radialIndicator('#radialContainer2', {
    barColor: '#2d347f',
    barBgColor: '#2ee1f2',
    radius: 100,
    barWidth: 8,
    initValue: 0,
    frameTime: 0.1,
    displayNumber: false
  });

  var visitsGraph = radialIndicator('#radialContainer3', {
    barColor: '#e0790b',
    barBgColor: '#efd840',
    radius: 100,
    barWidth: 8,
    initValue: 0,
    frameTime: 0.1,
    displayNumber: false
  });


  // Mocked Data ----------------------------------------------------------------------------------------------------

  var mockResponseData = {
    revenue: {
      total: 200000,
      smartphone: 80000,
      tablet: 120000,
      percent: {
        smartphone: 40,
        tablet: 60
      }
    },
    impressions: {
      total: 50000000,
      smartphone: 30000000,
      tablet: 20000000,
      percent: {
        smartphone: 60,
        tablet: 40
      }
    },
    visits: {
      total: 600000000,
      smartphone: 480000000,
      tablet: 120000000,
      percent: {
        smartphone: 20,
        tablet: 80
      }
    },
  };


  // Mocked server communication -------------------------------------------------------------------------------------

  function retrieveData(isMocked, callback) {
    if (isMocked) {
      window.setTimeout(function() {
        callback(mockResponseData);
      }, MOCK_DATA_DELAY);
    } else {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', 'https://api.chucknorris.io/jokes/random', true);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
          if (xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            callback(data);
          }
        }
      };
      xmlhttp.send(null);
    }
  }

  function updateElement(id, value) {
    document.getElementById(id).innerHTML = value;
  }

  function updateRevenue(revenue) {
    updateElement("total-revenue", numberWithCommas(revenue.total));
    updateElement("tablet-revenue-number", numberWithCommas(revenue.tablet));
    updateElement("smartphone-revenue-number", numberWithCommas(revenue.smartphone));
    updateElement("tablet-revenue-percentage", revenue.percent.tablet);
    updateElement("smartphone-revenue-percentage", revenue.percent.smartphone);
  }

  function updateImpressions(impressions) {
    updateElement("total-impressions", numberWithCommas(impressions.total));
    updateElement("tablet-impressions-number", numberWithCommas(impressions.tablet));
    updateElement("smartphone-impressions-number", numberWithCommas(impressions.smartphone));
    updateElement("tablet-impressions-percentage", impressions.percent.tablet);
    updateElement("smartphone-impressions-percentage", impressions.percent.smartphone);
  }

  function updateVisits(visits) {
    updateElement("total-visits", numberWithCommas(visits.total));
    updateElement("tablet-visits-number", numberWithCommas(visits.tablet));
    updateElement("smartphone-visits-number", numberWithCommas(visits.smartphone));
    updateElement("tablet-visits-percentage", visits.percent.tablet);
    updateElement("smartphone-visits-percentage", visits.percent.smartphone);
  }


  function uppdateRadialGraph(data) {
    revenueGraph.animate(data.revenue.percent.smartphone);
    impressionsGraph.animate(data.impressions.percent.smartphone);
    visitsGraph.animate(data.visits.percent.smartphone);
  }


  // Main ---------------------------------------------------------------------------------------------------------------

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  retrieveData(true, function(data) {
    updateRevenue(data.revenue);
    updateImpressions(data.impressions);
    updateVisits(data.visits);
    uppdateRadialGraph(data);
  });

});

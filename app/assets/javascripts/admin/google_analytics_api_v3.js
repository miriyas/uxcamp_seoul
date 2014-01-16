var clientId = '666552753316-hsp92qqqsuieopca5ecdduouukufrq7a.apps.googleusercontent.com';
var apiKey = 'AIzaSyBk6uTV_hb8SLeUDuzbackCAJvZ6Fje4vA';
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';
var hasCompany = false
var result = ""

// This function is called after the Client Library has finished loading
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}


function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


function handleAuthResult(authResult) {
	if (authResult) {
    // The user has authorized access
    // Load the Analytics Client. This function is defined in the next section.
    loadAnalyticsClient();
  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}


// Authorized user
function handleAuthorized() {
  var waitingButton = document.getElementById('waiting-button');
  var authorizeButton = document.getElementById('authorize-button');
  var makeApiCallButton = document.getElementById('make-api-call-button');

  waitingButton.style.display = 'none';
  makeApiCallButton.style.display = 'inline-block';
  authorizeButton.style.display = 'none';
  makeApiCallButton.onclick = makeApiCall;
}


// Unauthorized user
function handleUnAuthorized() {
  var waitingButton = document.getElementById('waiting-button');
  var authorizeButton = document.getElementById('authorize-button');
  var makeApiCallButton = document.getElementById('make-api-call-button');

  waitingButton.style.display = 'none';
  makeApiCallButton.style.display = 'none';
  authorizeButton.style.display = 'inline-block';
  authorizeButton.onclick = handleAuthClick;
}


function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}


function loadAnalyticsClient() {
	console.log("GAv3 loaded")
  // Load the Analytics client and set handleAuthorized as the callback function
  gapi.client.load('analytics', 'v3', handleAuthorized);
}
function makeApiCall() {
	queryAccounts();
}

function queryAccounts() {
  // console.log('Querying Accounts.');

  // Get a list of all Google Analytics accounts for this user
  gapi.client.analytics.management.accounts.list().execute(handleAccounts);
}

function handleAccounts(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {

      // Get the first Google Analytics account
      var firstAccountId = results.items[0].id;

      // Query for Web Properties
      queryWebproperties(firstAccountId);

    } else {
      // console.log('No accounts found for this user.')
    }
  } else {
    // console.log('There was an error querying accounts: ' + results.message);
  }
}

function queryWebproperties(accountId) {
  // console.log('Querying Webproperties.');

  // Get a list of all the Web Properties for the account
  gapi.client.analytics.management.webproperties.list({'accountId': accountId}).execute(handleWebproperties);
}

function handleWebproperties(results) {
	console.log("hw")
  if (!results.code) {
    if (results && results.items && results.items.length) {

      // Get the first Google Analytics account
      var firstAccountId = results.items[0].accountId;

      // Get the first Web Property ID
      var firstWebpropertyId = results.items[0].id;

      // Query for Views (Profiles)
      queryProfiles(firstAccountId, firstWebpropertyId);

    } else {
      // console.log('No webproperties found for this user.');
    }
  } else {
    // console.log('There was an error querying webproperties: ' + results.message);
  }
}

function queryProfiles(accountId, webpropertyId) {
  // console.log('Querying Views (Profiles).');

  // Get a list of all Views (Profiles) for the first Web Property of the first Account
  gapi.client.analytics.management.profiles.list({
      'accountId': accountId,
      'webPropertyId': webpropertyId
  }).execute(handleProfiles);
}

function handleProfiles(results) {
  if (!results.code) {
    if (results && results.items && results.items.length) {

      // Get the first View (Profile) ID
      var firstProfileId = results.items[0].id;

      // Step 3. Query the Core Reporting API
      queryCoreReportingApi(firstProfileId);

    } else {
      // console.log('No views (profiles) found for this user.');
    }
  } else {
    // console.log('There was an error querying views (profiles): ' + results.message);
  }
}

function queryCoreReportingApi(profileId) {
  console.log('Querying Core Reporting API.');

	var _start_year = $("#date_start_year")[0].selectedOptions[0].value;
	var _start_month = $("#date_start_month")[0].selectedOptions[0].value;
	var _start_day = $("#date_start_day")[0].selectedOptions[0].value;
	var start_date = _start_year + "-" + _pad2(_start_month) + "-" + _pad2(_start_day);

	var _end_year = $("#date_end_year")[0].selectedOptions[0].value;
	var _end_month = $("#date_end_month")[0].selectedOptions[0].value;
	var _end_day = $("#date_end_day")[0].selectedOptions[0].value;
	var end_date = _end_year + "-" + _pad2(_end_month) + "-" + _pad2(_end_day);
	
	function _pad2(number) {
		return (number < 10 ? '0' : '') + number
	}

	hasCompany = $('#target_company').html() == "" ? false : true

	if ( hasCompany == false ) {
		var dimensions = $('#dimensions')[0].value;
		var filters = null;
	} else {
		var dimensions = $('#dimensions')[0].value + $('#target_company').data("dimension");
		var filters = $('#target_company').data("filter");
	}

	// if($('#metrics')[0].value == "visitors") {
	// 	var metrics = "ga:visitors,ga:newVisits,ga:percentNewVisits";		
	// } else {
	// 	var metrics = "ga:visits,ga:bounces,ga:entranceBounceRate,ga:visitBounceRate,ga:timeOnSite,ga:avgTimeOnSite";
	// }	
	console.log("start date :" + start_date);
	console.log("end date :" + end_date);
	console.log("dimensions :" + dimensions);
	console.log("filter :" + filters);

	// for Visitor
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:78859617',
    'start-date': start_date,
    'end-date': end_date,
		'dimensions': dimensions,
    'metrics': "ga:newVisits,ga:visitors",
		'filters': filters
  }).execute(handleCoreReportingResults);

	// for Country
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:78859617',
    'start-date': start_date,
    'end-date': end_date,
 		'sort': "-ga:visits",
 		'dimensions': hasCompany == true ? "ga:country,ga:pagePath" : "ga:country",
    'metrics': "ga:visits",
 		'filters': filters
  }).execute(refineCountryResults);
	
	// for Browser
	gapi.client.analytics.data.ga.get({
		'ids': 'ga:78859617',
		'start-date': start_date,
		'end-date': end_date,
		'sort': "-ga:visits",
		'dimensions': hasCompany == true ? "ga:browser,ga:pagePath" : "ga:browser",
		'metrics': "ga:visits",
		'filters': filters
	}).execute(refineBrowserResults);

	// for Duration, Page/Visit, Bounce Rate
	gapi.client.analytics.data.ga.get({
		'ids': 'ga:78859617',
		'start-date': start_date,
		'end-date': end_date,
		'dimensions': dimensions,
		'metrics': "ga:avgTimeOnSite,ga:pageviewsPerVisit,ga:bounces,ga:visits",
		'filters': filters
	}).execute(refineDPBResults);
	
	// for cells
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:78859617',
    'start-date': start_date,
    'end-date': end_date,
		'dimensions': hasCompany == true ? "ga:pagePath" : null,
    'metrics': "ga:visits,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:bounces",
		'filters': filters
  }).execute(drawCell);	
}


function handleCoreReportingResults(results) {
  if (results.error) {
    // console.log('There was an error querying core reporting API: ' + results.message);
  } else {
    refineResults(results);
  }
}
function refineResults(results) {
  if (results.rows && results.rows.length) {
		var data = [];
		var rows_count = results.rows.length;
		var cell_count = results.rows[0].length;
		for (var j = (hasCompany == true ? 2 : 1), clen = cell_count; j < clen; j++) {
			var cell = [];
			for (var i = 0, rlen = rows_count; i < rlen; i++) {
				cell.push([results.rows[i][0], parseInt(results.rows[i][j],10)]);
			}
			data.push(cell);
		}
		drawVisitorChart(data);
  } else {
    // console.log('No results found');
  }
}
function drawVisitorChart(data) {
	if ( hasCompany == true ){
		var Chart = new JSChart('chart_company_visitor', 'line');
	} else {
		var Chart = new JSChart('chart_visitor', 'line');
	}
	Chart.setDataArray(data[0], "신규 방문 수");
	Chart.setDataArray(data[1], "순 방문자 수");
	Chart.setTitle('신규 방문과 순방문자 수');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('');
	Chart.setAxisNameY('');
	Chart.setLineColor("#444444", "신규 방문 수");
	Chart.setLineColor("#CC4444", "순 방문자 수");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(1200, 300);	
	Chart.setLegendShow(true);
	Chart.setLegendPosition(1063,55);
	Chart.draw();

	setTimeout(function(){
		$('#chart_visitor div, #chart_company_visitor div').hide();
	},10)
}


// for Countries
function refineCountryResults(results) {
	// console.log(results)
  if (results.rows && results.rows.length) {
		var data = new Array;
		var rows_count = (results.rows.length < 10 ? results.rows.length : 10)
		
		if (hasCompany == true) {
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				data.push([results.rows[i][0], parseInt(results.rows[i][2],10)]);
			}
		} else {
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				data.push([results.rows[i][0], parseInt(results.rows[i][1],10)]);
			}
		}
		drawCountryChart(data);
  } else {
    // console.log('No results found');
  }
}
function drawCountryChart(data) {
	if ( hasCompany == true ){
		var Chart = new JSChart('chart_company_country', 'pie');
	} else {
		var Chart = new JSChart('chart_country', 'pie');
	}
	Chart.setTitle('방문자의 국가');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.resize(585, 500);	
	Chart.setTitleColor('#857D7D');
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#6A0000');
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	
	setTimeout(function(){
		$('#chart_country div, #chart_company_country div').hide();
	},10)
}


// for Browsers
function refineBrowserResults(results) {
  if (results.rows && results.rows.length) {
		var data = new Array;
		var rows_count = (results.rows.length < 10 ? results.rows.length : 10)
		
		for(var i = 0, rlen = rows_count; i < rlen; i++){
			if ( hasCompany == true ){
				data.push([results.rows[i][0], parseInt(results.rows[i][2],10)]);
			} else {
				data.push([results.rows[i][0], parseInt(results.rows[i][1],10)]);
			}
		}
		drawBrowserChart(data);
  } else {
    // console.log('No results found');
  }
}
function drawBrowserChart(data) {
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_browser', 'pie');
	} else {
		var Chart = new JSChart('chart_browser', 'pie');
	}
	Chart.setTitle('방문자의 브라우저');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.resize(585, 500);	
	Chart.setTitleColor('#857D7D');
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#6A0000');
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	
	setTimeout(function(){
		$('#chart_browser div, #chart_company_browser div').hide();
	},10)
}


// for Duration, Page/Visit, Bounce Rate
function refineDPBResults(results) {
	// console.log(results.rows)
  if (results.rows && results.rows.length) {
		var data = new Array;
		var rows_count = results.rows.length
		var cell_count = results.rows[0].length

		var cell = new Array();
		
		if (hasCompany == true) {
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				cell.push([results.rows[i][0], parseFloat(results.rows[i][2])]);
			}
			data.push(cell)

			var cell = new Array();
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				cell.push([results.rows[i][0], parseFloat(results.rows[i][3])]);
			}
			data.push(cell)

			var cell = new Array();
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				cell.push([results.rows[i][0], (results.rows[i][4] == 0 ? 0 : parseFloat(results.rows[i][3]/results.rows[i][5])) ]);
			}
			data.push(cell)
		} else {
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				cell.push([results.rows[i][0], parseFloat(results.rows[i][1])]);
			}
			data.push(cell)

			var cell = new Array();
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				cell.push([results.rows[i][0], parseFloat(results.rows[i][2])]);
			}
			data.push(cell)

			var cell = new Array();
			for(var i = 0, rlen = rows_count; i < rlen; i++){
				cell.push([results.rows[i][0], (results.rows[i][3] == 0 ? 0 : parseFloat(results.rows[i][3]/results.rows[i][4])) ]);
			}
			data.push(cell)	
		}
				
		drawDPBChart(data);
  } else {
    // console.log('No results found');
  }
}
function drawDPBChart(data) {
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_duration', 'line');
	} else {
		var Chart = new JSChart('chart_duration', 'line');
	}
	Chart.setDataArray(data[0], "평균 체류시간");
	Chart.setTitle('평균 체류시간');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('');
	Chart.setAxisNameY('');
	Chart.setLineColor("#CC4444", "평균 체류시간");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(382, 300);	
	Chart.setLegendShow(true);
	Chart.setLegendPosition(300,55);
	Chart.draw();
	setTimeout(function(){
		$('#chart_duration div, #chart_company_duration div').hide();
	},10)
	
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_pagepervisit', 'line');
	} else {
		var Chart = new JSChart('chart_pagepervisit', 'line');
	}
	Chart.setDataArray(data[1], "방문당 조회수");
	Chart.setTitle('방문당 조회수');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('');
	Chart.setAxisNameY('');
	Chart.setLineColor("#44CC44", "방문당 조회수");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(382, 300);	
	Chart.setLegendShow(true);
	Chart.setLegendPosition(300,55);
	Chart.draw();
	setTimeout(function(){
		$('#chart_pagepervisit div, #chart_company_pagepervisit div').hide();
	},10)
	
	if ( hasCompany == true ){
		var Chart = new JSChart('chart_company_bounce', 'line');
	} else {
		var Chart = new JSChart('chart_bounce', 'line');
	}
	Chart.setDataArray(data[2], "이탈률");
	Chart.setTitle('이탈률');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('');
	Chart.setAxisNameY('');
	Chart.setLineColor("#4444CC", "이탈률");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(382, 300);	
	Chart.setLegendShow(true);
	Chart.setLegendPosition(300,55);
	Chart.draw();
	setTimeout(function(){
		$('#chart_bounce div, #chart_company_bounce div').hide();
	},10)
}


// for Cells
function drawCell(results) {
	console.log(results)
  if (results.rows && results.rows.length) {
		if ( hasCompany == true ){
			console.log(1)
			var visits = results.rows[0][1];
			var newVisits = results.rows[0][2];
			var pageviews = results.rows[0][3];
			var pageviewsPerVisit = results.rows[0][4];
			var avgTimeOnSite = results.rows[0][5];
			var bounces = results.rows[0][6];
			$('#text_company_visits').text(visits);
			$('#text_company_uniqueVisitors').text(newVisits);
			$('#text_company_pageviews').text(pageviews);
			$('#text_company_pagesPerVisit').text(parseFloat(pageviewsPerVisit).toFixed(2));
			$('#text_company_avgVisitDuration').text(parseInt(avgTimeOnSite,10) + "초");
			$('#text_company_bounceRate').text((bounces/visits*100).toFixed(2) + "%");
			$('#text_company_perNewVisits').text((newVisits/visits*100).toFixed(2) + "%");
		} else {
			console.log(2)
			var visits = results.rows[0][0];
			var newVisits = results.rows[0][1];
			var pageviews = results.rows[0][2];
			var pageviewsPerVisit = results.rows[0][3];
			var avgTimeOnSite = results.rows[0][4];
			var bounces = results.rows[0][5];
			$('#text_visits').text(visits);
			$('#text_uniqueVisitors').text(newVisits);
			$('#text_pageviews').text(pageviews);
			$('#text_pagesPerVisit').text(parseFloat(pageviewsPerVisit).toFixed(2));
			$('#text_avgVisitDuration').text(parseInt(avgTimeOnSite,10) + "초");
			$('#text_bounceRate').text((bounces/visits*100).toFixed(2) + "%");
			$('#text_perNewVisits').text((newVisits/visits*100).toFixed(2) + "%");
		}
  } else {
    // console.log('No results found');
  }
}


$(".quickSelect").click(function(e){
	e.preventDefault();
	var end_date = moment([
		$("#date_end_year")[0].selectedOptions[0].value,
		$("#date_end_month")[0].selectedOptions[0].value-1,
		$("#date_end_day")[0].selectedOptions[0].value
	]);

	if ($(this).data("range") == "1w") {
		var start_date = end_date.subtract('d', 7);
	}
	else if ($(this).data("range") == "1m") {
		var start_date = end_date.subtract('M', 1);
	}
	else {
		var start_date = end_date.subtract('M', 3);
	}

	$("#date_start_year")[0].selectedIndex = $("#date_start_year option[value=" + start_date.format("YYYY") + "]")[0].index
	$("#date_start_month")[0].selectedIndex = $("#date_start_month option[value=" + start_date.format("M") + "]")[0].index
	$("#date_start_day")[0].selectedIndex = $("#date_start_day option[value=" + start_date.format("D") + "]")[0].index
})

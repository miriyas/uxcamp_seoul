var hasCompany = false
// var colors_set = ['#FF7F7F', '#FFBF7F', '#EAFF7F', '#95FF7F', '#7FFFBF', '#7FEAFF', '#7F95FF', '#BF7FFF', '#FF7FEA', '#FF7F95'];
// var colors_set = ['#ffcfcd', '#fff6bf', '#cbf2cf', '#cdf2f2', '#bfdcf5', '#ebc2f1', '#e0c4d2', '#ffe0c6', '#bfffdb', '#cee5db'];
var colors_set = ['#ffb3af', '#ffcea4', '#fff199', '#99ffc6', '#abebb3', '#b1d6c6', '#b0ebeb', '#ccf1ff', '#99c7f0', '#99a5b2'];
// var colors_set = ['#f889df', '#ffc28d', '#97e6a0', '#bfedff', '#d886e4', '#ffa09b', '#80ffb8', '#9ce6e6', '#808f9f', '#c28aa5'];

$("#waiting-button").hide();

function queryCoreReportingApi(profileId) {
  console.log('Querying Core Reporting API ...');

	var start_date = $('#date_start').val();
	var end_date = $('#date_end').val();

	function _pad2(number) {
		return (number < 10 ? '0' : '') + number
	}

	hasCompany = $('#target_company').html() == "" ? false : true
	if ( hasCompany == false ) {
		var dimensions = $('#dimensions')[0].value;
		var filters = "nil";
	} else {
		var dimensions = $('#dimensions')[0].value + $('#target_company').data("dimension");
		var filters = $('#target_company').data("filter");
	}

	console.log("- start date :" + start_date);
	console.log("- end date :" + end_date);
	console.log("- dimensions :" + dimensions);
	console.log("- filter :" + filters);
	console.log("- company? " + hasCompany);
  
	$("#make-api-call-button").hide();
	$("#waiting-button").show();

	$.ajax("/admin/stat_query", {
		data: {
			queries: {
        visitor: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'dimensions': hasCompany == true ? dimensions : dimensions.replace(",",""),
          'metrics': "ga:newVisits,ga:visitors",
          'filters': filters
        },
        dpb: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'dimensions': dimensions,
          'metrics': "ga:avgTimeOnSite,ga:pageviewsPerVisit,ga:bounces,ga:visits",
          'filters': filters
        },
        country: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:country" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:country" : "ga:country",
          'metrics': "ga:visits",
          'filters': filters
        },
        city: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:city" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:city" : "ga:city",
          'metrics': "ga:visits",
          'filters': filters
        },
        language: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:language" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:language" : "ga:language",
          'metrics': "ga:visits",
          'filters': filters
        },
        browser: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:browser" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:browser" : "ga:browser",
          'metrics': "ga:visits",
          'filters': filters
        },
        os: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:operatingSystem" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:operatingSystem" : "ga:operatingSystem,ga:operatingSystemVersion",
          'metrics': "ga:visits",
          'filters': filters
        },
        resolution: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:screenResolution" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:screenResolution" : "ga:screenResolution",
          'metrics': "ga:visits",
          'filters': filters
        },
        keyword: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:keyword" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:keyword" : "ga:keyword",
          'metrics': "ga:visits",
          'filters': filters
        },
        searchEngine: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:source" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:source" : "ga:source",
          'metrics': "ga:visits",
          'filters': filters
        },
        referer: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': hasCompany == true ? "ga:fullReferrer" : "-ga:visits",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:fullReferrer" : "ga:fullReferrer",
          'metrics': "ga:visits",
          'filters': filters
        },
        timming: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'sort': "ga:hour",
          'dimensions': hasCompany == true ? "ga:pagePath,ga:hour" : "ga:hour",
          'metrics': "ga:visits",
          'filters': filters
        },
        cells: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'dimensions': hasCompany == true ? "ga:pagePath" : null,
          'metrics': "ga:visits,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:bounces",
          'filters': filters
        }
			}
		},
		success: function(data, status, xhr) {
			if (status == 'success') {
				console.log("success.")
				console.log(data);
				$("#make-api-call-button").show();
				$("#waiting-button").hide();
				handleCoreReportingResults(data);
        drawVisitorResults(data.visitor);
        drawDPBResults(data.dpb);
        drawCountryChart(data.country);
        drawCityChart(data.city);
        drawLanguageChart(data.language);
        drawBrowserChart(data.browser);
        drawOSChart(data.os);
        drawResolutionChart(data.resolution);
        drawTimmingChart(data.timming);
        drawSearchEngineTable(data.searchEngine);
        drawKeywordTable(data.keyword);
        drawRefererTable(data.referer);
        drawCell(data.cells);
			} else {
				console.log(status);
				console.log(data);
			}
		}
	});
}

function handleCoreReportingResults(results) {
  if (results.error) console.log('There was an error querying core reporting API: ' + results.message);
}


// Chart.js 옵션 //
var chartjs_options = {
	scaleOverlay : true,
	scaleOverride : false,
	scaleLineColor : "rgba(0,0,0,.2)",
	scaleLineWidth : 1,
	scaleShowLabels : true,
	scaleLabel : "<%=value%>",
	scaleFontFamily : "'Arial'",
	scaleFontSize : 12,
	scaleFontStyle : "normal",
	scaleFontColor : "#666",	
	scaleShowGridLines : true,
	scaleGridLineColor : "rgba(0,0,0,.05)",
	scaleGridLineWidth : 1,	
	bezierCurve : true,
	pointDot : true,
	pointDotRadius : 4,
	pointDotStrokeWidth : 2,
	datasetStroke : true,
	datasetStrokeWidth : 2,
	datasetFill : true,
	animation : true,
	animationSteps : 60,
	animationEasing : "easeOutQuart",
  // labelFontFamily : "Arial",
  // labelFontStyle : "normal",
  // labelFontSize : 24,
  // labelFontColor : "#666"
}
var chartjs_tooltipOptions = {
  tooltips: {
    background: 'rgba(0,0,0,0.6)',
    fontFamily : "'Arial'",
    fontStyle : "normal",
    fontColor: 'white',
    fontSize: '12px',
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    offset: {
      left: 0,
      top: -10
    },
    border: {
      width: 0,
      color: '#000'
    },
    showShadow: false
  }
}


// 방문자 그래프 //
function drawVisitorResults(results) {
  console.log('> preparing Visitor graph ...');
  if (results.rows && results.rows.length) {
		var data = [];
		var rows_count = results.rows.length;
		var cell_count = results.rows[0].length;

    var daily_visitors = {};
    var daily_new_visits = {};
    for (var i = 0; i < rows_count; i++) {
      var row = results.rows[i];
      var visitors = row[cell_count - 2];
      var new_visits = row[cell_count - 1];
      daily_visitors[row[0]] = parseInt(daily_visitors[row[0]] || 0) + parseInt(visitors);
      daily_new_visits[row[0]] = parseInt(daily_new_visits[row[0]] || 0) + parseInt(new_visits);
    }
  
    var _label = [];
    var _visitors = [];
    var _new_visits = [];
    $.each(daily_visitors, function (k, v) {
      _label.push(k)
      _visitors.push(daily_visitors[k]);
      _new_visits.push(daily_new_visits[k]);
    });
    var data = {
    	labels : _label,
    	datasets : [
    		{
    			fillColor : "rgba(179, 44, 201, 0.2)",
    			strokeColor : "rgba(179, 44, 201, 0.5)",
    			pointColor : "#fff",
    			pointStrokeColor : "rgba(179, 44, 201, 0.8)",
    			data : _new_visits,
          title: "순 방문 수"
    		},
    		{
    			fillColor : "rgba(246, 46, 189, 0.2)",
    			strokeColor : "rgba(246, 46, 189, 0.5)",
    			pointColor : "#fff",
    			pointStrokeColor : "rgba(246, 46, 189, 0.8)",
    			data : _visitors,
          title: "신규 방문 수"
    		}
    	],
      options : {	onAnimationComplete : console.log(">> Visitor graph done.") }
    }

    var canvas = hasCompany == true ? $("#chart_company_visitor canvas").get(0) : $("#chart_visitor canvas").get(0);
    var canvas = canvas.getContext("2d");
    new Chart(canvas, chartjs_tooltipOptions).Line(data, chartjs_options);

    var legendNode = hasCompany == true ? $("#chart_company_visitor_legend").get(0) : $("#chart_visitor_legend").get(0);
    legend(legendNode, data);
  }
}


// 체류시간, 방문당 조회수, 이탈률 //
function drawDPBResults(results) {
	console.log("prepare DPBResults.")
  if (results.rows && results.rows.length) {
		var rows_count = results.rows.length;
		var cell_count = results.rows[0].length;

    var daily_duration = {};
    var daily_pagepervisit = {};
    var daily_bounces = {};
    var daily_visits = {};
    for (var i = 0; i < rows_count; i++) {
      var row = results.rows[i];
      var duration = row[cell_count - 4];
      var pagepervisit = row[cell_count - 3];
      var bounces = row[cell_count - 2];
      var visits = row[cell_count - 1];
      daily_duration[row[0]] = parseInt(daily_duration[row[0]] || 0) + parseInt(duration);
      daily_pagepervisit[row[0]] = parseInt(daily_pagepervisit[row[0]] || 0) + parseInt(pagepervisit);
      daily_bounces[row[0]] = parseInt(daily_bounces[row[0]] || 0) + parseInt(bounces);
      daily_visits[row[0]] = parseInt(daily_visits[row[0]] || 0) + parseInt(visits);
    }
  
    var _label = [];
    var _duration = [];
    var _pagepervisit = [];
    var _bounces = [];
    $.each(daily_duration, function (k, v) {
      _label.push(k)
      _duration.push(daily_duration[k]);
      _pagepervisit.push(daily_pagepervisit[k]);
      _bounces.push(daily_visits[k] == 0 ? 0 : daily_bounces[k]/daily_visits[k]);
    });
    
  	console.log("draw DPBResults.")
    _draw_lineChart(_label, _duration, "rgba(111, 220, 255, 0.2)", "rgba(111, 220, 255, 1)", "평균 체류시간", "duration");
    _draw_lineChart(_label, _pagepervisit, "rgba(255, 132, 0, 0.2)", "rgba(255, 132, 0, 1)", "방문당 조회수", "pagepervisit");
    _draw_lineChart(_label, _bounces, "rgba(0, 251, 114, 0.2)", "rgba(0, 251, 114, 1)", "평균 체류시간", "bounces");
  }
}


// 국가 파이 차트 //
function drawCountryChart(results) {
  console.log("> prepare Country chart ...")
	var data = _merge_kv(results);
  
  console.log('>> drawing Country chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_country', 'pie') }
  else { var Chart = new JSChart('chart_country', 'pie') }
	
  var colors = _colorset_generate(data.length);
	Chart.setDataArray(data);
	Chart.setTitle('국가');
	Chart.setTitleFontSize(24);
	Chart.setTitleColor("#000000");
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#222222');
	Chart.setPieRadius(180);
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	setTimeout(function(){
		$('#chart_country div, #chart_company_country div').hide();
	},10)
}


// 도시 파이 차트 //
function drawCityChart(results) {
	console.log("> prepare City chart ...")
	var data = _merge_kv(results);
  
  console.log('>> drawing City chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_city', 'pie')	}
  else { var Chart = new JSChart('chart_city', 'pie')	}
  
	var colors = _colorset_generate(data.length);
	Chart.setTitle('도시');
	Chart.setTitleFontSize(24);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#222222');
	Chart.setPieRadius(180);
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	setTimeout(function(){
		$('#chart_city div, #chart_company_city div').hide();
	},10)
}


// 언어 파이 차트 //
function drawLanguageChart(results) {
	console.log("> prepare Language chart ...")
	var data = _merge_kv(results);

  console.log('>> drawing Language chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_language', 'pie') }
  else { var Chart = new JSChart('chart_language', 'pie') }
  
	var colors = _colorset_generate(data.length);
	Chart.setTitle('언어');
	Chart.setTitleFontSize(24);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#222222');
	Chart.setPieRadius(180);
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	setTimeout(function(){
		$('#chart_language div, #chart_company_language div').hide();
	},10)
}


// 브라우저 파이 차트 //
function drawBrowserChart(results) {
	console.log("> prepare Browser chart ...")
	var data = _merge_kv(results);

  console.log('>> drawing Browser chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_browser', 'pie') }
  else { var Chart = new JSChart('chart_browser', 'pie') }
	
  var colors = _colorset_generate(data.length);
	Chart.setTitle('브라우저');
	Chart.setTitleFontSize(24);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#222222');
	Chart.setPieRadius(180);
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	setTimeout(function(){
		$('#chart_browser div, #chart_company_browser div').hide();
	},10)
}


// OS 파이 차트 //
function drawOSChart(results) {
	console.log("> prepare OS chart ...")
	console.log(results)
	var data = _merge_kv(results);
	console.log(data)

  console.log('>> drawing OS chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_os', 'pie') }
  else { var Chart = new JSChart('chart_os', 'pie') }

	var colors = _colorset_generate(data.length);
	Chart.setTitle('OS');
	Chart.setTitleFontSize(24);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#222222');
	Chart.setPieRadius(180);
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	setTimeout(function(){
		$('#chart_os div, #chart_company_os div').hide();
	},10)
}


// 해상도 파이 차트 //
function drawResolutionChart(results) {
	console.log("> prepare Resolution chart ...")
	var data = _merge_kv(results);

  console.log('>> drawing Resolution chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_resolution', 'pie') }
  else { var Chart = new JSChart('chart_resolution', 'pie') }
	
  var colors = _colorset_generate(data.length);
	Chart.setTitle('해상도');
	Chart.setTitleFontSize(24);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#222222');
	Chart.setPieRadius(180);
	Chart.setTextPaddingTop(0);
	Chart.setTextPaddingBottom(0);
	Chart.draw();
	setTimeout(function(){
		$('#chart_resolution div, #chart_company_resolution div').hide();
	},10)
}


// --------------------------------------------------------------------------------
// 검색 엔진 //
function drawSearchEngineTable(results) {
	console.log("> prepare SearchEngine table ...")
  if (results.rows && results.rows.length) { var data = _merge_kv(results); }

  console.log('>> drawing SearchEngine table ...');
	if ( hasCompany == true ){ var TableWrapper = $('#table_company_searchEngine') }
  else { var TableWrapper = $('#table_searchEngine') }

  _make_table("검색 엔진", TableWrapper, data);
}


// 검색 키워드 //
function drawKeywordTable(results) {
	console.log("> prepare SearchKeyword table ...")
  if (results.rows && results.rows.length) { var data = _merge_kv(results); }

  console.log('>> drawing SearchKeyword table ...');
	if ( hasCompany == true ){ var TableWrapper = $('#table_company_keyword') }
  else { var TableWrapper = $('#table_keyword') }
	
  _make_table("검색 키워드", TableWrapper, data);
}


// 유입경로 //
function drawRefererTable(results) {
	console.log("> prepare Referer table ...")
  if (results.rows && results.rows.length) { var data = _merge_kv(results); }

  console.log('>> drawing Referer table ...');
	if ( hasCompany == true ){ var TableWrapper = $('#table_company_referer') }
  else { var TableWrapper = $('#table_referer') }

	_make_table("유입경로", TableWrapper, data);
}


// 검색엔진, 검색키워드, 유입경로 3테이블에 사용함. //
function _make_table(header, wrapper, data) {
	wrapper.html("<h4>" + header + "</h4><table class='table table-striped'><thead><tr><th>조회수</th><th>" + header + "</th></tr></thead><tbody></tbody></table>")
	for( var i = 0; i < data.length; i++ ){
    var tr = document.createElement('tr');
    for( var j = 0; j < 2; j++ ){
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(data[i][j]));
      tr.appendChild(td);
    }
		wrapper.find('tbody').append(tr);
	}
}


// --------------------------------------------------
// 시간대 //
function drawTimmingChart(results) {
  if (results.rows && results.rows.length) {
		var rows_count = results.rows.length;
		var cell_count = results.rows[0].length;

    var daily_timming = {};
    var _key = (hasCompany == true ? 1 : 0)
    for (var i = 0; i < rows_count; i++) {
      var row = results.rows[i];
      var timming = row[cell_count - 1];
      daily_timming[row[_key]] = parseInt(daily_timming[row[_key]] || 0) + parseInt(timming);
    }
  
    var _label = [];
    var _timming = [];
    $.each(daily_timming, function (k, _) {
      _label.push(k)
      _timming.push(daily_timming[k]);
    });
  
  	console.log("draw Timming chart.")
    _draw_lineChart(_label, _timming, "rgba(111, 220, 255, 0.2)", "rgba(111, 220, 255, 1)", "평균 체류시간", "timming");
  }
}


// for Cells
function drawCell(results) {
	console.log("drawCell")
  if (results.rows && results.rows.length) {
		if ( hasCompany == true ){
			var visits = results.rows[0][1];
			var newVisits = results.rows[0][2];
			var pageviews = results.rows[0][3];
			var pageviewsPerVisit = results.rows[0][4];
			var avgTimeOnSite = results.rows[0][5];
			var bounces = results.rows[0][6];
			$('#text_company_visits').text(_numberWithCommas(visits));
			$('#text_company_uniqueVisitors').text(_numberWithCommas(newVisits));
			$('#text_company_pageviews').text(_numberWithCommas(pageviews));
			$('#text_company_pagesPerVisit').text(parseFloat(pageviewsPerVisit).toFixed(2));
			$('#text_company_avgVisitDuration').text(parseInt(avgTimeOnSite) + "초");
			$('#text_company_bounceRate').text((bounces/visits*100).toFixed(2) + "%");
			$('#text_company_perNewVisits').text((newVisits/visits*100).toFixed(2) + "%");
		} else {
			var visits = results.rows[0][0];
			var newVisits = results.rows[0][1];
			var pageviews = results.rows[0][2];
			var pageviewsPerVisit = results.rows[0][3];
			var avgTimeOnSite = results.rows[0][4];
			var bounces = results.rows[0][5];
			$('#text_visits').text(_numberWithCommas(visits));
			$('#text_uniqueVisitors').text(_numberWithCommas(newVisits));
			$('#text_pageviews').text(_numberWithCommas(pageviews));
			$('#text_pagesPerVisit').text(parseFloat(pageviewsPerVisit).toFixed(2));
			$('#text_avgVisitDuration').text(parseInt(avgTimeOnSite) + "초");
			$('#text_bounceRate').text((bounces/visits*100).toFixed(2) + "%");
			$('#text_perNewVisits').text((newVisits/visits*100).toFixed(2) + "%");
		}
  }
}


// 쿼리 결과 정리
function _merge_kv(results) {
  if (results.rows && results.rows.length) {
    var data = [];
    var rows_count = results.rows.length;
    var cell_count = results.rows[0].length;
    var n = hasCompany == true ? 1 : 0;
  
    var cell = {};
    for (var i = 0; i < rows_count; i++) {
      var row = results.rows[i];
      var value = row[cell_count - 1];
      cell[row[n]] = parseInt(cell[row[n]] || 0) + parseInt(value);
    }
    $.each(cell, function (k, _) {
      data.push([k, cell[k]]);
    });
    return data;
  }
}


// 선 그래프 그리기
function _draw_lineChart(label, data, fillColor, strokeColor, title, canvas_string) {
  var data = {
  	labels : label,
  	datasets : [
  		{
  			fillColor : fillColor,
  			strokeColor : strokeColor,
  			pointColor : "#fff",
  			pointStrokeColor : strokeColor,
  			data : data,
        title: title
  		}
  	]
  }
  var canvas = hasCompany == true ? $("#chart_company_" + canvas_string + " canvas").get(0) : $("#chart_" + canvas_string + " canvas").get(0);
  var canvas = canvas.getContext("2d");
  new Chart(canvas, chartjs_tooltipOptions).Line(data, chartjs_options);
}


function _numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}


function _cycleArray() {
	if (this._current === undefined) this._current = 0;
	else {
		this._current += 1;
		if (this._current >= this.length) this._current = 0;
	}
	return this[this._current];
}

function _colorset_generate(times) {
	var new_set = []
	for ( var k = 0; k < times; k++ ) new_set[k] = _cycleArray.call(colors_set)	
	return new_set;
}

function _comparator(a,b) {
  return parseInt(b[1]) - parseInt(a[1]);
}

function _ellipsis(string, count) {
  if(string.length > count) {
    string = string.substring(0, count-1) + "...";
  }
  return string;
}


$(".quickSelect").click(function(e){
	e.preventDefault();
  
	var end_date = $('#date_end').val();

	if ($(this).data("range") == "1w") { var start_date = moment(end_date).subtract('days', 7).format("YYYY-MM-DD") }
	else if ($(this).data("range") == "1m") {	var start_date = moment(end_date).subtract('months', 1).format("YYYY-MM-DD") }
	else { var start_date = moment(end_date).subtract('months', 3).format("YYYY-MM-DD") }
  
  $('#date_start').val(start_date);
  console.log(start_date)
});

$("#make-api-call-button").click(function(e) {
	queryCoreReportingApi();
});
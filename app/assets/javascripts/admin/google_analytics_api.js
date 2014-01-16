var hasCompany = false
var colors_set = ['#FF7F7F', '#FFBF7F', '#EAFF7F', '#95FF7F', '#7FFFBF', '#7FEAFF', '#7F95FF', '#BF7FFF', '#FF7FEA', '#FF7F95'];
$("#waiting-button").hide();

function queryCoreReportingApi(profileId) {
  console.log('Querying Core Reporting API ...');

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
        dpb: {
          'ids': 'ga:78859617',
          'start-date': start_date,
          'end-date': end_date,
          'dimensions': dimensions,
          'metrics': "ga:avgTimeOnSite,ga:pageviewsPerVisit,ga:bounces,ga:visits",
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
				prepareVisitorResults(data.visitor);
        prepareDPBResults(data.dpb);
        drawCountryChart(data.country);
        drawCityChart(data.city);
        drawLanguageChart(data.language);
        drawBrowserChart(data.browser);
        drawOSChart(data.os);
        drawResolutionChart(data.resolution);
        prepareTimmingResults(data.timming);
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


// 방문자 그래프 //
function prepareVisitorResults(results) {
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
      daily_visitors[row[0].substring(4, row[0].length)] = parseInt(daily_visitors[row[0]] || 0) + parseInt(visitors);
      daily_new_visits[row[0].substring(4, row[0].length)] = parseInt(daily_new_visits[row[0]] || 0) + parseInt(new_visits);
    }
  
    var _dv = [];
    var _dnv = [];
    $.each(daily_visitors, function (k, v) {
      _dv.push([k, daily_visitors[k]]);
      _dnv.push([k, daily_new_visits[k]]);
    });
    data.push(_dv, _dnv);
		console.log(data);
		drawVisitorChart(data);
  }
}
function drawVisitorChart(data) {
  console.log('>> drawing Visitor graph ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_visitor', 'line') }
  else { var Chart = new JSChart('chart_visitor', 'line') }

	Chart.setDataArray(data[0], "신규 방문 수");
	Chart.setDataArray(data[1], "순 방문 수");
	Chart.setTitle('신규 방문과 순방문 수');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('날짜');
	Chart.setAxisNameY('방문수');
	Chart.setLineColor("#444444", "신규 방문 수");
	Chart.setLineColor("#CC4444", "순 방문 수");
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


// for Duration, Page/Visit, Bounce Rate
function prepareDPBResults(results) {
	console.log("prepare DPBResults.")
  if (results.rows && results.rows.length) {
		var data = new Array;
		var rows_count = results.rows.length
		var cell = new Array();
    var j = (hasCompany == true ? 2 : 1)
		
		for(var i = 0, rlen = rows_count; i < rlen; i++){
			cell.push([
        results.rows[i][0].substring(4, results.rows[i][0].length),
        parseFloat(results.rows[i][j])
      ]);
		}
		data.push(cell)

		var cell = new Array();
		for(var i = 0, rlen = rows_count; i < rlen; i++){
			cell.push([
        results.rows[i][0].substring(4, results.rows[i][0].length),
        parseFloat(results.rows[i][j+1])
      ]);
		}
		data.push(cell)

		var cell = new Array();
		for(var i = 0, rlen = rows_count; i < rlen; i++){
			cell.push([
        results.rows[i][0].substring(4, results.rows[i][0].length),
        (results.rows[i][j+2] == 0 ? 0 : parseFloat(results.rows[i][3]/results.rows[i][j+3]))
      ]);
		}
		data.push(cell)

		drawDPBChart(data);
  }
}
function drawDPBChart(data) {
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_duration', 'line') }
  else { var Chart = new JSChart('chart_duration', 'line') }
	Chart.setDataArray(data[0], "평균 체류시간");
	Chart.setTitle('평균 체류시간');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('날짜');
	Chart.setAxisNameY('시간(초)');
	Chart.setLineColor("#CC4444", "평균 체류시간");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(382, 300);	
	Chart.draw();
	setTimeout(function(){
		$('#chart_duration div, #chart_company_duration div').hide();
	},10)
	
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_pagepervisit', 'line') }
  else { var Chart = new JSChart('chart_pagepervisit', 'line') }
	Chart.setDataArray(data[1], "방문당 조회수");
	Chart.setTitle('방문당 조회수');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('날짜');
	Chart.setAxisNameY('조회수');
	Chart.setLineColor("#44CC44", "방문당 조회수");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(382, 300);	
	Chart.draw();
	setTimeout(function(){
		$('#chart_pagepervisit div, #chart_company_pagepervisit div').hide();
	},10)
	
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_bounce', 'line') }
  else { var Chart = new JSChart('chart_bounce', 'line') }
	Chart.setDataArray(data[2], "이탈률");
	Chart.setTitle('이탈률');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('날짜');
	Chart.setAxisNameY('이탈률');
	Chart.setLineColor("#4444CC", "이탈률");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(382, 300);	
	Chart.draw();
	setTimeout(function(){
		$('#chart_bounce div, #chart_company_bounce div').hide();
	},10)
}


// 국가 파이 차트 //
function drawCountryChart(results) {
	console.log("> prepare Country chart ...")
	var data = _merge_kv(results,false);
  
  console.log('>> drawing Country chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_country', 'pie') }
  else { var Chart = new JSChart('chart_country', 'pie') }
	
  var colors = _colorset_generate(data.length);
	Chart.setDataArray(data);
	Chart.setTitle('국가');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.colorizePie(colors);
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


// 도시 파이 차트 //
function drawCityChart(results) {
	console.log("> prepare City chart ...")
	var data = _merge_kv(results,false);
  
  console.log('>> drawing City chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_city', 'pie')	}
  else { var Chart = new JSChart('chart_city', 'pie')	}
  
	var colors = _colorset_generate(data.length);
	Chart.setTitle('도시');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setTitleColor('#857D7D');
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#6A0000');
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
	var data = _merge_kv(results,false);

  console.log('>> drawing Language chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_language', 'pie') }
  else { var Chart = new JSChart('chart_language', 'pie') }
  
	var colors = _colorset_generate(data.length);
	Chart.setTitle('언어');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setTitleColor('#857D7D');
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#6A0000');
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
	var data = _merge_kv(results,false);

  console.log('>> drawing Browser chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_browser', 'pie') }
  else { var Chart = new JSChart('chart_browser', 'pie') }
	
  var colors = _colorset_generate(data.length);
	Chart.setTitle('브라우저');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
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


// OS 파이 차트 //
function drawOSChart(results) {
	console.log("> prepare OS chart ...")
	var data = _merge_kv(results,true);

  console.log('>> drawing OS chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_os', 'pie') }
  else { var Chart = new JSChart('chart_os', 'pie') }

	var colors = _colorset_generate(data.length);
	Chart.setTitle('OS');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setTitleColor('#857D7D');
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#6A0000');
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
	var data = _merge_kv(results,false);

  console.log('>> drawing Resolution chart ...');
	if ( hasCompany == true ){ var Chart = new JSChart('chart_company_resolution', 'pie') }
  else { var Chart = new JSChart('chart_resolution', 'pie') }
	
  var colors = _colorset_generate(data.length);
	Chart.setTitle('해상도');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setDataArray(data);
	Chart.colorizePie(colors);
	Chart.resize(585, 500);	
	Chart.setTitleColor('#857D7D');
	Chart.setPieUnitsColor('#9B9B9B');
	Chart.setPieValuesColor('#6A0000');
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
  if (results.rows && results.rows.length) { var data = _merge_kv(results,false) }

  console.log('>> drawing SearchEngine table ...');
	if ( hasCompany == true ){ var TableWrapper = $('#table_company_searchEngine') }
  else { var TableWrapper = $('#table_searchEngine') }

  _make_table("검색 엔진", TableWrapper, data);
}


// 검색 키워드 //
function drawKeywordTable(results) {
	console.log("> prepare SearchKeyword table ...")
  if (results.rows && results.rows.length) { var data = _merge_kv(results,false) }

  console.log('>> drawing SearchKeyword table ...');
	if ( hasCompany == true ){ var TableWrapper = $('#table_company_keyword') }
  else { var TableWrapper = $('#table_keyword') }
	
  _make_table("검색 키워드", TableWrapper, data);
}


// 유입경로 //
function drawRefererTable(results) {
	console.log("> prepare Referer table ...")
  if (results.rows && results.rows.length) { var data = _merge_kv(results,false) }

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
function prepareTimmingResults(results) {
	console.log("> prepare Timming graph ...")
  if (results.rows && results.rows.length) {
		var data = [];
		var rows_count = results.rows.length;
    var j = (hasCompany == true ? 2 : 1)
	
		var merge_key = "";
		var merge_value = "";
  	for (var i = 0; i < rows_count; i++) {
			if (merge_key == results.rows[i][j-1]) {
				merge_value += parseInt(results.rows[i][j]);
			} else {
				if(merge_key) {
					data.push([merge_key, merge_value]);
				}
				merge_key = results.rows[i][j-1];
				merge_value = parseInt(results.rows[i][j]);
			}
		}
		data.push([merge_key, merge_value]);
		drawTimmingChart(data);
  } else {
    console.log('No results found');
		console.log(results);
  }
}
function drawTimmingChart(data) {
  console.log('>> drawing Timming table ...');
	if ( hasCompany == true ){
		var Chart = new JSChart('chart_company_timming', 'line');
	} else {
		var Chart = new JSChart('chart_timming', 'line');
	}
	Chart.setDataArray(data, "방문 수");
	Chart.setTitle('시간대별 방문 수');
	Chart.setTitleFontSize(20);
	Chart.setTitleColor("#000000");
	Chart.setAxisNameX('시간');
	Chart.setAxisNameY('방문');
	Chart.setLineColor("#444444", "방문 수");
	Chart.setLineSpeed(92);
	Chart.setLineWidth(4);
	Chart.resize(1200, 300);	
	Chart.setLegendShow(false);
	Chart.draw();

	setTimeout(function(){
		$('#chart_timming div, #chart_company_timming div').hide();
	},10)
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
function _merge_kv(results, join) {
  if (results.rows && results.rows.length) {
    var data = [];
    var rows_count = results.rows.length;
    var cell_count = results.rows[0].length;
    var n = hasCompany == true ? 1 : 0;
  
    var cell = {};
    for (var i = 0; i < rows_count; i++) {
      var row = results.rows[i];
      var value = row[cell_count - 1];
      if ( join == true ) {
        cell[row[n] + " " + row[n+1]] = parseInt(cell[row[n]] || 0) + parseInt(value);
      } else {
        cell[row[n]] = parseInt(cell[row[n]] || 0) + parseInt(value);
      }
    }
    $.each(cell, function (k, v) {
      data.push([k, cell[k]]);
    });
    return data;
  }
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
});

$("#make-api-call-button").click(function(e) {
	queryCoreReportingApi();
});
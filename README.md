<h1>End-point list:</h1>
<ul>
<li><a href="#listarticles">List of Articles</a></li>
<li><a href="#timeseries">Time Series</a></li>
<li><a href="#specificarticle">Specific Article</a></li>
<li><a href="#sources">Sources</a></li>
</ul>

<a name="listarticles"></a>
<h2>List of Articles</h2>
<p>Get a list of pieces of news about of a specific subject using <i>HTTP GET.</i></p>

<pre>
<code>http://api.geteon.com/piecesofnews</code>
</pre>

Parameters
<ul>
<li>search - <i>string</i> (mandatory) - subject of those pieces of news;</li>
<li>begindate -  <i>date</i> (optional) default value = &lt;today&gt; - reference date point;</li>
<li>pagesize -  <i>int</i> (optional) default value = 30, where int > 0. Number of pieces of news the answer will have;</li>
<li>pagenumber -  <i>int</i> (optional)  default value = 1, where int != 0. Number of pages ahead the answer will be;</li>
<li>firstpeceofnews -  <i>string</i> (optional) - id of a piece of news;</li>
</ul>

Note: paremeters <i>firstpeceofnews</i> and <i>begindate</i> cannot coexist in the same request.

<b>Callback output:</b>
<p>It returns the following JSON which contains an array and each element has the following fields: id, title of the piece of news, publish date, source id (RSS feed id), main source id, main source name (i.e. "The Guardian"), main source link, status of the piece of news according crawling process, link to the piece of news in the original source, and a number representing the .</p>

<pre>
<code class="language-javascript">
[
  {
    "id":string
    "title":string,
    "pubdate":datetime,
    "idsource":int,
    "idmainsource":int,
    "mainsourcename":string,
    "mainsourcelink":"http:\/\/us.cnn.com\/?hpt=ed_US",
    "status":"NER",
    "link":"http:\/\/rss.cnn.com\/~r\/rss\/cnn_freevideo\/~3\/-WG5wFpDBAU\/",
    "counter":0
  }
]
</code>
</pre>


<b>Examples</b>
<p>http://api.geteon.com/piecesofnews?search=obama&pagesize=2&pagenumber=1&begindate=2014-01-30</p>

<pre>
<code class="language-javascript">
[
   {
      "id":"52e9891fe4b00799c205c3ba",
      "title":"Sochi: US Athletes' Concerns",
      "pubdate":"2014-01-29 23:58:43",
      "idsource":1104,
      "idmainsource":"8",
      "mainsourcename":"CNN - US",
      "mainsourcelink":"http:\/\/us.cnn.com\/?hpt=ed_US",
      "status":"NER",
      "link":"http:\/\/rss.cnn.com\/~r\/rss\/cnn_freevideo\/~3\/-WG5wFpDBAU\/",
      "counter":0
   },
   {
      "id":"52e98911e4b00799c205c3b9",
      "title":"CNN tags along on a Lunar New Year trek",
      "pubdate":"2014-01-29 23:52:01",
      "idsource":1104,
      "idmainsource":"8",
      "mainsourcename":"CNN - US",
      "mainsourcelink":"http:\/\/us.cnn.com\/?hpt=ed_US",
      "status":"NER",
      "link":"http:\/\/rss.cnn.com\/~r\/rss\/cnn_freevideo\/~3\/uCJuW3r5nhw\/",
      "counter":1
   }
]
</code>
</pre>

<b>Possible Combinations</b>
<pre>
<code>http://api.geteon.com/piecesofnews?search=obama</code>
</pre>
<p>Returns a list with the most recent 30 pieces of news about <i>obama</i>. Default values: begindate = &lt;today&gt,  pagenumber = 1, pagesize = 30.</p>

<pre>
<code>http://api.geteon.com/piecesofnews?search=obama&begindate=2013-11-02&pagenumber=25</code>
</pre>
<p>Returns an ordered list with the previous 25 pieces of news about <i>obama</i> to 2013-11-02. Default values: pagenumber = 1.</p>

<pre>
<code>http://api.geteon.com/piecesofnews?search=obama&firstpeceofnews=52ead626e4b0d73224446faf</code>
</pre>
<p>Returns an ordered list with the previous 30 pieces of news about <i>obama</i> to the publish date of the piece of news with id=52ead626e4b0d73224446faf. Default values: pagenumber = 1, pagesize = 30.</p>

<pre>
<code>http://api.geteon.com/piecesofnews?search=obama&firstpeceofnews=52ead626e4b0d73224446faf&pagenumber=-2&pagesize=10</code>
</pre>
<p>Given an ordered list with the 20 pieces of news about <i>obama</i> ahead to the publish date of the piece of news with id=52ead626e4b0d73224446faf. It returns the last 10.</p>




<a name="timeseries"></a>
<h2>Time Series</h2>

<p> Get a time series of a specific subject using <i>HTTP GET.</i></p>


<b>End-point:</b>

<pre>
<code>http://api.geteon.com/timeseries</code>
</pre>

Parameters
<ul>
<li>search - <i>string</i> (mandatory) - subject of the timeseries;</li>
<li>startdate -  <i>date</i> (optional) - start date of the time windows you want to cover;</li>
<li>enddate -  <i>date</i> (optional) default value = &lt;today&gt;  - end date of the time windows you want to cover;</li>
</ul>

Note: the created time window with [&lt;startdate&gt; ; &lt;endate&gt;[ has maximum 30 days and the upper limit is not included.

<b>Callback output:</b>
<p>It returns the following JSON which contains an array and each element has the following fields: date and an integer representing the number of pieces of news published in that date.</p>

<pre>
<code class="language-javascript">
[
   {
      "date":date,
      "value":int
   }
]
</code>
</pre>


<b>Examples</b>
<p>http://api.geteon.com/timeseries?search=david%20miranda&startdate=2013-10-31&enddate=2013-11-03</p>

<pre>
<code class="language-javascript">
[
   {
      "date":"2013-Oct-31",
      "value":"8"
   },
   {
      "date":"2013-Nov-01",
      "value":"3"
   },
   {
      "date":"2013-Nov-02",
      "value":"0"
   }
]
</code>
</pre>

<b>Possible Combinations</b>
<pre>
<code>http://api.geteon.com/timeseries?search=obama</code>
</pre>
<p>Returns the time series about <i>obama</i> with a 30 days time window [&lt;today&gt; - 30 days ; &lt;today&gt;[</p>

<pre>
<code>http://api.geteon.com/timeseries?search=obama&enddate=2013-11-02</code>
</pre>
<p>Returns the time series about <i>obama</i> with a 30 days time window [2013-10-31 ; 2013-11-02[</p>

<pre>
<code>http://api.geteon.com/timeseries?search=obama&startdate=2013-10-31&enddate=2013-11-02</code>
</pre>
<p>Returns the time series about <i>obama</i> with the time window [2013-10-31 ; 2013-11-02[.</p>

<a name="specificarticle"></a>
<h2>Specific Article</h2>

<p> Get the specified article using <i>HTTP GET.</i></p>


<b>End-point:</b>

<pre>
<code>http://api.geteon.com/piecesofnews/&lt;ArticleID&gt;</code>
</pre>


<b>Callback output:</b>
<p>It returns the following JSON which contains the following fields: id, title, pubdate, idsource, idmainsource, mainsourcename, mainsourcelink, status, link, and piecenews.</p>

<pre>
<code class="language-javascript">
{
  "id":string,
  "title":string,
  "pubdate":datetime,
  "idsource":int,
  "idmainsource":int,
  "mainsourcename":string,
  "mainsourcelink":string,
  "status":string,
  "link":string,
  "piecenews":string
}
</code>
</pre>


<b>Examples</b>
<p>http://api.geteon.com/piecesofnews/51bf87bfe4b03445c885fece</p>

<pre>
<code class="language-javascript">
{
  "id":"51bf87bfe4b03445c885fece",
  "title":"GB success will continue - Clancy",
  "pubdate":"2012-04-17 15:35:09",
  "idsource":1031,
  "idmainsource":"5",
  "mainsourcename":"BBC",
  "mainsourcelink":"http:\/\/www.bbc.co.uk\/",
  "status":"NER",
  "link":"http:\/\/www.bbc.co.uk\/go\/rss\/-\/sport\/0\/cycling\/17743885",
  "piecenews":"Ed Clancy expects GB success to continue if Dave Brailsford..."
}
</code>
</pre>



<a name="sources"></a>
<h2>Sources</h2>
<p>Get a list of the possible sources using <i>HTTP GET</i>.</p>

<b>End-point:</b>
<pre>
<code>http://api.geteon.com/sources</code>
</pre>

<b>Callback output:</b>
<p>It returns the following JSON which contains an array with which element has: id, name, and link of one source.</p>
<pre>
<code class="language-javascript">
{
  [
    {
      "id":int,
      "name":string,
      "link":string
    }
  ]
}
</code>
</pre>

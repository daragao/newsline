<h1>End-point list:</h1>

<h2>List of Articles</h2>
<!--<p> fkjsdfksdfksd fksdfdhks fashk fjsh fahjs fjasfaskh fsahf sjhf hjsf jasf</p>

<pre>
<code>http://api.geteon.com/timeseries?search=david%20miranda&startdate=2013-10-23&enddate=2013-11-25</code>
</pre>

<p>Parameters:</p>
<ul>
<li>search</li>
<li>startdate</li>
<li>enddate</li>
</ul>

<b>Examples</b>
<p>http://api.geteon.com/piecesofnews?search=david%20miranda</p>
<p>http://api.geteon.com/piecesofnews?search=david%20miranda&enddate=2013-11-25</p>
<p>http://api.geteon.com/piecesofnews?search=david%20miranda&startdate=2013-10-23&enddate=2013-11-25</p>

-->







<h2>Time Series</h2>

<p> Get a time series of a specific subject using <i>HTTP GET.</i></p>


<b>End-point:</b>

<pre>
<code>http://api.geteon.com/timeseries</code>
</pre>

Parameters
<ul>
<li>search - <i>string</i> - subject of the timeseries;</li>
<li>startdate -  <i>date</i> - start date of the time windows you want to cover;</li>
<li>enddate -  <i>date</i> - end date of the time windows you want to cover;</li>
</ul>

Note: the created time window with [&lt;startdate&gt; ; &lt;endate&gt;[ has maximum 30 days and the upper limit is not included.

<b>Callback output:</b>
<p>It returns the following JSON which contains an array and each element has the following fields: date and an integer representing the number of pieces of news published in that date.</p>

<pre>
<code class="language-javascript">
[
  {"date": date, "value": int}
]
</code>
</pre>


<b>Examples</b>
<p>http://api.geteon.com/timeseries?search=david%20miranda&startdate=2013-10-31&enddate=2013-11-03</p>

<pre>
<code class="language-javascript">
[
  {"date":"2013-Oct-31","value":"8"},
  {"date":"2013-Nov-01","value":"3"},
  {"date":"2013-Nov-02","value":"0"}
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
  "id" : string,
  "title" : string,
  "pubdate" : datetime,
  "idsource" : int,
  "idmainsource" : int,
  "mainsourcename" : string,
  "mainsourcelink" : string,
  "status" : string,
  "link" : string,
  "piecenews" : string
}
</code>
</pre>


<b>Examples</b>
<p>http://api.geteon.com/piecesofnews/51bf87bfe4b03445c885fece</p>

<pre>
<code class="language-javascript">
{
  "id" : "51bf87bfe4b03445c885fece",
  "title" : "GB success will continue - Clancy",
  "pubdate" : "2012-04-17 15:35:09",
  "idsource" : 1031,
  "idmainsource" : "5",
  "mainsourcename" : "BBC",
  "mainsourcelink" : "http:\/\/www.bbc.co.uk\/",
  "status" : "NER",
  "link" : "http:\/\/www.bbc.co.uk\/go\/rss\/-\/sport\/0\/cycling\/17743885",
  "piecenews" : "Ed Clancy expects GB success to continue if Dave Brailsford..."
}
</code>
</pre>




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
      "id" : int,
      "name" : string,
      "link" : string
    }
  ]
}
</code>
</pre>

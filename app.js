const endpoint = "https://query.wikidata.org/sparql";
const query = `
  SELECT ?item ?itemLabel WHERE {
    ?item wdt:P31 wd:Q5 .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  } LIMIT 5
`;

async function runQuery() {
  const url = endpoint + "?query=" + encodeURIComponent(query);
  const response = await fetch(url, {
    headers: { "Accept": "application/sparql-results+json" }
  });
  const data = await response.json();

  const results = data.results.bindings;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "<h3>Query Results:</h3>";

  results.forEach(row => {
    outputDiv.innerHTML += `<p>${row.itemLabel.value}</p>`;
  });
}

document.getElementById("loadData").addEventListener("click", runQuery);




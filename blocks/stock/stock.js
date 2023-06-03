const rawResponse = {
    "Global Quote": {
        "01. symbol": "EPAM",
        "02. open": "255.1200",
        "03. high": "258.8048",
        "04. low": "250.3613",
        "05. price": "256.6200",
        "06. volume": "694240",
        "07. latest trading day": "2023-05-31",
        "08. previous close": "257.9500",
        "09. change": "-1.3300",
        "10. change percent": "-0.5156%"
    }
};


const NO_DATA = "NO DATA";

const formatAsCurrency = (s) => {
    const number = parseFloat(s);
    let formattedNumber = NO_DATA;

    if (!isNaN(number)) {
        formattedNumber = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(number);
    }

    return formattedNumber;
}

const formatAsNumber = (s) => {
  const number = parseInt(s);
  let formattedNumber = NO_DATA;

  if (!isNaN(number)) {
      formattedNumber = new Intl.NumberFormat('en-US').format(number);
  }

  return formattedNumber;
}


function formatAsChange(numberString) {
    const number = parseFloat(numberString);
  
    if (isNaN(number)) {
      return NO_DATA;
    }
  
    let sign = "";
    if (number > 0) {
      sign = "+";
    } else if (number < 0) {
      sign = "-";
    }
  
    const formattedNumber = Math.abs(number).toFixed(2);
  
    const result = sign + formattedNumber;
  
    return result;
  }

const formatAsDate = (src) => {
  const date = new Date(src);

  if (isNaN(date.getTime())) {
    return NO_DATA;
  }

  const formatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formatter.format(date);
}

const transformData = (src) => {
  const dst = {};
  dst.price = formatAsCurrency(src["05. price"]);
  dst.changecurrency = formatAsChange(src["09. change"]);
  dst.high = formatAsCurrency(src["03. high"]);
  dst.low = formatAsCurrency(src["04. low"]);
  dst.volume = formatAsNumber(src["06. volume"]);
  
  let srcPercent = src["10. change percent"];
  srcPercent = srcPercent.replace('%', '');
  dst.changepercent = formatAsChange(srcPercent) + '%';

  dst.datetime = formatAsDate(src["07. latest trading day"]);

  return dst;
};

const replacePlaceholders = (str, obj) => {
    return str.replace(/\$\{(\w+)\}/g, function(match, p1) {
        return obj[p1];
    });
}


export default function decorate(block) {
    console.log('Stock');
    const data = rawResponse["Global Quote"];    
//    console.log(block.innerText);
    const quote = transformData(data);

    const markup = `<div class="stock__row">
      <div>
        <span class="stock__eyebrow museo-sans-bold">NYSE: MAPE</span>
        <span class="stock__figure--highlighted">${quote.price}</span>
        <span class="stock__info">As of ${quote.datetime}</span>
      </div>
      <div>
        <span class="stock__eyebrow museo-sans-bold">CHANGE ($)</span>
        <div class="stock__figurecontainer">
          <span class="stock__figure--regular">${quote.changecurrency}</span>
        </div>
      </div>
      <div>
        <span class="stock__eyebrow museo-sans-bold">CHANGE (%)</span>
        <div class="stock__figurecontainer">        
          <span class="stock__figure--regular">${quote.changepercent}</span>
        </div>
      </div>
      <div>
        <span class="stock__eyebrow museo-sans-bold">HIGH/LOW</span>
        <div class="stock__figurecontainer">        
          <span class="stock__figure--regular">${quote.high}/<br/>${quote.low}</span>
        </div>          
      </div>
      <div>
        <span class="stock__eyebrow museo-sans-bold">VOLUME</span>
        <div class="stock__figurecontainer">        
          <span class="stock__figure--regular">${quote.volume}</span>
        </div>          
      </div>
    </div>
    <div class="stock__credits">
      <span>Data Provided by Infinitiv. Minimum 15 minutes delayed.</span>
    </div>`;
  
    //let replacedHtml = replacePlaceholders(block.innerHTML, values);
    block.innerHTML = markup;
}
  